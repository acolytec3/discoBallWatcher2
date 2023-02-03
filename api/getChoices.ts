import {
  HyperspaceClient,
  StringInputOperationEnum,
} from "hyperspace-client-js";

const reservoirApiKey = process.env.RESERVOIR_SECRET!;
const reservoirURL = "https://api.reservoir.tools/collections/v5";
const hyperspaceApiKey = process.env.HYPERSPACE_API_KEY;
const hyperspaceRestUrl = "https://beta.api.solanalysis.com/rest";
const hsClient = new HyperspaceClient(hyperspaceApiKey!);
export const getChoices = async (collectionName: string, chain: string) => {
  switch (chain.toLowerCase()) {
    case "eth": {
      const options = {
        method: "GET",
        headers: { accept: "*/*", "x-api-key": reservoirApiKey },
      };

      const data = await fetch(
        reservoirURL + `?name=${collectionName}`,
        options
      );
      const results = await data.json();
      const choices = results.collections.map((col: any) => {
        return {
          name: col.slug,
          value: col.slug,
        };
      });
      return choices.slice(0, 5);
    }
    case "sol": {
      const res = await hsClient.searchProjectByName({
        condition: {
          matchName: {
            operation: "FUZZY" as StringInputOperationEnum,
            value: collectionName,
          },
        },
      });
      return res.getProjectStatByName.project_stats
        ?.slice(0, 5)
        .map((project) => {
          return {
            name: project.project?.display_name,
            value: project.project_id,
          };
        });
    }
  }
};
