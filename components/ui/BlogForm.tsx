// BlogForm.tsx
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  onSubmit: (url: string, language: string) => Promise<void>;
  loading: boolean;
}

const languages = [
  { label: "🍛 Biryani (Urdu)", value: "Urdu" },
  { label: "🥙 Shawarma (Arabic)", value: "Arabic" },
  { label: "🍲 Butter Chicken (Hindi)", value: "Hindi" },
  { label: "🥐 Croissant (French)", value: "French" },
  { label: "🥘 Paella (Spanish)", value: "Spanish" },
  { label: "🥡 Chow Mein (Chinese)", value: "Chinese" },
  { label: "🍢 Kebab (Turkish)", value: "Turkish" },
  { label: "🥨 Pretzel (German)", value: "German" },
  { label: "🥟 Pelmeni (Russian)", value: "Russian" },
  { label: "🍣 Sushi (Japanese)", value: "Japanese" },
  { label: "🍜 Ramyeon (Korean)", value: "Korean" },
  { label: "🍮 Pastel (Portuguese)", value: "Portuguese" },
  { label: "🍕 Pizza (Italian)", value: "Italian" },
  { label: "🐟 Ilish Bhaat (Bengali)", value: "Bengali" },
  { label: "🍖 Chapli Kabab (Pushto)", value: "Pushto" },
];

export default function BlogForm({ onSubmit, loading }: Props) {
  const [url, setUrl] = useState("");
  const [language, setLanguage] = useState("Urdu");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await onSubmit(url, language);
      setUrl(""); // Clear the input after successful submission
    } catch (err) {
      console.error("Error submitting blog:", err);
      setError("🔥 Kitchen mishap! Let's try cooking this recipe again.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-8 border-4 border-amber-300 shadow-inner">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🧑‍🍳</div>
        <h2 className="text-2xl font-bold text-amber-800">Ready to Cook?</h2>
        <p className="text-amber-700">Add your ingredients and choose your flavor!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* URL Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-amber-800 font-semibold text-lg">
            <span className="text-2xl">🥕</span>
            <span>Main Ingredient (Blog URL)</span>
          </label>
          <Input
            type="url"
            placeholder="https://example.com/amazing-blog-post"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="h-12 text-lg border-3 border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400 rounded-xl bg-white/90 backdrop-blur-sm shadow-inner"
          />
          <p className="text-sm text-amber-600 flex items-center gap-2">
            <span>💡</span>
            <span>Paste any blog URL to transform it into a delicious summary</span>
          </p>
        </div>

        {/* Language Selection */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-amber-800 font-semibold text-lg">
            <span className="text-2xl">🌶️</span>
            <span>Choose Your Flavor (Language)</span>
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full h-12 text-lg border-3 border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400 rounded-xl bg-white/90 backdrop-blur-sm shadow-inner font-medium text-gray-800 cursor-pointer hover:bg-white transition-all duration-200"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value} className="py-2">
                {lang.label}
              </option>
            ))}
          </select>
          <p className="text-sm text-amber-600 flex items-center gap-2">
            <span>🍽️</span>
            <span>Your summary will be served in English + your chosen language</span>
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center animate-pulse">
            <p className="text-red-600 font-semibold">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={loading || !url.trim()} 
          className="w-full h-14 text-xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <span className="flex items-center gap-3">
              <span className="animate-spin text-2xl">🔥</span>
              <span>Chef is cooking your summary...</span>
            </span>
          ) : (
            <span className="flex items-center gap-3">
              <span className="text-2xl">🍳</span>
              <span>Start Cooking My Summary!</span>
            </span>
          )}
        </Button>

        {/* Loading Animation */}
        {loading && (
          <div className="text-center py-4">
            <div className="flex justify-center items-center gap-2 text-amber-700">
              <span className="text-2xl animate-bounce">👨‍🍳</span>
              <span className="text-lg font-medium">Mixing ingredients...</span>
            </div>
            <div className="mt-2 flex justify-center gap-1">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}