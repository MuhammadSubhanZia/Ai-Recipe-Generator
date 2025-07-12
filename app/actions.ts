"use server";

import he from "he";
import Mercury from "@postlight/mercury-parser";
import { summarizeAndTranslate } from "@/lib/aiHandler"; // ✅ Gemini logic
import { saveFullText } from "@/lib/mongodb";
import { supabase } from "@/lib/supabase";

export async function handleBlog(url: string) {
  console.log("🌐 Received URL:", url);

  let fullText = "";

  try {
    const result = await Mercury.parse(url);
    const rawHTML = result.content || "";
    const plainText = rawHTML.replace(/<[^>]+>/g, "").trim();
    fullText = he.decode(plainText);
    console.log("📄 Parsed blog content:", fullText.slice(0, 200));
  } catch (err) {
    console.error("❌ Failed to parse blog:", err);
    throw new Error("Failed to extract blog content");
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
