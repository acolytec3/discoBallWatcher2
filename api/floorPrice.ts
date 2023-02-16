import { formatDomain } from "../helpers/helpers";
import {
  HyperspaceClient,
} from "hyperspace-client-js";

const hyperspaceApiKey = process.env.HYPERSPACE_API_KEY;
const hsClient = new HyperspaceClient(hyperspaceApiKey!);
const reservoirApiKey = process.env.RESERVOIR_SECRET!;
const reservoirURL = "https://api.reservoir.tools/collections/v5";
export const getCollectionData = async (chain: string, collection: string) => {
  let options, data;
  switch (chain.trim()) {
    case "ETH":
      options = {
        method: "GET",
        headers: { accept: "*/*", "x-api-key": reservoirApiKey },
      };

      data = await fetch(
        reservoirURL + `?name=${collection}&includeTopBid=true`,
        options
      );
      const results = await data.json();
      const result = results.collections[0];
      if (!result) {
        return {
          content: "No collection found by that name",
        };
      }
      return {
        embeds: [
          {
            title: result.name,
            image: {
              url: result.sampleImages[0],
              height: 36,
            },
          },
          {
            title: `Floor Price - ${String(result.floorAsk.price.amount.decimal)} ETH on ${
              result.floorAsk.sourceDomain
            }`,

            url: formatDomain(result.floorAsk.sourceDomain, result),
          },
          {
            title: `Top Offer - ${String(result.topBid.price.amount.decimal)} ETH on ${
              result.topBid.sourceDomain
            }`,
            url: formatDomain(result.topBid.sourceDomain, result),
          },
        ],
      };
    case "SOL":
      const res = await hsClient.getProjects({
        condition: {
          projectIds: [collection]
        },
      });
      const project = res.getProjectStats.project_stats?.[0]
      if (!project || project === null) {
          return {
            content: "No collection found by that name",
          }; 
      }
      return {
        embeds: [
          {
            title: collection,
            fields: [
              {
                name: "Floor Price",
                value: `${String(project.floor_price)} SOL`,
              },
            ],
            url: `https://hyperspace.xyz/collection/${collection}`,
            image: {
              url: project.project?.img_url,
              height: 36,
            },
          },
        ],
      };
    default: return {
      content: "Unknown chain"
    }
  }
};
