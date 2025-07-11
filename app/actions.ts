"use server";

import { summarizeBlog } from "@/lib/summariser";
import { translateToUrdu } from "@/lib/translator";
import { saveFullText } from "@/lib/mongodb";
import { supabase } from "@/lib/supabase";

export async function handleBlog(url: string) {
  const fakeBlog = `This is the full blog content fetched from ${url}`;
  const summary = summarizeBlog(fakeBlog);
  const urdu = translateToUrdu(summary);

  await saveFullText(url, fakeBlog);
  await supabase.from("summaries").insert([{ url, summary }]);

  return { summary, urdu };
}
