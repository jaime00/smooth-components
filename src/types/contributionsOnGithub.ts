import type { CSSProperties } from 'react'

export type ContributionDay = {
  date: string
  count: number
  level: number
}

export type ContributionsOnGithubApiResponse = {
  total: Record<string, number>
  contributions: ContributionDay[]
}

export type ContributionsOnGithubStyles = Pick<CSSProperties, 'width'>

export type ContributionsOnGithubProps = {
  username: string
  year?: number
  isDarkMode?: boolean
  weeks?: number
  cellSize?: number
  cellGap?: number
  styles?: ContributionsOnGithubStyles
}
