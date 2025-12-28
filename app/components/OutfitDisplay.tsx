import React from "react";
import { OutfitSuggestion } from "../types";

interface OutfitDisplayProps {
  suggestion: OutfitSuggestion | null;
  isLoading: boolean;
  onGenerate: () => void;
  disabled: boolean;
}

const OutfitDisplay: React.FC<OutfitDisplayProps> = ({
  suggestion,
  isLoading,
  onGenerate,
  disabled,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 flex flex-col items-center">
      {/* Action Button */}
      <button
        onClick={onGenerate}
        disabled={disabled || isLoading}
        className={`
          relative z-10 px-10 py-4 text-lg font-bold text-white rounded-full 
          shadow-xl shadow-pink-500/30 transition-all duration-500
          ${
            disabled
              ? "bg-slate-300 cursor-not-allowed opacity-70"
              : "bg-linear-to-r from-rose-500 via-pink-500 to-purple-500 hover:scale-110 hover:shadow-pink-500/50 active:scale-95"
          }
        `}
      >
        {isLoading ? (
          <div className="flex items-center gap-3">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Styling...
          </div>
        ) : (
          <span className="flex items-center gap-2">
            {`Get Today’s Look`} <span className="text-xl">✨</span>
          </span>
        )}
      </button>

      {/* Suggestion Card */}
      {suggestion && !isLoading && (
        <div className="w-full mt-10 animate-fade-in-up">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-1 shadow-2xl bg-linear-to-br from-white via-pink-50 to-white border border-white/50">
            <div className="rounded-[1.3rem] border border-pink-100/50 p-6 md:p-8 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-slate-800 tracking-tight italic">
                      {suggestion.outfitName}
                    </h3>
                    <div className="h-1.5 w-20 bg-linear-to-r from-pink-400 to-purple-400 rounded-full mt-2"></div>
                  </div>
                  <div className="bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                    AI Pick
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.isArray(suggestion.items) &&
                      suggestion.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 ...">
                          <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 font-bold text-xs">
                            {idx + 1}
                          </div>
                          <span className="text-slate-700 font-medium capitalize">
                            {item}
                          </span>
                        </div>
                      ))}
                  </div>

                  <div className="space-y-4 pt-4 border-t border-pink-100/50">
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-slate-400 font-bold mb-1">
                        Why it works
                      </h4>
                      <p className="text-slate-600 italic leading-relaxed">
                        {` "${suggestion.reasoning}"`}
                      </p>
                    </div>

                    <div className="bg-linear-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-pink-100">
                      <h4 className="text-sm uppercase tracking-wider text-purple-400 font-bold mb-1 flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Style Tip
                      </h4>
                      <p className="text-slate-700 font-medium">
                        {suggestion.styleTip}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutfitDisplay;
