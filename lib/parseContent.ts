// lib/parseContent.ts

export async function parseContent(url: string): Promise<string> {
  try {
    // 1. Try fetching directly from browser (CORS-enabled blogs)
    const res = await fetch(url);
    if (!res.ok) throw new Error("Direct fetch failed");

    const html = await res.text();
    const plainText = html.replace(/<[^>]+>/g, "").trim();

    console.log("✅ Fetched directly in browser");
    return plainText;
  } catch (err) {
    console.warn("❌ Direct fetch failed, falling back to API route:", err);

    // 2. Fallback to existing /api/parse route
    try {
      const apiRes = await fetch("/api/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!apiRes.ok) throw new Error("API route failed");

      const data = await apiRes.json();
      return data.content || "";
    } catch (apiErr) {
      console.error("❌ Both direct & API route failed:", apiErr);
      return "";
    }
  }
}
