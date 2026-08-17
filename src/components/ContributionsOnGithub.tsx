import { ClassicGithubIcon } from '@/icons/ClassicGithubIcon'
import { useEffect, useState } from 'react'

import { ContributionsOnGithubSkeleton } from '@/components/skeletons/ContributionsOnGithubSkeleton'

import {
  CONTRIBUTIONS_COLORS_DARK,
  CONTRIBUTIONS_COLORS_LIGHT,
  CONTRIBUTIONS_DEFAULT_CELL_GAP,
  CONTRIBUTIONS_DEFAULT_CELL_SIZE,
  CONTRIBUTIONS_DEFAULT_IS_DARK_MODE,
  CONTRIBUTIONS_DEFAULT_WEEKS,
  CONTRIBUTIONS_DEFAULT_YEAR
} from '@/constants/contributionsOnGithub'

import { fetchContributions } from '@/services/contributionsOnGithub'

import '@/styles/contributionsOnGithub.css'

import type { ContributionsOnGithubProps } from '@/types/contributionsOnGithub'

import type { PositionedDay } from '@/utils/contributionsOnGithub'
import { groupIntoPositionedWeeks } from '@/utils/contributionsOnGithub'

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; total: number; weeks: PositionedDay[][] }

export const ContributionsOnGithub = ({
  username,
  year = CONTRIBUTIONS_DEFAULT_YEAR,
  isDarkMode = CONTRIBUTIONS_DEFAULT_IS_DARK_MODE,
  weeks = CONTRIBUTIONS_DEFAULT_WEEKS,
  cellSize = CONTRIBUTIONS_DEFAULT_CELL_SIZE,
  cellGap = CONTRIBUTIONS_DEFAULT_CELL_GAP,
  styles
}: ContributionsOnGithubProps) => {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    setState({ status: 'loading' })
    fetchContributions(username, year, controller.signal)
      .then((data) => {
        const total = data.total[String(year)] ?? 0
        const grouped = groupIntoPositionedWeeks(data.contributions, weeks)
        setState({ status: 'success', total, weeks: grouped })
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setState({ status: 'error', message: err.message })
        }
      })

    return () => controller.abort()
  }, [username, year, weeks])

  const colors = isDarkMode
    ? CONTRIBUTIONS_COLORS_DARK
    : CONTRIBUTIONS_COLORS_LIGHT

  const darkClass = isDarkMode ? ' contributions-container--dark' : ''

  if (state.status === 'loading') {
    return (
      <ContributionsOnGithubSkeleton
        weeks={weeks}
        cellSize={cellSize}
        cellGap={cellGap}
        isDarkMode={isDarkMode}
      />
    )
  }

  if (state.status === 'error') {
    return (
      <div className={`contributions-container${darkClass}`} style={styles}>
        <span className="contributions-header-text">
          Could not load contributions for @{username}
        </span>
      </div>
    )
  }

  return (
    <div className={`contributions-container${darkClass}`} style={styles}>
      <div className="contributions-header">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="contributions-header-icon"
          aria-label={`${username} on GitHub`}
        >
          <ClassicGithubIcon />
        </a>
        <span className="contributions-header-text">
          <span className="contributions-header-count">
            {state.total.toLocaleString()}
          </span>{' '}
          contributions in {year}
        </span>
      </div>
      <div
        className="contributions-grid"
        style={{
          gap: cellGap,
          gridTemplateColumns: `repeat(${weeks}, ${cellSize}px)`
        }}
      >
        {state.weeks.map((week) =>
          week.map((day) => (
            <div
              key={day.date}
              className="contributions-cell"
              title={`${day.count} contributions on ${day.date}`}
              style={{
                width: cellSize,
                height: cellSize,
                gridRow: day.dayOfWeek + 1,
                gridColumn: day.weekIndex + 1,
                backgroundColor: colors[day.level] ?? colors[0]
              }}
            />
          ))
        )}
      </div>
    </div>
  )
}
