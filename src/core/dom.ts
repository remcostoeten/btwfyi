/**
 * Safely validates whether a selector can query the current DOM.
 * Prevents throwing when authors supply invalid CSS selectors.
 */
export function isValidSelector(selector: string): boolean {
  try {
    return !!document.querySelector(selector)
  } catch {
    return false
  }
}

/**
 * Builds a reasonably stable selector for a given element by preferring IDs,
 * falling back to parent/child index traversal when needed.
 */
export function generateSelector(element: Element): string {
  if (element.id) {
    const s = `#${element.id}`
    if (isValidSelector(s)) return s
  }
  const parent = element.parentElement
  if (parent) {
    const siblings = Array.from(parent.children)
    const index = siblings.indexOf(element)
    const parentSel = parent.id
      ? `#${parent.id}`
      : parent.tagName.toLowerCase()
    const s = `${parentSel} > ${element.tagName.toLowerCase()}:nth-child(${
      index + 1
    })`
    if (isValidSelector(s)) return s
  }
  return element.tagName.toLowerCase()
}

/**
 * Derives a human-friendly label for UI display by using ids, text content,
 * or the lower-cased tagName as a last resort.
 */
export function getElementLabel(element: Element): string {
  if (element.id) return `#${element.id}`
  return (
    element.textContent?.trim().slice(0, 30) || element.tagName.toLowerCase()
  )
}
