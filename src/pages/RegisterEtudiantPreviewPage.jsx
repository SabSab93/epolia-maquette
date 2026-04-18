import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaChevronLeft, FaShareAlt } from 'react-icons/fa'
import { MobileShell } from '../components/MobileShell'
import { InputField } from '../components/InputField'
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

function mergeProfileForm(savedForm = {}, incomingForm = {}) {
  return Object.entries({ ...EMPTY_PROFILE_FORM, ...savedForm, ...incomingForm }).reduce(
    (acc, [key, value]) => {
      const incomingValue = incomingForm?.[key]
      if (typeof incomingValue === 'string' && incomingValue.trim() === '' && typeof savedForm?.[key] === 'string' && savedForm[key].trim() !== '') {
        acc[key] = savedForm[key]
        return acc
      }
      acc[key] = value
      return acc
    },
    {}
  )
}

export function RegisterEtudiantPreviewPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const initialData = useMemo(() => {
    const saved = loadStudentRegistrationProgress()
    const savedProfileForm = saved?.profileForm ?? {}
    const incomingProfileForm = location.state?.profileForm ?? {}

    return {
      currentStep:
        typeof location.state?.currentStep === 'number'
          ? location.state.currentStep
          : saved?.currentStep ?? 0,
      form: mergeProfileForm(savedProfileForm, incomingProfileForm),
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
            : []
    }
  }, [location.state])

  const [currentStep, setCurrentStep] = useState(initialData.currentStep)
  const [form, setForm] = useState(initialData.form)
  const [formations, setFormations] = useState(initialData.formations)
  const [portfolios, setPortfolios] = useState(initialData.portfolios)

  useEffect(() => {
    setCurrentStep(initialData.currentStep)
    setForm(initialData.form)
    setFormations(initialData.formations)
    setPortfolios(initialData.portfolios)
  }, [initialData])

  useEffect(() => {
    saveStudentRegistrationProgress({
      currentStep,
      profileForm: form,
      formations,
      portfolios
    })
  }, [currentStep, form, formations, portfolios])

  const { progressPercent, progressLabel } = getStudentRegistrationProgress(1)
  const profileStepComplete = Boolean(
    form.lastName.trim() &&
      form.firstName.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      form.nif.trim()
  )

  return (
    <MobileShell>
      <div className="space-y-12 p-5 pb-17">
        <header className="space-y-3">
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() => {
                if (currentStep > 0) {
                  setCurrentStep((step) => step - 1)
                  return
                }
                navigate('/register-choice')
              }}
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
          <p className="text-center text-xs font-semibold text-[#58126A]/70">{progressLabel}</p>
          <h1 className="text-3xl font-bold text-epolia-purple">Inscription étudiant</h1>
        </header>

        {currentStep === 0 ? (
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault()
              if (!profileStepComplete) return
              setCurrentStep(1)
            }}
          >
            <InputField
              label="Nom"
              placeholder="Dupont"
              value={form.lastName}
              onChange={(event) => setForm({ ...form, lastName: event.target.value })}
              required
            />
            <InputField
              label="Prénom"
              placeholder="Lina"
              value={form.firstName}
              onChange={(event) => setForm({ ...form, firstName: event.target.value })}
              required
            />
            <InputField
              label="Adresse mail"
              type="email"
              placeholder="lina.etudiant@exemple.com"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
            />
            <InputField
              label="Téléphone"
              type="tel"
              placeholder="06 00 00 00 00"
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
              required
            />
            <InputField
              label="NIF"
              placeholder="Numéro fiscal"
              value={form.nif}
              onChange={(event) => setForm({ ...form, nif: event.target.value })}
              required
            />

            <PrimaryButton type="submit" disabled={!profileStepComplete}>
              Continuer
            </PrimaryButton>
          </form>
        ) : (
          <section className="space-y-4 pt-10">
            <button
              type="button"
              onClick={() => {
                if (formations.length > 0) {
                  navigate('/register-etudiant-formations', {
                    state: { formations, profileForm: form, portfolios, source: 'preview' }
                  })
                  return
                }

                navigate('/register-etudiant-formation', {
                  state: { formations, profileForm: form, source: 'preview' }
                })
              }}
              className="w-full rounded-2xl border border-[#C3E841] bg-[#C3E841] p-4 text-left text-[#58126A] shadow-sm ring-1 ring-[#C3E841]/40"
            >
              <p className="text-base font-semibold">Ajouter manuellement</p>
              <p className="mt-1 text-sm text-[#58126A]/85">
                Renseigner votre formation maintenant.
              </p>
            </button>

            <button
              type="button"
              className="w-full rounded-2xl border border-[#A592D4]/35 bg-white p-4 text-left text-[#58126A] shadow-sm ring-1 ring-[#A592D4]/20"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-base font-semibold">Importer</p>
                <FaShareAlt className="text-sm text-[#58126A]/70" aria-hidden="true" />
              </div>
              <p className="mt-1 text-sm text-epolia-muted">
                Bientôt disponible.
              </p>
            </button>
          </section>
        )}
      </div>
    </MobileShell>
  )
}
