export function normalizeScores(scores: (number | null)[]): number[] {
  const valid = scores.filter((s): s is number => s !== null)
  if (valid.length === 0) return scores.map(() => 0)

  const min = Math.min(...valid)
  const max = Math.max(...valid)
  const range = max - min

  return scores.map((s) => {
    if (s === null) return 0
    if (range === 0) return 1
    return (s - min) / range
  })
}

export function relevanceLabel(normalized: number): 'High' | 'Medium' | 'Low' {
  if (normalized >= 0.66) return 'High'
  if (normalized >= 0.33) return 'Medium'
  return 'Low'
}