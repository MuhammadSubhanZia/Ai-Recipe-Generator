"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import Link from "next/link";

type Blog = {
  id: string;
  url: string;
  summary: string;
  translation: string;
  language: string;
  created_at: string;
};

export default function ShelfPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/getBlogs")
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(() => toast.error("Failed to load shelf"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/deleteBlog`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setBlogs(prev => prev.filter(b => b.id !== id));
      toast.success("🗑️ Dish removed from shelf");
    } else toast.error("❌ Couldn't delete blog");
  };

  const handleDownload = (blog: Blog) => {
    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(16);
    doc.text("AI Blog Dish", 10, 15);

    doc.setFontSize(12);
    let y = 30;

    doc.text("Blog URL:", 10, y);
    y += 7;
    const urlLines = doc.splitTextToSize(blog.url || "N/A", 180);
    doc.text(urlLines, 10, y);
    y += urlLines.length * 7;

    doc.text("English Summary:", 10, y);
    y += 7;
    const summaryLines = doc.splitTextToSize(blog.summary || "N/A", 180);
    doc.text(summaryLines, 10, y);

    doc.save(`summary-${blog.id}.pdf`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-white p-6">
      <h1 className="text-3xl font-bold text-center text-amber-600 mb-8">🍱 Your Kitchen Shelf</h1>

      <div className="text-center mb-6">
        <Link href="/">
          <Button className="bg-pink-500 hover:bg-pink-600 text-white text-lg">
            🏠 Back to Kitchen
          </Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading your saved dishes...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-500">No dishes on the shelf yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map(blog => (
            <div key={blog.id} className="bg-white shadow-md p-6 rounded-2xl border-2 border-amber-300 space-y-3">
              <p className="text-blue-500 underline">{blog.url}</p>
              <p><strong>🥗 Summary:</strong> {blog.summary}</p>
              <p><strong>🍛 {blog.language}:</strong> {blog.translation || "❌ No translation saved"}</p>
              <p className="text-xs text-gray-400">Saved on: {new Date(blog.created_at).toLocaleString()}</p>
              <div className="flex justify-between mt-3">
                <Button onClick={() => handleDownload(blog)} className="bg-green-500 hover:bg-green-600 text-white text-sm">📥 Download</Button>
                <Button onClick={() => handleDelete(blog.id)} className="bg-red-500 hover:bg-red-600 text-white text-sm">🗑️ Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
