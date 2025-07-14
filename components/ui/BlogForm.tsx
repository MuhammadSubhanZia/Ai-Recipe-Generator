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
  { label: "🥙 Shawarma Style (Arabic)", value: "Arabic" },
  { label: "🍲 Butter Chicken Masala (Hindi)", value: "Hindi" },
  { label: "🥐 Croissant Crunch (French)", value: "French" },
  { label: "🥘 Paella Spice (Spanish)", value: "Spanish" },
  { label: "🥡 Chow Mein Crunch (Chinese)", value: "Chinese" },
  { label: "🍢 Kebab Wrap (Turkish)", value: "Turkish" },
  { label: "🥨 Pretzel-Twist Summary (German)", value: "German" git },
  { label: "🥟 Pelmeni Punch (Russian)", value: "Russian" },
  { label: "🍣 Sushi Slice (Japanese)", value: "Japanese" },
  { label: "🍜 Ramyeon Drama (Korean)", value: "Korean" },
  { label: "🍮 Pastel de Nata (Portuguese)", value: "Portuguese" },
  { label: "🍕 Pizzaaa Mode (Italian)", value: "Italian" },
  { label: "🐟 Ilish Bhaat (Bengali)", value: "Bengali" },
  { label: "🍖 Chapli Kabab Heat (Pushto)", value: "Pushto" },
];



export default function BlogForm({ onSubmit, loading }: Props) {
  const [url, setUrl] = useState("");
  const [language, setLanguage] = useState("Urdu"); // Default to Urdu
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await onSubmit(url, language);
    } catch (err) {
      console.error("Error submitting blog:", err);
      setError("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="url"
        placeholder="https://example.com/blog-post"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="border-2 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="p-2 rounded-md border border-blue-400 text-black bg-white"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "🍳 Cooking..." : "👨🏾‍🍳 Let's cool it in your favourite dish"}
      </Button>
    </form>
  );
}
