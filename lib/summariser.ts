export function summarizeBlog(text: string): string {
  return `Summary: ${text.slice(0, 100)}...`;
}
