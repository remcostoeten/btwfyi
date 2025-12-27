
import * as chrono from 'chrono-node'

export type SmartSyntaxResult = {
    text: string
    dueDate?: Date
    tags: string[]
    priority?: 'low' | 'medium' | 'high'
}

/**
 * Parses user input to extract dates, tags (#), and priority (!).
 * Removes parsed metadata from the returned text.
 */
export function parseSmartSyntax(input: string): SmartSyntaxResult {
    let text = input
    const tags: string[] = []
    let priority: 'low' | 'medium' | 'high' | undefined

    // 1. Extract Priority (!low, !medium, !high, !urgent, !1, !2, !3)
    // We'll look for !high, !med, !low, etc. case-insensitive.
    const priorityRegex = /\s*!(high|urgent|medium|med|low|1|2|3)\b/i
    const priorityMatch = text.match(priorityRegex)

    if (priorityMatch) {
        const p = priorityMatch[1].toLowerCase()
        if (p === 'high' || p === 'urgent' || p === '1') priority = 'high'
        else if (p === 'medium' || p === 'med' || p === '2') priority = 'medium'
        else if (p === 'low' || p === '3') priority = 'low'

        text = text.replace(priorityRegex, '')
    }

    // 2. Extract Tags (#msg)
    // Standard hashtag regex
    const tagRegex = /#([\w-]+)/g
    let tagMatch
    while ((tagMatch = tagRegex.exec(text)) !== null) {
        tags.push(tagMatch[1])
    }
    // Remove tags from text
    text = text.replace(tagRegex, '')

    // 3. Extract Date (chrono-node)
    // chrono.parseDate returns a Date object or null
    const parsedDate = chrono.parseDate(text)
    let dueDate: Date | undefined

    if (parsedDate) {
        dueDate = parsedDate
        // Remove the date text from the input using chrono's detailed parsing to find the index
        const results = chrono.parse(text)
        if (results.length > 0) {
            // Sort in reverse order to remove from end first if multiple, 
            // but usually we just want the first meaningful date
            results.sort((a, b) => b.index - a.index)

            results.forEach(result => {
                const start = result.index
                const end = result.index + result.text.length
                text = text.slice(0, start) + text.slice(end)
            })
        }
    }

    // 4. Cleanup
    // Remove extra spaces
    text = text.replace(/\s+/g, ' ').trim()

    return {
        text,
        dueDate,
        tags,
        priority
    }
}
