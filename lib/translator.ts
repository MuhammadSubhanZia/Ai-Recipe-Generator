export function translateToUrdu(text: string): string {
  const urduDictionary: Record<string, string> = {
    "AI-Generated Summary": "اے آئی سے تیار کردہ خلاصہ",
    "Summary": "خلاصہ",
    "This is the full blog content fetched from": "یہ مکمل بلاگ کا مواد ہے جو حاصل کیا گیا ہے",
    "blog": "بلاگ",
    "content": "مواد",
    "fetched from": "سے حاصل کیا گیا",
    "Translation": "ترجمہ"
  };

  let translatedText = text;

  for (const [english, urdu] of Object.entries(urduDictionary)) {
    const regex = new RegExp(english, "gi"); // case-insensitive replacement
    translatedText = translatedText.replace(regex, urdu);
  }

  return translatedText;
}
