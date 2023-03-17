import { getInteraction } from "./helpers";
import { commands } from "./commands";
const createCommands = async () => {
  const interaction = await getInteraction();
  for (const command of commands) {
    const res:any = await interaction.createApplicationCommand(command); 
    console.log(res)
  }
};

void createCommands();
