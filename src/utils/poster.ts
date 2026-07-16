export function getCursorVars(
  rect: DOMRect,
  clientX: number,
  clientY: number,
  rotationForce: number
) {
  const x = ((clientX - rect.left) / rect.width) * 100
  const y = ((clientY - rect.top) / rect.height) * 100
  return {
    rotateX: (y - 50) * rotationForce * -1,
    rotateY: (x - 50) * rotationForce,
    x,
    y
  }
}
