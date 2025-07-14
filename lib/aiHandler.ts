// aiHandler.ts
import axios from "axios";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "";
if (!GOOGLE_API_KEY) {
  throw new Error("❌ GOOGLE_API_KEY is not defined in .env.local");
}

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite-preview-06-17:generateContent";

// 🧠 Dynamic multi-language support
export async function summarizeAndTranslate(
  text: string,
  language: string
): Promise<{ summary: string; translated: string }> {
  try {
    const prompt = `Please provide a clear and concise summary of the following blog in English, followed by its translation in ${language} in a new paragraph do not use unnecesary dashes and keep it humanize and breif but complete keep the summary justified alignment.

${text}

Format your response as:
ENGLISH:
<english summary>

${language.toUpperCase()}:
<${language} summary>`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GOOGLE_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
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

    const englishMatch = result.match(/ENGLISH:\s*([\s\S]*?)\s*[A-Z]+:/i);
    const translatedMatch = result.match(
      new RegExp(`${language.toUpperCase()}:\\s*([\\s\\S]*)`, "i")
    );

    const summary = englishMatch?.[1]?.trim() || "⚠️ English summary not available";
    const translated = translatedMatch?.[1]?.trim() || `⚠️ ${language} translation not available`;

    return { summary, translated };
  } catch (error) {
    console.error("❌ Gemini summarization error:", error);
    return {
      summary: "⚠️ English summary not available",
      translated: `⚠️ ${language} translation not available`,
    };
  }
}
