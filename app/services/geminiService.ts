export interface OutfitRequest {
  closetItems: string[];
  weatherInfo?: string | null;
}

export async function generateOutfit(
  closetItems: string[],
  weatherInfo?: string | null
) {
  const response = await fetch("/api/generate-outfit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ closetItems, weatherInfo }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate outfit");
  }

  const data = await response.json();
  return data;
}
