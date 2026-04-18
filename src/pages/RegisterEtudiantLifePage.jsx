import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'
import { MobileShell } from '../components/MobileShell'
import { PrimaryButton } from '../components/PrimaryButton'
import {
  loadStudentRegistrationProgress,
  saveStudentRegistrationProgress
} from '../utils/studentRegistrationProgress'

const EMPTY_PROFILE_FORM = {
  lastName: '',
  firstName: '',
  email: '',
  phone: '',
  nif: ''
}

const steps = [
  'Créer votre profil',
  'Formation',
  'Portfolio',
  'Présentation',
  'Catégories',
  'Compétences',
  'Qualités',
  'Vie perso',
  'Disponibilités',
  'Tarif horaire'
]

export function RegisterEtudiantLifePage() {
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
          : saved?.hourlyRateNet ?? ''
    }
  }, [location.state])

  const [lifeTags, setLifeTags] = useState(data.lifeOutsideStudies)
  const [query, setQuery] = useState('')

  useEffect(() => {
    setLifeTags(data.lifeOutsideStudies)
  }, [data.lifeOutsideStudies])

  useEffect(() => {
    saveStudentRegistrationProgress({
      currentStep: 7,
      profileForm: data.profileForm,
      formations: data.formations,
      portfolios: data.portfolios,
      presentationText: data.presentationText,
      selectedCategories: data.selectedCategories,
      keySkills: data.keySkills,
      keyQualities: data.keyQualities,
      lifeOutsideStudies: lifeTags,
      availabilities: data.availabilities,
      hourlyRatePublic: data.hourlyRatePublic,
      hourlyRateNet: data.hourlyRateNet
    })
  }, [
    data.profileForm,
    data.formations,
    data.portfolios,
    data.presentationText,
    data.selectedCategories,
    data.keySkills,
    data.keyQualities,
    lifeTags,
    data.availabilities,
    data.hourlyRatePublic,
    data.hourlyRateNet
  ])

  const progress = (8 / steps.length) * 100

  const addLifeTag = (rawValue) => {
    const value = rawValue.trim()
    if (!value) return
    if (lifeTags.some((tag) => tag.toLowerCase() === value.toLowerCase())) return
    setLifeTags((current) => [...current, value])
    setQuery('')
  }

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col gap-5 p-5 pb-8">
        <header className="space-y-3">
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() =>
                navigate('/register-etudiant-qualities', {
                  state: {
                    profileForm: data.profileForm,
                    formations: data.formations,
                    portfolios: data.portfolios,
                    presentationText: data.presentationText,
                    selectedCategories: data.selectedCategories,
                    keySkills: data.keySkills,
                    keyQualities: data.keyQualities,
                    lifeOutsideStudies: lifeTags,
                    availabilities: data.availabilities,
                    hourlyRatePublic: data.hourlyRatePublic,
                    hourlyRateNet: data.hourlyRateNet
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
                  style={{ width: `${progress}%` }}
                />
              </div>
            </section>
          </div>
          <h1 className="text-3xl font-bold text-epolia-purple">Ma vie en dehors des études</h1>
          <p className="text-sm text-epolia-muted">Ajoutez vos centres d’intérêt avec Entrée.</p>
        </header>

        <section className="space-y-3">
          <label htmlFor="life-search" className="sr-only">
            Rechercher
          </label>
          <input
            id="life-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                addLifeTag(query)
              }
            }}
            placeholder="Exemple: Photographie"
            className="w-full rounded-xl border border-[#A592D4]/40 bg-[#F3E8CC]/35 px-4 py-3 text-sm text-epolia-text outline-none transition placeholder:text-epolia-muted focus:border-epolia-orange focus:bg-white"
          />

          <div className="flex flex-wrap gap-2">
            {lifeTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setLifeTags((current) => current.filter((item) => item !== tag))}
                className="inline-flex items-center gap-1 rounded-full bg-[#A592D4] px-3 py-1.5 text-xs font-semibold text-white"
              >
                <span>{tag}</span>
                <span className="text-sm leading-none">×</span>
              </button>
            ))}
          </div>

          <p className="text-xs text-epolia-muted">{lifeTags.length} élément(s) ajouté(s).</p>
        </section>

        <div className="mt-auto pb-2">
          <PrimaryButton
            type="button"
            disabled={lifeTags.length === 0}
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
                  lifeOutsideStudies: lifeTags,
                  availabilities: data.availabilities,
                  hourlyRatePublic: data.hourlyRatePublic,
                  hourlyRateNet: data.hourlyRateNet
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
