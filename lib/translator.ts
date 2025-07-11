const urduDictionary: Record<string, string> = {
  blog: "بلاگ",
  summary: "خلاصہ",
  content: "مواد",
  post: "تحریر",
};

export function translateToUrdu(text: string): string {
  return text
    .split(" ")
    .map((word) => urduDictionary[word.toLowerCase()] || word)
    .join(" ");
}
