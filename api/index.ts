import { VercelRequest, VercelResponse } from "@vercel/node";
import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from "discord-interactions";
import getRawBody from "raw-body";
import { commands } from "../helpers/commands";
import { createSubscription } from "./createSubscription";

import { getCollectionData } from "./floorPrice";
import { getChoices } from "./getChoices";

export const NFT_COMMAND = commands[0];
export const SUBSCRIPTION = commands[1];

/**
 * @param {VercelRequest} request
 * @param {VercelResponse} response
 */
module.exports = async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === "POST") {
    const signature = request.headers["x-signature-ed25519"] as string;
    const timestamp = request.headers["x-signature-timestamp"] as string;
    const rawBody = await getRawBody(request);

    const isValidRequest = verifyKey(
      rawBody,
      signature,
      timestamp,
      process.env.PUBLIC_KEY!
    );

    if (!isValidRequest) {
      return response.status(401).send({ error: "Bad request signature " });
    }

    const message = request.body;

    switch (message.type) {
      case InteractionType.PING: {
        response.send({
          type: InteractionResponseType.PONG,
        });
        break;
      }
      case 4: {
        // Autocomplete on collection name
        const options = message.data.options as any[]
        const collectionName = options.filter((opt) => opt.name === 'collection')[0].value;
        const chain = options.filter((opt) => opt.name === 'chain')[0].value;
        if (collectionName.length > 3 && chain !== undefined) {
          const choices = await getChoices(chain, collectionName);
          response.send({
            type: 8,
            data: {
              choices: choices,
            },
          });
        } else {
          response.send({
            type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
          });
        }

        break;
      }
      case InteractionType.APPLICATION_COMMAND: {
        switch (message.data.name.toLowerCase()) {
          case NFT_COMMAND.name.toLowerCase():
            if (message.data.options[1] === undefined) {
              response.status(200).send({
                type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
              });
              break;
            }
            const collectionName = message.data.options[0].value;
            const chain = message.data.options[1].value;
            const collectionDetails = await getCollectionData(
              collectionName,
              chain
            );
            response.status(200).send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: collectionDetails,
            });
            return;
          case SUBSCRIPTION.name.toLowerCase():
            const res = await createSubscription(
              message.member.user.id,
              message.data.options[0].value,
              message.data.options[2].value,
              message.data.options[1].value,
              message.data.options[3].value
            );
            response.status(200).send({
              type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
              data: res,
            });
            return;
          default:
            console.error("Unknown Command");
            response.status(400).send({ error: "Unknown Type" });
            break;
        }
      }
      default: {
        console.error("Unknown Command");
        response.status(400).send({ error: "Unknown Type" });
        break;
      }
    }
  }
};
