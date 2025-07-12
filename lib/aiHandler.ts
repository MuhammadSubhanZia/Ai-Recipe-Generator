// aiHandler.ts (Gemini-based summarization and translation)
import axios from "axios";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite-preview-06-17:generateContent";

if (!GOOGLE_API_KEY) {
  throw new Error("❌ GOOGLE_API_KEY is not defined in .env.local");
}

export async function summarizeAndTranslate(text: string): Promise<{ summary: string; urdu: string }> {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GOOGLE_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text:
                  `Summarize the following blog content in English:

${text}

Then also translate that summary into polite and understandable Urdu.`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Gemini will return both English and Urdu summary in the same string.
    // We'll split them based on common Urdu text markers or phrases.
    const [englishSummary, urduTranslation] = result.split(/(?=\b(?:اردو|ترجمہ|Urdu))/i);

    return {
      summary: englishSummary?.trim() || "Summary not found",
      urdu: urduTranslation?.trim() || "اردو ترجمہ دستیاب نہیں ہے",
    };
  } catch (error) {
    console.error("Gemini summarization error:", error);
    return {
      summary: "⚠️ English summary not available",
      urdu: "⚠️ اردو ترجمہ دستیاب نہیں ہے",
    };
  }
}
