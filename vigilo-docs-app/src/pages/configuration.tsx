import { MDXContent } from '../components/MDXContent'

export default function ConfigurationPage() {
  return (
    <div className="space-y-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-100 mb-6">Configuration Options</h1>
        <p className="text-zinc-400 mb-8">
          Customize Vigilo's appearance, behavior, and keyboard shortcuts.
        </p>
        <MDXContent content="docs/configuration.mdx" />
      </div>
    </div>
  )
}