import { formatDomain } from "../helpers/helpers";

const reservoirApiKey = process.env.RESERVOIR_SECRET!;
const reservoirURL = "https://api.reservoir.tools/collections/v5";
const hyperspaceApiKey = process.env.HYPERSPACE_API_KEY;
const hyperspaceRestUrl = "https://beta.api.solanalysis.com/rest";
export const getCollectionData = async (collection: string, chain: string) => {
  let options, data;
  switch (chain) {
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
      const res = await fetch(hyperspaceRestUrl + "/get-project-stats", {
        method: "POST",
        headers: {
          Authorization: hyperspaceApiKey!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conditions: {
            project_ids: [collection],
          },
        }),
      });
      const json = await res.json();
      if (json.project_stats.length === 0) {
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
                value: `${String(json.project_stats[0].floor_price)} SOL`,
              },
            ],
            image: {
              url: json.project_stats[0].project.img_url,
              height: 36,
            },
          },
        ],
      };
  }
};
