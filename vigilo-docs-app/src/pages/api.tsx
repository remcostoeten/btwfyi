import { MDXContent } from '../components/MDXContent'

export default function APIPage() {
  return (
    <div className="space-y-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-100 mb-6">API Reference</h1>
        <p className="text-zinc-400 mb-8">
          Complete documentation for all Vigilo components, hooks, and types.
        </p>
        <MDXContent content="docs/api-reference.mdx" />
      </div>
    </div>
  )
}