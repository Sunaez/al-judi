export async function onRequest(context) {
    // Get the API key from the environment. 
    // No fallback, so if it doesn't exist, it fails.
    const apiKey = context.env.WEATHER_API_KEY;
    
    // If you want to handle the case where the key is missing:
    if (!apiKey) {
      return new Response("Missing WEATHER_API_KEY", { status: 500 });
    }
  
    const location = "298 Dudley Rd, Birmingham B18 4HL";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
  