// /functions/fbConfig.js
export async function onRequest(context) {
    // Read your secrets from the environment
    const config = {
      apiKey: context.env.FB_API_KEY,
      authDomain: context.env.FB_AUTH_DOMAIN,
      projectId: context.env.FB_PROJECT_ID,
      storageBucket: context.env.FB_STORAGE_BUCKET,
      messagingSenderId: context.env.FB_MESSAGING_SENDER_ID,
      appId: context.env.FB_APP_ID,
      measurementId: context.env.FB_MEASUREMENT_ID
    };
  
    return new Response(JSON.stringify(config), {
      headers: { "Content-Type": "application/json" }
    });
  }
  