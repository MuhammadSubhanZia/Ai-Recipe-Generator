"use client";

import { useState } from "react";
import { handleBlog } from "./actions";
import BlogForm from "@/components/ui/BlogForm";
import SummaryCard from "@/components/ui/SummaryCard";

export default function HomePage() {
  const [summary, setSummary] = useState("");
  const [urdu, setUrdu] = useState("");

  const handleBlogSubmit = async (url: string) => {
    try {
      const res = await handleBlog(url);
      setSummary(res.summary);
      setUrdu(res.urdu);
    } catch (err) {
      console.error("Error handling blog:", err);
    }
  };

  return (
    <main className="max-w-xl mx-auto py-10">
      <BlogForm onSubmit={handleBlogSubmit} />
      {summary && <SummaryCard summary={summary} urdu={urdu} />}
    </main>
  );
}
