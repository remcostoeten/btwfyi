export function Header() {
  return (
    <header className="bg-zinc-900 border-b border-zinc-800 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-white">
              Vigilo Documentation
            </h1>
            <span className="text-zinc-400 text-sm">
              v1.0.0
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}