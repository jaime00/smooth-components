import {
  CONTRIBUTIONS_DEFAULT_CELL_GAP,
  CONTRIBUTIONS_DEFAULT_CELL_SIZE,
  CONTRIBUTIONS_DEFAULT_IS_DARK_MODE,
  CONTRIBUTIONS_DEFAULT_WEEKS
} from '@/constants/contributionsOnGithub'

import '@/styles/contributionsOnGithub.css'

type ContributionsOnGithubSkeletonProps = {
  weeks?: number
  cellSize?: number
  cellGap?: number
  isDarkMode?: boolean
}

export const ContributionsOnGithubSkeleton = ({
  weeks = CONTRIBUTIONS_DEFAULT_WEEKS,
  cellSize = CONTRIBUTIONS_DEFAULT_CELL_SIZE,
  cellGap = CONTRIBUTIONS_DEFAULT_CELL_GAP,
  isDarkMode = CONTRIBUTIONS_DEFAULT_IS_DARK_MODE
}: ContributionsOnGithubSkeletonProps) => {
  const darkClass = isDarkMode ? ' contributions-container--dark' : ''
  const totalCells = weeks * 7

  return (
    <div className={`contributions-container${darkClass}`}>
      <div className="contributions-skeleton-header">
        <div className="contributions-skeleton-icon contributions-skeleton-pulse" />
        <div className="contributions-skeleton-text contributions-skeleton-pulse" />
      </div>
      <div className="contributions-skeleton-grid" style={{ gap: cellGap }}>
        {Array.from({ length: totalCells }, (_, i) => (
          <div
            key={i}
            className="contributions-skeleton-cell contributions-skeleton-pulse"
            style={{
              width: cellSize,
              height: cellSize,
              animationDelay: `${(i % 7) * 0.05}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}
