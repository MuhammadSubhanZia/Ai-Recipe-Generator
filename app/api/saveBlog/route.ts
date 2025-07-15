// app/api/saveBlog/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // NOT the anon key!
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  const { url, summary, translation, language } = await req.json();

  if (!url || !summary || !language) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const { data, error } = await supabase.from("summaries").insert([
      {
        url,
        summary,
        translation,
        language,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ message: "✅ Summary saved to Supabase!", data });
 } catch (err: unknown) {
  const error = err as Error;
  console.error("❌ Supabase Save Error:", error.message);
  return NextResponse.json({ error: "Saving to Supabase failed" }, { status: 500 });
}

}
