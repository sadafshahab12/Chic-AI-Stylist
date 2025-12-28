import React, { useState } from 'react';
import { ClothingItem } from '../types';

interface ClosetManagerProps {
  items: ClothingItem[];
  onAddItem: (name: string) => void;
  onRemoveItem: (id: string) => void;
}

const ClosetManager: React.FC<ClosetManagerProps> = ({ items, onAddItem, onRemoveItem }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAddItem(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/60 p-6 md:p-8 w-full max-w-3xl mx-auto transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
        <span className="bg-pink-100 text-pink-600 p-2 rounded-lg mr-3 text-xl">👗</span>
        My Virtual Closet
      </h2>

      {/* Input Area */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative grow group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add an item (e.g., 'Blue Denim Jacket')..."
            className="w-full px-5 py-3 rounded-full border-2 border-pink-100 bg-pink-50/30 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all duration-300"
          />
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-pink-400 to-rose-400 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300 -z-10 blur-md"></div>
        </div>
        <button
          onClick={handleAdd}
          disabled={!inputValue.trim()}
          className="px-8 py-3 rounded-full bg-linear-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg shadow-pink-200 hover:shadow-pink-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span>Add</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Grid Display */}
      <div className="relative">
        {items.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-pink-100 bg-pink-50/20">
            <p className="text-slate-400 text-lg">Your closet is empty! Add some clothes to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-75 overflow-y-auto custom-scrollbar pr-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-xl p-4 shadow-sm border border-pink-50 hover:shadow-md hover:border-pink-200 transition-all duration-300 flex flex-col justify-between items-start"
              >
                <span className="text-slate-700 font-medium truncate w-full pr-6" title={item.name}>
                  {item.name}
                </span>
                
                {/* Decorative pill */}
                <div className="mt-2 h-1 w-8 bg-linear-to-r from-pink-200 to-rose-200 rounded-full"></div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-full text-slate-300 hover:bg-rose-50 hover:text-rose-500 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                  aria-label="Remove item"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-4 text-right text-xs text-slate-400 font-medium">
        {items.length} items in closet
      </div>
    </div>
  );
};

export default ClosetManager;
