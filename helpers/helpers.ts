import DiscordInteractions from "slash-commands";

export const getInteraction = () => {
  const token = process.env.DISCORD_TOKEN;
  const publicKey = process.env.PUBLIC_KEY;
  const appId = process.env.DISCORD_APPLICATION_ID;
  if (!appId || !publicKey || !token) throw new Error("missing auth data");
  return new DiscordInteractions({
    applicationId: appId!,
    authToken: token!,
    publicKey: publicKey!,
  });
};

export async function queryFauna(
  query: string,
  variables: { [key: string]: unknown }
): Promise<{
  data?: any;
  error?: any;
}> {
  const token = process.env.FAUNA_SECRET;

  if (!token) {
    throw new Error("environment variable FAUNA_SECRET not set");
  }
  const res = await fetch("https://graphql.us.fauna.com/graphql", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  
  const { data, errors } = await res.json();
  if (errors) {
    // Return the first error if there are any.
    return { data, error: errors[0] };
  }

  return { data };
}
