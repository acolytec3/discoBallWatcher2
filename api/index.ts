import { VercelRequest, VercelResponse } from '@vercel/node';
import { InteractionResponseType, InteractionType, verifyKey } from 'discord-interactions'
import getRawBody from 'raw-body'
import { commands } from '../helpers/commands';

import { getCollectionData } from './floorPrice';

export const NFT_COMMAND = commands[0]

/**
 * @param {VercelRequest} request
 * @param {VercelResponse} response
 */
module.exports = async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === 'POST') {
    const signature = request.headers['x-signature-ed25519'] as string;
    const timestamp = request.headers['x-signature-timestamp'] as string;
    const rawBody = await getRawBody(request);

    const isValidRequest = verifyKey(
      rawBody,
      signature,
      timestamp,
      process.env.PUBLIC_KEY!
    );

    if (!isValidRequest) {
      console.error('Invalid Request');
      return response.status(401).send({ error: 'Bad request signature ' });
    }

    const message = request.body;

    if (message.type === InteractionType.PING) {
      response.send({
        type: InteractionResponseType.PONG,
      });
    } else if (message.type === InteractionType.APPLICATION_COMMAND) {
      switch (message.data.name.toLowerCase()) {
        case NFT_COMMAND.name.toLowerCase():
          const collectionName = message.data.options[0].value
          const chain = message.data.options[1].value
          const collectionDetails = await getCollectionData(collectionName, chain)
          response.status(200).send({
            type: 4,
            data: collectionDetails
          })
          break;
        default:
          console.error('Unknown Command');
          response.status(400).send({ error: 'Unknown Type' });
          break;
      }
    } else {
      console.error('Unknown Type');
      response.status(400).send({ error: 'Unknown Type' });
    }
  }
};
