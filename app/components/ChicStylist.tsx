"use client";

import React, { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import ClosetManager from "./ClosetManager";
import OutfitDisplay from "./OutfitDisplay";
import { ClothingItem, OutfitSuggestion } from "../types";
import { generateOutfit } from "../services/geminiService";
import { getWeather } from "../services/weatherService";

const INITIAL_CLOSET: ClothingItem[] = [
  { id: "1", name: "White Linen Shirt" },
  { id: "2", name: "High-waisted Blue Jeans" },
  { id: "3", name: "Beige Trench Coat" },
  { id: "4", name: "Black Ankle Boots" },
  { id: "5", name: "Floral Midi Skirt" },
  { id: "6", name: "Grey Cashmere Sweater" },
  { id: "7", name: "White Sneakers" },
];

const ChicStylist: React.FC = () => {
  const [closetItems, setClosetItems] =
    useState<ClothingItem[]>(INITIAL_CLOSET);
  const [suggestion, setSuggestion] = useState<OutfitSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddItem = (name: string) => {
    const newItem: ClothingItem = { id: uuidv4(), name };
    setClosetItems((prev) => [newItem, ...prev]);
  };

  const handleRemoveItem = (id: string) => {
    setClosetItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleGenerateOutfit = useCallback(async () => {
    if (closetItems.length === 0) return;

    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    const runGeneration = async (weather?: string | null) => {
      try {
        const itemsList = closetItems.map((item) => item.name);
        const result = await generateOutfit(itemsList, weather);
        setSuggestion(result);
      } catch (err) {
        console.error(err);
        setError(
          "Oops! My fashion sense is tingling, but I couldn't generate an outfit right now. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    // Attempt to get geolocation for weather
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const weatherData = await getWeather(latitude, longitude);
            runGeneration(weatherData.weather);
          } catch {
            runGeneration(null);
          }
        },
        () => runGeneration(null) // Permission denied
      );
    } else {
      runGeneration(null);
    }
  }, [closetItems]);

  return (
    <div className="min-h-screen pb-20 font-sans text-slate-800 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <Header />

        <div className="space-y-8 animate-fade-in-down">
          <ClosetManager
            items={closetItems}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
          />

          <OutfitDisplay
            suggestion={suggestion}
            isLoading={isLoading}
            onGenerate={handleGenerateOutfit}
            disabled={closetItems.length === 0}
          />

          {error && (
            <div className="text-center p-4 bg-red-50 text-red-500 rounded-xl border border-red-100 max-w-lg mx-auto animate-pulse">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChicStylist;
