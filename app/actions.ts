"use server";


import { summarizeAndTranslate } from "@/lib/aiHandler"; // ✅ Gemini logic
import { saveFullText } from "@/lib/mongodb";
import { supabase } from "@/lib/supabase";

export async function handleBlog(url: string) {
  console.log("🌐 Received URL:", url);

  let fullText = "";

  try {
   const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/parse`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ url }),
});

    const data = await response.json();
    fullText = data.content || "";
  } catch (err) {
    console.error("❌ API Mercury parse failed:", err);
    throw new Error("Failed to parse blog");
  }

  // 🔥 Gemini-powered AI summary and translation
  const { summary, urdu } = await summarizeAndTranslate(fullText);

  console.log("📝 Summary:", summary);
  console.log("🌙 Urdu Translation:", urdu);

  try {
    await saveFullText(url, fullText);
  } catch (error) {
    console.error("❌ MongoDB Save Failed:", error);
  }

  try {
    const { error } = await supabase.from("summaries").insert([{ url, summary }]);
    if (error) throw error;
    console.log("✅ Saved summary to Supabase");
  } catch (error) {
    console.error("❌ Supabase Save Failed:", error);
  }

  return { summary, urdu };
}
