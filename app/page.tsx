// app/Homepage.tsx
"use client";

import { useState } from "react";
import { handleBlog } from "./actions";
import BlogForm from "@/components/ui/BlogForm";
import SummaryCard from "@/components/ui/SummaryCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  const [summary, setSummary] = useState("");
  const [translated, setTranslated] = useState("");
  const [url, setUrl] = useState("");
  const [language, setLanguage] = useState("Urdu");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBlogSubmit = async (url: string, language: string) => {
    setUrl(url);
    setLanguage(language);
    setLoading(true);
    setError("");
    try {
      const res = await handleBlog(url, language);
      setSummary(res.summary);
      setTranslated(res.translated);
    } catch (err) {
      console.error("Error handling blog:", err);
      setError("🔥 Oops! The kitchen got a bit smoky. Let's try cooking again!");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-red-50 text-gray-800 p-6 flex items-center justify-center relative overflow-hidden">
      {/* Kitchen Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl">🍳</div>
        <div className="absolute top-20 right-20 text-5xl">🥄</div>
        <div className="absolute bottom-20 left-20 text-5xl">🍽️</div>
        <div className="absolute bottom-10 right-10 text-6xl">👨‍🍳</div>
        <div className="absolute top-1/2 left-1/4 text-4xl">🧄</div>
        <div className="absolute top-1/3 right-1/3 text-4xl">🌶️</div>
      </div>

      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 space-y-8 border-4 border-amber-200 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="text-7xl mb-4">🍽️</div>
          <h1 className="text-5xl font-bold text-amber-800 tracking-tight drop-shadow-lg">
            Chef Subhan Kitchen
          </h1>
          <p className="text-xl text-amber-700 font-medium">
            Transform any blog into a delicious summary feast!
          </p>
          <div className="flex justify-center items-center gap-2 text-amber-600">
            <span className="text-2xl">📝</span>
            <span className="text-lg">→</span>
            <span className="text-2xl">🍳</span>
            <span className="text-lg">→</span>
            <span className="text-2xl">🍽️</span>
          </div>
        </div>

        {/* Navigation Button */}
        <div className="text-center">
          <Link href="/shelf">
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-lg px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 font-bold">
              🍱 Visit My Recipe Shelf
            </Button>
          </Link>
        </div>

        {/* Cooking Instructions */}
        <div className="bg-amber-50 rounded-2xl p-6 border-2 border-amber-200">
          <h3 className="text-2xl font-bold text-amber-800 mb-4 text-center">
            🧑‍🍳 How to Cook Your Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-3xl">🥕</div>
              <p className="font-semibold text-amber-700">1. Add Ingredients</p>
              <p className="text-sm text-amber-600">Paste your blog URL</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">🍲</div>
              <p className="font-semibold text-amber-700">2. Choose Your Dish</p>
              <p className="text-sm text-amber-600">Select your flavor (language)</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">🍽️</div>
              <p className="font-semibold text-amber-700">3. Serve & Enjoy</p>
              <p className="text-sm text-amber-600">Get your perfect summary</p>
            </div>
          </div>
        </div>

        <BlogForm onSubmit={handleBlogSubmit} loading={loading} />

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center">
            <p className="text-red-600 font-semibold text-lg">{error}</p>
            <p className="text-red-500 text-sm mt-2">Do not worry, even master chefs have kitchen mishaps! 👨‍🍳</p>
          </div>
        )}

        {summary && (
          <SummaryCard
            summary={summary}
            translated={translated}
            language={language}
            url={url}
          />
        )}
      </div>
    </main>
  );
}