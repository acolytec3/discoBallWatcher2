import { ApplicationCommandOptionType } from "slash-commands";
import { createTrue } from "typescript";

export const commands = [
  {
    name: "nft",
    description: "get NFT collection data",
    options: [
      {
        name: "chain",
        description: "ETH or SOL",
        type: ApplicationCommandOptionType.STRING,
        required: true,
        choices: [
          {
            name: "Ethereum - search by name (autocomplete)",
            value: "ETH",
          },
          {
            name: "Solana - search by name (autocomplete)",
            value: "SOL",
          },
          {
            name: "Arbitrum - use Opensea Slug",
            value: "ARB",
          },
          {
            name: "Optimism - not currently supported",
            value: "OPT",
          },
          {
            name: "Polygon - not currently supported",
            value: "POLY",
          }
        ],
      },
      {
        name: "collection",
        description: "the name of an NFT collection",
        type: ApplicationCommandOptionType.STRING,
        autocomplete: true,
        required: true
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
      },
      {
        name: "chain",
        description: "collection chain",
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
];
