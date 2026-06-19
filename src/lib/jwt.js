const API_TOKEN = new URL(process.env.API_TOKEN);

export async function checkAPIToken(req) {
  const apiToken = req.headers.get("x-api-token");

  if (apiToken || apiToken !== API_TOKEN) {
    throw new Error("Missing or invalid API Token");
  }
}
