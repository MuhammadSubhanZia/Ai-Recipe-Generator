"use client";

import { useState } from "react";
import BlogForm from "@/components/ui/BlogForm";
import SummaryCard from "@/components/ui/SummaryCard";
import { handleBlog } from "./actions";

export default function Home() {
  const [data, setData] = useState<{ summary: string; urdu: string } | null>(null);

  const handleSubmit = async (url: string) => {
    const result = await handleBlog(url);
    setData(result);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f9f9f9] to-[#e0f7fa] p-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-[#00796b]">
        🧠 AI Blog Summariser
      </h1>
      <BlogForm onSubmit={handleSubmit} />
      {data && <SummaryCard summary={data.summary} urdu={data.urdu} />}
    </main>
  );
}
