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

export function RegisterEtudiantSkillsPage() {
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

  const [skills, setSkills] = useState(data.keySkills)
  const [query, setQuery] = useState('')

  useEffect(() => {
    setSkills(data.keySkills)
  }, [data.keySkills])

  useEffect(() => {
    saveStudentRegistrationProgress({
      currentStep: 5,
      profileForm: data.profileForm,
      formations: data.formations,
      portfolios: data.portfolios,
      presentationText: data.presentationText,
      selectedCategories: data.selectedCategories,
      keySkills: skills,
      keyQualities: data.keyQualities
    })
  }, [data.profileForm, data.formations, data.portfolios, data.presentationText, data.selectedCategories, skills, data.keyQualities])

  const { progressPercent, progressLabel } = getStudentRegistrationProgress(6)

  const addSkill = (rawValue) => {
    const value = rawValue.trim()
    if (!value) return
    if (skills.some((skill) => skill.toLowerCase() === value.toLowerCase())) return
    if (skills.length >= 4) return
    setSkills((current) => [...current, value])
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
                navigate('/register-etudiant-categories', {
                  state: {
                    profileForm: data.profileForm,
                    formations: data.formations,
                    portfolios: data.portfolios,
                    presentationText: data.presentationText,
                    selectedCategories: data.selectedCategories,
                    keySkills: skills,
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
          <p className="text-center text-xs font-semibold text-[#58126A]/70">{progressLabel}</p>
          <h1 className="text-3xl font-bold text-epolia-purple">Vos 4 compétences clé</h1>
        </header>

        <section className="space-y-3">
          <label htmlFor="skill-search" className="sr-only">
            Rechercher une compétence
          </label>
          <input
            id="skill-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                addSkill(query)
              }
            }}
            placeholder="Exemple: UI mobile"
            className="w-full rounded-xl border border-[#A592D4]/40 bg-[#F3E8CC]/35 px-4 py-3 text-sm text-epolia-text outline-none transition placeholder:text-epolia-muted focus:border-epolia-orange focus:bg-white"
          />

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => setSkills((current) => current.filter((item) => item !== skill))}
                className="inline-flex items-center gap-1 rounded-full bg-[#A592D4] px-3 py-1.5 text-xs font-semibold text-white"
              >
                <span>{skill}</span>
                <span className="text-sm leading-none">×</span>
              </button>
            ))}
          </div>

          <p className="text-xs text-epolia-muted">{skills.length}/4 compétences ajoutées.</p>
        </section>

        <div className="mt-auto pb-2">
          <PrimaryButton
            type="button"
            disabled={skills.length === 0}
            onClick={() =>
              navigate('/register-etudiant-qualities', {
                state: {
                  profileForm: data.profileForm,
                  formations: data.formations,
                  portfolios: data.portfolios,
                  presentationText: data.presentationText,
                  selectedCategories: data.selectedCategories,
                  keySkills: skills,
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
