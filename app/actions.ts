"use server";

import { summarizeAndTranslate } from "@/lib/aiHandler"; // ✅ Gemini logic
import { saveFullText } from "@/lib/mongodb";
import { supabase } from "@/lib/supabase";
import { parseContent } from "@/lib/parseContent"; // ✅ Hybrid logic

export async function handleBlog(url: string) {
  console.log("🌐 Received URL:", url);

  let fullText = "";

  try {
    fullText = await parseContent(url); // ✅ This tries direct fetch first, then /api/parse
    if (!fullText) throw new Error("No content parsed");
  } catch (err) {
    console.error("❌ Content parsing failed:", err);
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
