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
            value: "ETH"
          },
          {
            name: "Solana",
            value: "SOL"
          }
        ]
      },
    ],
  },
];
