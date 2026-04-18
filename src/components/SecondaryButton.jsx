export function SecondaryButton({ children, className = '', ...props }) {
  return (
    <button
      className={`w-full rounded-2xl border border-epolia-purple/15 bg-white px-4 py-3 text-sm font-semibold text-epolia-purple transition hover:border-epolia-purple/40 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
