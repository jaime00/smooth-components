import type { ContributionDay } from '@/types/contributionsOnGithub'

export type PositionedDay = ContributionDay & {
  weekIndex: number
  dayOfWeek: number
}

export function groupIntoPositionedWeeks(
  contributions: ContributionDay[],
  numWeeks: number
): PositionedDay[][] {
  const today = new Date().toISOString().slice(0, 10)

  const weeks: PositionedDay[][] = []
  let currentWeek: PositionedDay[] = []

  for (const day of contributions) {
    if (day.date > today) continue
    const dayOfWeek = new Date(day.date + 'T00:00:00').getDay()
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek)
      currentWeek = []
    }
    currentWeek.push({ ...day, weekIndex: 0, dayOfWeek })
  }
  if (currentWeek.length > 0) weeks.push(currentWeek)

  const sliced = weeks.slice(-numWeeks)

  for (let i = 0; i < sliced.length; i++) {
    for (const day of sliced[i]) {
      day.weekIndex = i
    }
  }

  return sliced
}
