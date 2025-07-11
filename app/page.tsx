"use client";

import { useState } from "react";
import { handleBlog } from "./actions";
import BlogForm from "@/components/ui/BlogForm";
import SummaryCard from "@/components/ui/SummaryCard";

export default function HomePage() {
  const [summary, setSummary] = useState("");
  const [urdu, setUrdu] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBlogSubmit = async (url: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await handleBlog(url);
      setSummary(res.summary);
      setUrdu(res.urdu);
    } catch (err) {
      console.error("Error handling blog:", err);
      setError("❌ Something went wrong while summarizing.");
    }
    setLoading(false);
  };

  return (
    <main className="max-w-xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-700">📝 AI Blog Summarizer</h1>
      <p className="text-center text-gray-600">Enter a blog URL below to generate an AI summary and Urdu translation.</p>

      <BlogForm onSubmit={handleBlogSubmit} loading={loading} />

      {error && <p className="text-red-500 text-center">{error}</p>}

      {summary && (
        <SummaryCard summary={summary} urdu={urdu} />
      )}
    </main>
  );
}
