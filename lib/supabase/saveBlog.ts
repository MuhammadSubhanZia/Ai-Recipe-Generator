
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Service role key required for insert
);

export async function saveToSupabase({ url, summary, translation, language }: {
  url: string;
  summary: string;
  translation: string;
  language: string;
}) {
  const { error } = await supabase.from("saved_blogs").insert({
    url,
    summary,
    translation,
    language,
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error("❌ Supabase save error:", error);
    throw error;
  }
  console.log("✅ Blog saved to Supabase");
}
