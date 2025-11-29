import { useMDXComponents } from '@mdx-js/react'

interface MDXContentProps {
  content: string
}

export function MDXContent({ content }: MDXContentProps) {
  const components = useMDXComponents({
    wrapper: 'div',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
    ul: 'ul',
    li: 'li',
    code: 'code',
    pre: 'pre',
    a: 'a',
  })

  return <components.wrapper>{content}</components.wrapper>
}