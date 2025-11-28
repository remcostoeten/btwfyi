/**
 * Safely checks whether a selector can query the current DOM tree.
 */
export function isValidSelector(selector: string): boolean {
  try {
    return !!document.querySelector(selector)
  } catch {
    return false
  }
}

/**
 * Builds a selector string for a target element by preferring IDs and
 * falling back to positional traversal when needed.
 */
export function generateSelector(element: Element): string {
  if (element.id) {
    const selector = `#${element.id}`
    if (isValidSelector(selector)) return selector
  }

  const parent = element.parentElement
  if (parent) {
    const siblings = Array.from(parent.children)
    const index = siblings.indexOf(element)
    const parentSelector = parent.id ? `#${parent.id}` : parent.tagName.toLowerCase()
    const selector = `${parentSelector} > ${element.tagName.toLowerCase()}:nth-child(${index + 1})`
    if (isValidSelector(selector)) return selector
  }

  return element.tagName.toLowerCase()
}

/**
 * Derives a short label for UI display, falling back to tag names.
 */
export function getElementLabel(element: Element): string {
  if (element.id) return `#${element.id}`
  return element.textContent?.trim().slice(0, 30) || element.tagName.toLowerCase()
}

