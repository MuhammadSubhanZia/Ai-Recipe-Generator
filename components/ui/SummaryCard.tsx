"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface Props {
  summary: string;
  translated: string;
  url: string;
  language: string;
}

export default function SummaryCard({ summary, translated, url, language }: Props) {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/saveBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, summary, translation: translated, language }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      toast.success("🍱 Blog saved to your Kitchen Shelf!");
    } catch (error) {
      console.error("❌ Blog save error:", error);
      toast.error("❌ Failed to save blog.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="mt-10 max-w-3xl mx-auto border-4 border-yellow-500 bg-yellow-50 shadow-xl rounded-[2rem] p-6">
      <CardContent className="space-y-6 text-black">
        <h2 className="text-xl font-bold text-orange-600">🍳 Original Blog:</h2>
        <p className="italic text-blue-700 underline">{url}</p>

        <h2 className="text-2xl font-bold text-green-700">🥗 English Summary:</h2>
        <p>{summary}</p>

        <h2 className="text-2xl font-bold text-red-700">🍴 {language} Summary:</h2>
        <p>{translated}</p>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white text-lg font-bold tracking-wide"
        >
          {saving ? "Saving..." : "🧂 Save to Shelf"}
        </Button>
      </CardContent>
    </Card>
  );
}
