export async function getWeather(lat: number, lon: number) {
  const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
  if (!response.ok) throw new Error("Weather fetch failed");
  return await response.json(); // { weather: "clear sky, 24°C" }
}
