import { MDXContent } from '../components/MDXContent'

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-zinc-100 mb-4">Vigilo Documentation</h1>
        <p className="text-xl text-zinc-300 mb-8">
          Interactive documentation for the Vigilo task awareness overlay.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-zinc-800 rounded-lg border border-zinc-700">
            <h2 className="text-xl font-semibold mb-3 text-white">📚 Getting Started</h2>
            <p className="text-zinc-300">
              Learn how to install and use Vigilo in your projects.
            </p>
          </div>
          <div className="p-6 bg-zinc-800 rounded-lg border border-zinc-700">
            <h2 className="text-xl font-semibold mb-3 text-white">⚙️ Configuration</h2>
            <p className="text-zinc-300">
              Customize appearance, behavior, and keyboard shortcuts.
            </p>
          </div>
          <div className="p-6 bg-zinc-800 rounded-lg border border-zinc-700">
            <h2 className="text-xl font-semibold mb-3 text-white">🔧 API Reference</h2>
            <p className="text-zinc-300">
              Complete documentation for all components and hooks.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}