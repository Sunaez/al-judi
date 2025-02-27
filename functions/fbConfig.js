// /functions/fbConfig.js
export async function onRequest(context) {
    // Read your secrets from the environment
    const config = {
      apiKey: context.env.FB_API_KEY
    };
  
    return new Response(JSON.stringify(config), {
      headers: { "Content-Type": "application/json" }
    });
  }
  