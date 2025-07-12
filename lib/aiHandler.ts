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
                text: `Please provide a clear and concise summary of the following blog in English, followed by its Urdu translation in a new paragraph:

${text}

Format your response as:
ENGLISH:
<english summary>

URDU:
<urdu summary>`
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

    // Improved split using defined markers
    const englishMatch = result.match(/ENGLISH:\s*([\s\S]*?)\s*(URDU:|$)/i);
    const urduMatch = result.match(/URDU:\s*([\s\S]*)/i);

    const summary = englishMatch?.[1]?.trim() || "⚠️ English summary not available";
    const urdu = urduMatch?.[1]?.trim() || "⚠️ اردو ترجمہ دستیاب نہیں ہے";

    return { summary, urdu };
  } catch (error) {
    console.error("❌ Gemini summarization error:", error);
    return {
      summary: "⚠️ English summary not available",
      urdu: "⚠️ اردو ترجمہ دستیاب نہیں ہے",
    };
  }
}
