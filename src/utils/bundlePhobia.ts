export const formatBytes = (bytes: number): string => (bytes / 1024).toFixed(1)

export const calcDownloadTime = (gzip: number, speed: number): number =>
  Math.round((gzip / speed) * 1000)
