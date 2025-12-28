import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  weight: ["400", "700"],
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChicAI Stylist | Your AI Personal Fashion Assistant",
  description:
    "Curate your virtual closet and get personalized, weather-aware outfit recommendations powered by AI. Elevate your style with ChicAI Stylist.",
  keywords: [
    "AI Stylist",
    "Virtual Closet",
    "Fashion AI",
    "Outfit Planner",
    "ChicAI",
  ],
  authors: [{ name: "ChicAI Team" }],
  openGraph: {
    title: "ChicAI Stylist - Elevate Your Wardrobe",
    description:
      "Your personal AI stylist that knows exactly what you should wear based on your closet and the weather.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} ${outfit.style} antialiased`}>
        {children}
      </body>
    </html>
  );
}
