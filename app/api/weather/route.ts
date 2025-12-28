import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json(
        { error: "Latitude and longitude required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) throw new Error("Missing OpenWeather API key");

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) throw new Error("Weather API request failed");

    const data = await response.json();
    const description = data.weather[0]?.description || "No description";
    const temp = Math.round(data.main.temp);

    return NextResponse.json({ weather: `${description}, ${temp}°C` });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch weather" },
      { status: 500 }
    );
  }
}
