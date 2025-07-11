"use server";

import { summarizeBlog } from "@/lib/summariser";
import { translateToUrdu } from "@/lib/translator";
import { saveFullText } from "@/lib/mongodb";
import { supabase } from "@/lib/supabase";

export async function handleBlog(url: string) {
  console.log("🌐 Received URL:", url);

  const fakeBlog = `This is the full blog content fetched from ${url}`;
  const summary = summarizeBlog(fakeBlog);
  const urdu = translateToUrdu(summary);

  console.log("📝 Summary:", summary);
  console.log("🌙 Urdu Translation:", urdu);

  try {
    await saveFullText(url, fakeBlog);
    console.log("✅ Saved full blog to MongoDB");
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
