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

export function RegisterEtudiantPresentationPage() {
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

  const [presentationText, setPresentationText] = useState(data.presentationText)

  useEffect(() => {
    setPresentationText(data.presentationText)
  }, [data.presentationText])

  useEffect(() => {
    saveStudentRegistrationProgress({
      currentStep: 3,
      profileForm: data.profileForm,
      formations: data.formations,
      portfolios: data.portfolios,
      presentationText,
      selectedCategories: data.selectedCategories,
      keySkills: data.keySkills,
      keyQualities: data.keyQualities
    })
  }, [data.profileForm, data.formations, data.portfolios, data.selectedCategories, data.keySkills, data.keyQualities, presentationText])

  const { progressPercent } = getStudentRegistrationProgress(4)
  const canContinue = Boolean(presentationText.trim())

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col gap-5 p-5 pb-8">
        <header className="space-y-3">
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() =>
                navigate('/register-etudiant-portfolios', {
                  state: {
                    profileForm: data.profileForm,
                    formations: data.formations,
                    portfolios: data.portfolios,
                    presentationText,
                    selectedCategories: data.selectedCategories,
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
          <h1 className="text-3xl font-bold text-epolia-purple">Comment souhaitez-vous être présenté ?</h1>
          <p className="text-sm text-epolia-muted">
            Cette description servira à orienter les catégories suggérées (ex: artistique, création, digital).
          </p>
        </header>

        <section>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-[#58126A]">Texte de présentation</span>
            <input
              value={presentationText}
              onChange={(event) => setPresentationText(event.target.value)}
              placeholder="Exemple: Je suis orienté artistique et création digitale..."
              className="w-full rounded-2xl border border-[#A592D4]/40 bg-[#F3E8CC]/35 px-4 py-3 text-sm text-epolia-text outline-none transition placeholder:text-epolia-muted focus:border-epolia-orange focus:bg-white"
              required
            />
          </label>
        </section>

        <div className="mt-auto pb-2">
          <PrimaryButton
            type="button"
            disabled={!canContinue}
            onClick={() =>
              navigate('/register-etudiant-categories', {
                state: {
                  profileForm: data.profileForm,
                  formations: data.formations,
                  portfolios: data.portfolios,
                  presentationText,
                  selectedCategories: data.selectedCategories,
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
