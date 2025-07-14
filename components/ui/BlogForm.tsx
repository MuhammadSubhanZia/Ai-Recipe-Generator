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
    } catch (err) {
      console.error("Error submitting blog:", err);
      setError("Oops! The dish didn't turn out right.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-slide-up">
      <Input
        type="url"
        placeholder="Paste your blog URL like a secret ingredient 🍯"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="border-2 border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="p-2 rounded-md border border-yellow-400 text-black bg-white font-semibold"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-red-600 font-semibold animate-shake">{error}</p>}

      <Button type="submit" disabled={loading} className="bg-yellow-500 hover:bg-yellow-600 text-black">
        {loading ? "👨‍🍳 Cooking in progress..." : "🍽️ Serve My Dish!"}
      </Button>
    </form>
  );
}
