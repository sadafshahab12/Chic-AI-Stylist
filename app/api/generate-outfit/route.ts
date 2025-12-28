import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: Request) {
  try {
    const { closetItems, weatherInfo } = await req.json();
    if (!closetItems || closetItems.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const weatherContext = weatherInfo
      ? `The current local weather is: ${weatherInfo}. Make the outfit suitable.`
      : "";

    const prompt = `
Act as a high-end fashion stylist.
Closet items: ${closetItems.join(", ")}.
${weatherContext}

Return JSON with:
- outfitName
- items
- reasoning
- styleTip
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            outfitName: { type: Type.STRING },
            items: { type: Type.ARRAY, items: { type: Type.STRING } },
            reasoning: { type: Type.STRING },
            styleTip: { type: Type.STRING },
          },
          required: ["outfitName", "items", "reasoning", "styleTip"],
        },
      },
    });

    return NextResponse.json(JSON.parse(response.text!));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to generate outfit" }, { status: 500 });
  }
}
