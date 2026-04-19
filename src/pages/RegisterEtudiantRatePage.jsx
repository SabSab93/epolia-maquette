import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'
import { MobileShell } from '../components/MobileShell'
import { PrimaryButton } from '../components/PrimaryButton'
import { InputField } from '../components/InputField'
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

const COMMISSION_RATE = 0.2

const parseAmount = (value) => {
  const normalized = value.replace(',', '.').replace(/[^\d.]/g, '')
  const parsed = Number.parseFloat(normalized)
  return Number.isFinite(parsed) ? parsed : 0
}

const formatAmount = (value) => value.toFixed(2).replace('.', ',')

export function RegisterEtudiantRatePage() {
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
            : [],
      lifeOutsideStudies:
        Array.isArray(location.state?.lifeOutsideStudies)
          ? location.state.lifeOutsideStudies
          : Array.isArray(saved?.lifeOutsideStudies)
            ? saved.lifeOutsideStudies
            : [],
      availabilities:
        Array.isArray(location.state?.availabilities)
          ? location.state.availabilities
          : Array.isArray(saved?.availabilities)
            ? saved.availabilities
            : [],
      hourlyRatePublic:
        typeof location.state?.hourlyRatePublic === 'string'
          ? location.state.hourlyRatePublic
          : saved?.hourlyRatePublic ?? '',
      hourlyRateNet:
        typeof location.state?.hourlyRateNet === 'string'
          ? location.state.hourlyRateNet
          : saved?.hourlyRateNet ?? '',
      studentDescription:
        typeof location.state?.studentDescription === 'string'
          ? location.state.studentDescription
          : saved?.studentDescription ?? '',
      studentProfileImage:
        typeof location.state?.studentProfileImage === 'string'
          ? location.state.studentProfileImage
          : saved?.studentProfileImage ?? ''
    }
  }, [location.state])

  const [hourlyRatePublic, setHourlyRatePublic] = useState(data.hourlyRatePublic)
  const [hourlyRateNet, setHourlyRateNet] = useState(data.hourlyRateNet)

  useEffect(() => {
    setHourlyRatePublic(data.hourlyRatePublic)
    setHourlyRateNet(data.hourlyRateNet)
  }, [data.hourlyRateNet, data.hourlyRatePublic])

  useEffect(() => {
    const grossValue = parseAmount(hourlyRatePublic)
    if (!grossValue) {
      setHourlyRateNet('')
      return
    }

    const computedNet = grossValue * (1 - COMMISSION_RATE)
    setHourlyRateNet(formatAmount(computedNet))
  }, [hourlyRatePublic])

  useEffect(() => {
    saveStudentRegistrationProgress({
      currentStep: 9,
      profileForm: data.profileForm,
      formations: data.formations,
      portfolios: data.portfolios,
      presentationText: data.presentationText,
      selectedCategories: data.selectedCategories,
      keySkills: data.keySkills,
      keyQualities: data.keyQualities,
      lifeOutsideStudies: data.lifeOutsideStudies,
      availabilities: data.availabilities,
      hourlyRatePublic,
      hourlyRateNet,
      studentDescription: data.studentDescription,
      studentProfileImage: data.studentProfileImage
    })
  }, [
    data.profileForm,
    data.formations,
    data.portfolios,
    data.presentationText,
    data.selectedCategories,
    data.keySkills,
    data.keyQualities,
    data.lifeOutsideStudies,
    data.availabilities,
    hourlyRatePublic,
    hourlyRateNet,
    data.studentDescription,
    data.studentProfileImage
  ])

  const { progressPercent } = getStudentRegistrationProgress(10)

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col gap-5 p-5 pb-8">
        <header className="space-y-3">
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() =>
                navigate('/register-etudiant-availability', {
                  state: {
                    profileForm: data.profileForm,
                    formations: data.formations,
                    portfolios: data.portfolios,
                    presentationText: data.presentationText,
                    selectedCategories: data.selectedCategories,
                    keySkills: data.keySkills,
                    keyQualities: data.keyQualities,
                    lifeOutsideStudies: data.lifeOutsideStudies,
                    availabilities: data.availabilities,
                    hourlyRatePublic,
                    hourlyRateNet,
                    studentDescription: data.studentDescription,
                    studentProfileImage: data.studentProfileImage
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
          <h1 className="text-3xl font-bold text-epolia-purple">Déterminons votre taux horaire</h1>
          <p className="text-sm text-epolia-muted">
            Indiquez votre tarif affiché, nous calculons automatiquement votre montant net.
          </p>
        </header>

        <section className="space-y-4">
          <InputField
            label="Ce que voient les particuliers"
            type="text"
            inputMode="decimal"
            placeholder="Exemple: 25"
            value={hourlyRatePublic}
            onChange={(event) => setHourlyRatePublic(event.target.value)}
          />

          <InputField
            label="Ce que vous recevrez après déduction de la commission"
            type="text"
            value={hourlyRateNet ? `${hourlyRateNet} € / h` : ''}
            placeholder="Calcul automatique"
            readOnly
          />
        </section>

        <div className="mt-auto pb-2">
          <PrimaryButton
            type="button"
            disabled={!hourlyRatePublic.trim()}
            onClick={() =>
              navigate('/register-etudiant-about', {
                state: {
                  profileForm: data.profileForm,
                  formations: data.formations,
                  portfolios: data.portfolios,
                  presentationText: data.presentationText,
                  selectedCategories: data.selectedCategories,
                  keySkills: data.keySkills,
                  keyQualities: data.keyQualities,
                  lifeOutsideStudies: data.lifeOutsideStudies,
                  availabilities: data.availabilities,
                  hourlyRatePublic,
                  hourlyRateNet,
                  studentDescription: data.studentDescription,
                  studentProfileImage: data.studentProfileImage
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
