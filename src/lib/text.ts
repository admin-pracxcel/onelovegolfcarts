/** Strips [[anchor|urlKey]] link tokens to plain anchor text (for JSON-LD, meta). */
export function plainText(text: string) {
  return text.replace(/\[\[([^|\]]+)\|[^\]]+\]\]/g, '$1');
}
