"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  onSubmit: (url: string) => Promise<void>;
  loading: boolean;
}

export default function BlogForm({ onSubmit }: Props) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await onSubmit(url);
    } catch (err: unknown) {
      console.error("Error submitting blog:", err);
      setError("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
  <Input
    className="border-2 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    type="url"
    placeholder="https://example.com/blog-post"
    value={url}
    onChange={(e) => setUrl(e.target.value)}
    required
  />
  {error && <p className="text-sm text-red-600">{error}</p>}
  <Button type="submit" disabled={loading}>
    {loading ? "⏳ Summarizing..." : "⚡ Generate Summary"}
  </Button>
</form>
  );
}
