import { MDXContent } from '../components/MDXContent'

export default function GettingStartedPage() {
  return (
    <div className="space-y-8 prose prose-zinc max-w-none">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-100 mb-6">Getting Started</h1>
        <p className="text-zinc-400 mb-8">
          Learn how to install and use Vigilo in your projects.
        </p>
        <MDXContent content="docs/getting-started.mdx" />
      </div>
    </div>
  )
}