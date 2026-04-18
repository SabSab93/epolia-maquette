import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from '../components/PrimaryButton'
import { SecondaryButton } from '../components/SecondaryButton'
import slide1 from '../assets/images/auth/connexion-img-1.jpg'
import slide2 from '../assets/images/auth/connexion-img-2.jpg'
import slide3 from '../assets/images/auth/connexion-img-3.jpg'

const slides = [slide1, slide2, slide3]

export function OnboardingPage() {
  const navigate = useNavigate()
  const [activeSlide, setActiveSlide] = useState(0)
  const sliderRef = useRef(null)
  const isAutoScrollingRef = useRef(false)
  const scrollEndTimeoutRef = useRef(null)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
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

  useEffect(() => {
    return () => {
      if (scrollEndTimeoutRef.current) {
        window.clearTimeout(scrollEndTimeoutRef.current)
      }
    }
  }, [])

  const handleSliderScroll = () => {
    const slider = sliderRef.current
    if (!slider || isAutoScrollingRef.current) return

    if (scrollEndTimeoutRef.current) {
      window.clearTimeout(scrollEndTimeoutRef.current)
    }

    scrollEndTimeoutRef.current = window.setTimeout(() => {
      const slideWidth = slider.clientWidth
      if (!slideWidth) return

      const nextIndex = Math.round(slider.scrollLeft / slideWidth)
      setActiveSlide((current) => (nextIndex !== current ? nextIndex : current))
    }, 120)
  }

  return (
    <div className="min-h-screen bg-epolia-background">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col p-5">
        <div className="mx-auto w-full max-w-[360px]">
          <div className="mb-3 flex items-center justify-center gap-2">
            {slides.map((_, index) => (
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

          <div className="relative h-[330px] overflow-hidden rounded-2xl bg-transparent">
            <div
              ref={sliderRef}
              onScroll={handleSliderScroll}
              className="hide-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
            >
              {slides.map((slide, index) => (
                <img
                  key={`onboarding-slide-${index}`}
                  src={slide}
                  alt={`Onboarding ${index + 1}`}
                  className="h-full w-full min-w-full snap-center object-contain"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto pb-2 pt-6">
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
