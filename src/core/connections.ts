import type { Pos } from './types'

/**   
 * Returns an SVG cubic bezier path connecting overlay items to DOM targets.
 * The control points are derived from the horizontal distance so the curve
 * remains smooth regardless of panel placement.
 */
export function calculateBezier(start: Pos, end: Pos): string {
  const distance = Math.abs(end.x - start.x)
  const offset = Math.min(distance / 2, 150)
  return `M ${start.x} ${start.y} C ${start.x + offset} ${start.y}, ${
    end.x - offset
  } ${end.y}, ${end.x} ${end.y}`
}
