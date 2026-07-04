import { API_BASE_URL } from '@/constants/bundlephobiaWidget'

import type { BundlephobiaApiResponse } from '@/types/bundlephobiaWidget'

const STORAGE_KEY = 'packageData'

const getCachedData = (pkg: string): BundlephobiaApiResponse | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const cached = JSON.parse(raw) as BundlephobiaApiResponse
    const cachedPkg = `${cached.name}@${cached.version}`
    return cachedPkg === pkg ? cached : null
  } catch {
    return null
  }
}

const setCachedData = (data: BundlephobiaApiResponse): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
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

  const res = await fetch(`${API_BASE_URL}${pkg}`, { signal })
  if (!res.ok) throw new Error(`Package not found: ${pkg}`)
  const data: BundlephobiaApiResponse = await res.json()
  setCachedData(data)
  return data
}
