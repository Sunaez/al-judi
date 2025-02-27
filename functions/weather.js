// /functions/weather.js
export async function onRequest(context) {
  // Get your API key from the environment variable
  const apiKey = context.env.WEATHER_API_KEY;

  // Exact lat/lon for Birmingham (52.486199, -1.941841)
  const lat = 52.486199;
  const lon = -1.941841;

  // WeatherAPI allows specifying lat/lon by passing them as "q=lat,lon"
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;

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
