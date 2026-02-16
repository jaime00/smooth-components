export const OPACITY_DEFAULT = 0.91
export const WIDTH_DEFAULT = 'auto'
export const HEIGHT_DEFAULT = 'auto'
export const HAS_GLINT_EFFECT = false
export const FALLBACK_IMAGE = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 560" fill="none">' +
    '<rect width="400" height="560" fill="#1a1a1a"/>' +
    '<g transform="translate(200,250)">' +
    '<rect x="-50" y="-40" width="100" height="72" rx="4" stroke="#555" stroke-width="3" fill="none"/>' +
    '<circle cx="-25" cy="-18" r="8" stroke="#555" stroke-width="2.5" fill="none"/>' +
    '<polyline points="-40,20 -15,-8 5,12 15,2 40,20" stroke="#555" stroke-width="2.5" fill="none" stroke-linejoin="round"/>' +
    '</g>' +
    '<text x="200" y="310" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" fill="#555">Image not found</text>' +
    '</svg>'
)}`
