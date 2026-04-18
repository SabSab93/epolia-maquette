export function InputField({ label, hint, ...props }) {
  return (
    <label className="block space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#58126A]">{label}</span>
        {hint ? <span className="text-xs text-epolia-muted">{hint}</span> : null}
      </div>
      <input
        className="w-full rounded-2xl border border-[#A592D4]/40 bg-[#F3E8CC]/35 px-4 py-3 text-sm text-epolia-text outline-none transition placeholder:text-epolia-muted focus:border-epolia-orange focus:bg-white"
        {...props}
      />
    </label>
  )
}
