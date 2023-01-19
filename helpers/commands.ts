import { ApplicationCommandOptionType } from "slash-commands";

export const commands = [
  {
    name: "ping",
    description: "what it says",
    options: [
      {
        name: "message",
        description: "what should you see back",
        type: ApplicationCommandOptionType.STRING,
      },
    ],
  },
  {
    name: "nft",
    description: "get NFT collection data",
    options: [
      {
        name: "collection",
        description: "the name of an NFT collection",
        type: ApplicationCommandOptionType.STRING,
      },
    ],
  },
];
