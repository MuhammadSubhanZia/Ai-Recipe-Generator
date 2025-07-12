// app/api/parse/route.ts
import { NextRequest, NextResponse } from "next/server";
import Mercury from "@postlight/mercury-parser";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  try {
    const result = await Mercury.parse(url);
    const html = result.content || "";
    const plainText = html.replace(/<[^>]+>/g, "").trim();

    return NextResponse.json({ content: plainText });
  } catch (error) {
    console.error("❌ Mercury parse failed:", error);
    return NextResponse.json({ error: "Parsing failed" }, { status: 500 });
  }
}
