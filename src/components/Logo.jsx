export function Logo({ small = false }) {
  return (
    <img
      src="/icons/icon-epolia-letter.png"
      alt="Epolia"
      className={small ? 'h-10 w-10 object-contain' : 'h-14 w-14 object-contain'}
      loading="eager"
    />
  )
}
