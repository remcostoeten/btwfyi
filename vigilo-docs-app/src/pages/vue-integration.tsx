import { MDXContent } from '../components/MDXContent'

export default function VueIntegrationPage() {
  return (
    <div className="space-y-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-100 mb-6">Vue Integration</h1>
        <p className="text-zinc-400 mb-8">
          Learn how to integrate Vigilo into Vue applications with composables and components.
        </p>
        <MDXContent content="docs/vue-integration.mdx" />
      </div>
    </div>
  )
}