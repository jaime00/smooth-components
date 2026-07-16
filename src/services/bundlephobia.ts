import { API_BASE_URL } from '@/constants/bundlephobiaWidget'

import type { BundlephobiaApiResponse } from '@/types/bundlephobiaWidget'

const inflight = new Map<string, Promise<BundlephobiaApiResponse>>()

const hasExplicitVersion = (pkg: string): boolean => pkg.lastIndexOf('@') > 0

const getCachedData = (pkg: string): BundlephobiaApiResponse | null => {
  if (!hasExplicitVersion(pkg)) return null
  try {
    const raw = localStorage.getItem(`packageData:${pkg}`)
    if (!raw) return null
    return JSON.parse(raw) as BundlephobiaApiResponse
  } catch {
    return null
  }
}

const setCachedData = (pkg: string, data: BundlephobiaApiResponse): void => {
  if (!hasExplicitVersion(pkg)) return
  try {
    localStorage.setItem(`packageData:${pkg}`, JSON.stringify(data))
  } catch {
    // localStorage lleno o no disponible
  }
}

export const fetchPackageData = async (
  pkg: string,
  signal?: AbortSignal
): Promise<BundlephobiaApiResponse> => {
  const cached = getCachedData(pkg)
  if (cached) return cached

  const existing = inflight.get(pkg)
  if (existing) {
    const data = await existing
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')
    return data
  }

  const request = fetch(`${API_BASE_URL}${pkg}`)
    .then((res) => {
      if (!res.ok) throw new Error(`Package not found: ${pkg}`)
      return res.json() as Promise<BundlephobiaApiResponse>
    })
    .then((data) => {
      setCachedData(pkg, data)
      return data
    })
    .finally(() => {
      inflight.delete(pkg)
    })

  inflight.set(pkg, request)

  const data = await request
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')
  return data
}
