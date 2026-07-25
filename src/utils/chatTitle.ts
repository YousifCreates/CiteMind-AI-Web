export function deriveChatTitle(content: string): string {
  const cleaned = content.trim().replace(/\s+/g, ' ')
  if (cleaned.length <= 50) return cleaned
  return `${cleaned.slice(0, 50).trimEnd()}...`
}