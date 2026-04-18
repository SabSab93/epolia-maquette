import { MobileShell } from '../components/MobileShell'

export function PlaceholderPage({ title, subtitle }) {
  return (
    <MobileShell withNav>
      <div className="flex min-h-full flex-col items-center justify-center gap-3 p-8 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-orange-50 text-2xl">✨</div>
        <h1 className="text-2xl font-bold text-stone-900">{title}</h1>
        <p className="max-w-xs text-sm text-stone-600">{subtitle}</p>
      </div>
    </MobileShell>
  )
}
