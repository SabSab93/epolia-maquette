import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from '../components/PrimaryButton'
import { SecondaryButton } from '../components/SecondaryButton'
import { onboardingSlides } from '../data/onboardingSlides'

export function OnboardingPage() {
  const navigate = useNavigate()
  const [activeSlide, setActiveSlide] = useState(0)
  const sliderRef = useRef(null)
  const isAutoScrollingRef = useRef(false)
  const lastUserScrollAtRef = useRef(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (Date.now() - lastUserScrollAtRef.current < 2800) {
        return
      }
      setActiveSlide((current) => (current + 1) % onboardingSlides.length)
    }, 4200)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    isAutoScrollingRef.current = true
    const slideWidth = slider.clientWidth
    slider.scrollTo({
      left: activeSlide * slideWidth,
      behavior: 'smooth'
    })

    const autoDone = window.setTimeout(() => {
      isAutoScrollingRef.current = false
    }, 420)

    return () => window.clearTimeout(autoDone)
  }, [activeSlide])

  const handleSliderScroll = () => {
    const slider = sliderRef.current
    if (!slider || isAutoScrollingRef.current) return
    lastUserScrollAtRef.current = Date.now()
    const slideWidth = slider.clientWidth
    if (!slideWidth) return

    const nextIndex = Math.round(slider.scrollLeft / slideWidth)
    setActiveSlide((current) => (nextIndex !== current ? nextIndex : current))
  }

  return (
    <div className="epolia-page-bg h-[100dvh] overflow-hidden">
      <div className="mx-auto flex h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden p-5">
        <div className="mt-4 w-full">
          <div className="mb-4 flex items-center justify-center gap-2">
            {onboardingSlides.map((_, index) => (
              <span
                key={`onboarding-bar-${index}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeSlide === index
                    ? 'w-10 bg-epolia-orange shadow-[0_0_0_1px_rgba(255,102,26,0.25)]'
                    : 'w-6 bg-epolia-purple/30 shadow-[0_0_0_1px_rgba(88,18,106,0.18)]'
                }`}
              />
            ))}
          </div>

          <div className="relative h-[46dvh] min-h-[250px] max-h-[350px] overflow-hidden rounded-[28px]">
            <div
              ref={sliderRef}
              onScroll={handleSliderScroll}
              className="hide-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
            >
              {onboardingSlides.map((slide, index) => (
                <div key={`onboarding-slide-${index}`} className="h-full min-w-full snap-center">
                  <img
                    src={slide}
                    alt={`Onboarding ${index + 1}`}
                    className="h-full w-full object-contain"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto pb-2 pt-4">
          <div className="mx-auto flex w-full max-w-[320px] flex-col items-center gap-3">
            <PrimaryButton type="button" onClick={() => navigate('/login')}>
              Se connecter
            </PrimaryButton>
            <SecondaryButton type="button" onClick={() => navigate('/register-choice')}>
              S'inscrire
            </SecondaryButton>
            <button
              type="button"
              onClick={() => navigate('/fil-annonces')}
              className="pt-1 text-sm font-medium text-epolia-purple/70"
            >
              Passer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
