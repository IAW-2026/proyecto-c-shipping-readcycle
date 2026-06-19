export async function checkAPIToken(req) {
  const apiToken = req.headers.get("x-api-key");
  const API_TOKEN = process.env.API_TOKEN;

  console.log(apiToken);
  console.log(API_TOKEN);

  if (apiToken && apiToken !== API_TOKEN) {
    throw new Error("Missing or invalid API Token");
  }
}
