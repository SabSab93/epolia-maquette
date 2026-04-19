import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'
import { MobileShell } from '../components/MobileShell'
import { PrimaryButton } from '../components/PrimaryButton'
import {
  loadStudentRegistrationProgress,
  saveStudentRegistrationProgress
} from '../utils/studentRegistrationProgress'
import { getStudentRegistrationProgress } from '../utils/studentRegistrationSteps'

const EMPTY_PROFILE_FORM = {
  lastName: '',
  firstName: '',
  email: '',
  phone: '',
  nif: ''
}

const MOCK_CATEGORIES = Array.from({ length: 5 }, (_, index) => ({
  id: `cat-${index + 1}`,
  label: `Catégorie ${index + 1}`
}))

export function RegisterEtudiantCategoriesPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const data = useMemo(() => {
    const saved = loadStudentRegistrationProgress()

    return {
      profileForm: {
        ...EMPTY_PROFILE_FORM,
        ...(saved?.profileForm ?? {}),
        ...(location.state?.profileForm ?? {})
      },
      formations:
        Array.isArray(location.state?.formations)
          ? location.state.formations
          : Array.isArray(saved?.formations)
            ? saved.formations
            : [],
      portfolios:
        Array.isArray(location.state?.portfolios)
          ? location.state.portfolios
          : Array.isArray(saved?.portfolios)
            ? saved.portfolios
            : [],
      presentationText:
        typeof location.state?.presentationText === 'string'
          ? location.state.presentationText
          : saved?.presentationText ?? '',
      selectedCategories:
        Array.isArray(location.state?.selectedCategories)
          ? location.state.selectedCategories
          : Array.isArray(saved?.selectedCategories)
            ? saved.selectedCategories
            : [],
      keySkills:
        Array.isArray(location.state?.keySkills)
          ? location.state.keySkills
          : Array.isArray(saved?.keySkills)
            ? saved.keySkills
            : [],
      keyQualities:
        Array.isArray(location.state?.keyQualities)
          ? location.state.keyQualities
          : Array.isArray(saved?.keyQualities)
            ? saved.keyQualities
            : []
    }
  }, [location.state])

  const [selectedCategories, setSelectedCategories] = useState(data.selectedCategories)

  useEffect(() => {
    setSelectedCategories(data.selectedCategories)
  }, [data.selectedCategories])

  useEffect(() => {
    saveStudentRegistrationProgress({
      currentStep: 4,
      profileForm: data.profileForm,
      formations: data.formations,
      portfolios: data.portfolios,
      presentationText: data.presentationText,
      selectedCategories,
      keySkills: data.keySkills,
      keyQualities: data.keyQualities
    })
  }, [data.profileForm, data.formations, data.portfolios, data.presentationText, selectedCategories, data.keySkills, data.keyQualities])

  const { progressPercent } = getStudentRegistrationProgress(5)

  const toggleCategory = (categoryId) => {
    setSelectedCategories((current) =>
      current.includes(categoryId) ? current.filter((id) => id !== categoryId) : [...current, categoryId]
    )
  }

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col gap-5 p-5 pb-8">
        <header className="space-y-3">
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() =>
                navigate('/register-etudiant-presentation', {
                  state: {
                    profileForm: data.profileForm,
                    formations: data.formations,
                    portfolios: data.portfolios,
                    presentationText: data.presentationText,
                    selectedCategories,
                    keySkills: data.keySkills,
                    keyQualities: data.keyQualities
                  }
                })
              }
              className="inline-flex items-center text-sm font-medium text-epolia-purple/80"
            >
              <FaChevronLeft className="text-[16px]" aria-hidden="true" />
            </button>
            <section className="pointer-events-none absolute left-1/2 w-full max-w-[260px] -translate-x-1/2">
              <div className="h-2 overflow-hidden rounded-full bg-[#F3E8CC]">
                <div
                  className="h-full rounded-full bg-[#C3E841] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </section>
          </div>
          <h1 className="text-3xl font-bold text-epolia-purple">Cochez les catégories qui vous correspondent</h1>
          <p className="text-sm text-epolia-muted">
            Ces catégories sont proposées à partir de votre présentation pour mieux orienter votre profil dans les recherches.
          </p>
        </header>

        <section className="space-y-3">
          {MOCK_CATEGORIES.map((category) => {
            const isActive = selectedCategories.includes(category.id)
            const isPrimary = selectedCategories[0] === category.id
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => toggleCategory(category.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  isActive
                    ? 'border-[#FF661A] bg-[#FF661A]/10 ring-1 ring-[#FF661A]/30'
                    : 'border-[#A592D4]/30 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-[#58126A]">{category.label}</p>
                    {isPrimary ? (
                      <span className="mt-1 inline-flex rounded-full bg-[#C3E841] px-2 py-0.5 text-[11px] font-semibold text-[#58126A]">
                        Principal
                      </span>
                    ) : null}
                  </div>
                  <span
                    className={`mt-1 inline-flex h-5 w-5 items-center justify-center rounded border text-xs font-bold ${
                      isActive
                        ? 'border-[#FF661A] bg-[#FF661A] text-white'
                        : 'border-[#A592D4]/50 text-[#A592D4]'
                    }`}
                  >
                    {isActive ? '✓' : ''}
                  </span>
                </div>
              </button>
            )
          })}
        </section>

        <div className="mt-auto pb-2">
          <PrimaryButton
            type="button"
            onClick={() =>
              navigate('/register-etudiant-skills', {
                state: {
                  profileForm: data.profileForm,
                  formations: data.formations,
                  portfolios: data.portfolios,
                  presentationText: data.presentationText,
                  selectedCategories,
                  keySkills: data.keySkills,
                  keyQualities: data.keyQualities
                }
              })
            }
          >
            Suivant
          </PrimaryButton>
        </div>
      </div>
    </MobileShell>
  )
}
