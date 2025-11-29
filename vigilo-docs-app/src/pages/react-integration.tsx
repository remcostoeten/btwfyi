import { MDXContent } from '../components/MDXContent'

export default function ReactIntegrationPage() {
  return (
    <div className="space-y-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-100 mb-6">React Integration</h1>
        <p className="text-zinc-400 mb-8">
          Learn how to integrate Vigilo into React applications with hooks and components.
        </p>
        <MDXContent content="docs/react-integration.mdx" />
      </div>
    </div>
  )
}