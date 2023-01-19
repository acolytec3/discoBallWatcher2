import DiscordInteractions from "slash-commands";

export const getInteraction = () => {
    const token = process.env.DISCORD_TOKEN
    const publicKey = process.env.PUBLIC_KEY
    const appId = process.env.DISCORD_APPLICATION_ID
    if (!appId || !publicKey || !token) throw new Error('missing auth data')
    return new DiscordInteractions({
      applicationId: appId!,
      authToken: token!,
      publicKey: publicKey!,
    });
  };
  