import logoEpolia from '/icons/icon-epolia-letter.png'

export function OnboardingLoadingPage() {
  return (
    <div className="epolia-page-bg min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col items-center justify-center px-6">
        <div className="relative grid place-items-center">
          <div className="h-24 w-24 rounded-full bg-[#A592D4]/18" />
          <div className="absolute h-28 w-28 animate-spin rounded-full border-4 border-[#A592D4]/35 border-t-[#FF661A]" />
          <img
            src={logoEpolia}
            alt="Epolia"
            className="absolute h-14 w-14 object-contain"
            loading="eager"
          />
        </div>

        <p className="mt-6 text-base font-semibold text-[#58126A]">Chargement de votre expérience Epolia</p>
      </div>
    </div>
  )
}
