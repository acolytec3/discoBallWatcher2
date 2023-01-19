const apiKey = process.env.RESERVOIR_SECRET!;
const reservoirURL = "https://api.reservoir.tools/collections/v5";

export const getCollectionData = async (collection: string) => {
  const options = {
    method: "GET",
    headers: { accept: "*/*", "x-api-key": apiKey },
  };

  const data = await fetch(
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
        fields: [
          {
            name: "Floor Price",
            value: `${String(result.floorAsk.price.amount.decimal)} ETH on ${result.floorAsk.sourceDomain}`,
          },
          {
            name: "Top Bid",
            value: `${String(result.topBid.price.amount.decimal)} ETH on ${result.topBid.sourceDomain}`,
          },
        ],
        image: {
          url: result.sampleImages[0],
          height: 36,
        },
      },
    ],
  };
};
