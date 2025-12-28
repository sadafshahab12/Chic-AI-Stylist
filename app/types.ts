export interface ClothingItem {
  id: string;
  name: string;
}

export interface OutfitSuggestion {
  outfitName: string;
  items: string[];
  reasoning: string;
  styleTip: string;
  selectedItems?: string[]; // optional alias
}

export interface OutfitResponse {
  outfitName: string;
  items: string[];
  reasoning: string;
  styleTip: string;
}
