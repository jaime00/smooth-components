import type { ContributionsOnGithubApiResponse } from '@/types/contributionsOnGithub'

const API_URL = 'https://github-contributions-api.jogruber.de/v4'

export async function fetchContributions(
  username: string,
  year: number,
  signal?: AbortSignal
): Promise<ContributionsOnGithubApiResponse> {
  const response = await fetch(`${API_URL}/${username}?y=${year}`, { signal })
  if (!response.ok) throw new Error('Failed to fetch contributions')
  return response.json()
}
