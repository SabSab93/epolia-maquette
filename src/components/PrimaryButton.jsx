export function PrimaryButton({ children, className = '', ...props }) {
  return (
    <button
      className={`w-full rounded-2xl bg-epolia-orange px-4 py-3 text-sm font-semibold text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
