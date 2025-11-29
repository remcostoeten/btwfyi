import type { Pos } from './types'

/**   
 * Returns an SVG cubic bezier path connecting overlay items to DOM targets.
 * The control points are derived from the horizontal distance so the curve
 * remains smooth regardless of panel placement.
 */
export function calculateBezier(start: Pos, end: Pos): string {
  const distance = Math.abs(end.x - start.x)
  const verticalDistance = Math.abs(end.y - start.y)
  // Increase offset for longer, more visible curves
  // Scale with both horizontal and vertical distance for better routing
  const baseOffset = Math.max(distance / 2, verticalDistance / 3)
  const offset = Math.min(baseOffset, 250) // Increased from 150 to 250 for longer curves
  return `M ${start.x} ${start.y} C ${start.x + offset} ${start.y}, ${
    end.x - offset
  } ${end.y}, ${end.x} ${end.y}`
}
