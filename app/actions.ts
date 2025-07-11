"use server";

import { saveFullText } from "@/lib/mongodb";
import { summarizeBlog } from "@/lib/summariser";
import { translateToUrdu } from "@/lib/translator";
import { supabase } from "@/lib/supabase";

export async function handleBlog(url: string) {
  try {
    // Simulate blog scraping
    const fakeBlog = `This is a fake blog content from ${url}`;
    const summary = summarizeBlog(fakeBlog);
    const urdu = translateToUrdu(summary);

    // Save to MongoDB and Supabase
    await saveFullText(url, fakeBlog);
    await supabase.from("summaries").insert([{ url, summary, urdu }]);

    return { summary, urdu };
  } catch (err) {
    console.error("❌ Error in handleBlog:", err);
    return { summary: "Error summarizing.", urdu: "کچھ غلط ہو گیا۔" };
  }
}
