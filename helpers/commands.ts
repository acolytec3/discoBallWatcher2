import { ApplicationCommandOptionType } from "slash-commands";

export const commands = [
  {
    name: "nft",
    description: "get NFT collection data",
    options: [
      {
        name: "collection",
        description: "the name of an NFT collection",
        type: ApplicationCommandOptionType.STRING,
      },
      {
        name: "chain",
        description: "ETH or SOL",
        type: ApplicationCommandOptionType.STRING,
        choices: [
          {
            name: "Ethereum",
            value: "ETH",
          },
          {
            name: "Solana",
            value: "SOL",
          },
        ],
      },
    ],
  },
  {
    name: "subscription",
    description: "NFT collection floor price notifier",
    options: [
      {
        name: "collection",
        description: "the name of an NFT collection",
        type: ApplicationCommandOptionType.STRING,
      },
      {
        name: "direction",
        description: "receive notification above or below Floor Price",
        type: ApplicationCommandOptionType.STRING,
        choices: [
          {
            name: "Above",
            value: "above",
          },
          { name: "Below", value: "below" },
        ],
      },
      {
        name: "price",
        description: "floor price to watch",
        type: ApplicationCommandOptionType.STRING,
      }
    ],
  },
];
