import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'
import { MobileShell } from '../components/MobileShell'
import { PrimaryButton } from '../components/PrimaryButton'
import {
  clearStudentRegistrationProgress,
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
  'Tarif horaire',
  'Description'
]

export function RegisterEtudiantAboutPage() {
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

  const [description, setDescription] = useState(data.studentDescription)
  const [profileImage, setProfileImage] = useState(data.studentProfileImage)

  useEffect(() => {
    setDescription(data.studentDescription)
    setProfileImage(data.studentProfileImage)
  }, [data.studentDescription, data.studentProfileImage])

  useEffect(() => {
    saveStudentRegistrationProgress({
      currentStep: 10,
      profileForm: data.profileForm,
      formations: data.formations,
      portfolios: data.portfolios,
      presentationText: data.presentationText,
      selectedCategories: data.selectedCategories,
      keySkills: data.keySkills,
      keyQualities: data.keyQualities,
      lifeOutsideStudies: data.lifeOutsideStudies,
      availabilities: data.availabilities,
      hourlyRatePublic: data.hourlyRatePublic,
      hourlyRateNet: data.hourlyRateNet,
      studentDescription: description,
      studentProfileImage: profileImage
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
    data.hourlyRatePublic,
    data.hourlyRateNet,
    description,
    profileImage
  ])

  const progress = (11 / steps.length) * 100

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProfileImage(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col gap-5 p-5 pb-8">
        <header className="space-y-3">
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() =>
                navigate('/register-etudiant-rate', {
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
                    hourlyRatePublic: data.hourlyRatePublic,
                    hourlyRateNet: data.hourlyRateNet,
                    studentDescription: description,
                    studentProfileImage: profileImage
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
          <h1 className="text-3xl font-bold text-epolia-purple">Une description de vous</h1>

        </header>

        <section className="space-y-4">
          <label htmlFor="student-description" className="block space-y-2">
            <span className="text-sm font-medium text-[#58126A]">Description</span>
            <textarea
              id="student-description"
              rows={5}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Parlez de votre parcours, de votre façon de travailler et de ce que vous aimez réaliser."
              className="w-full resize-none rounded-2xl border border-[#A592D4]/40 bg-[#F3E8CC]/35 px-4 py-3 text-sm text-epolia-text outline-none transition placeholder:text-epolia-muted focus:border-epolia-orange focus:bg-white"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-[#58126A]">Photo de profil</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-epolia-muted file:mr-3 file:rounded-full file:border-0 file:bg-[#A592D4] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white"
            />
          </label>

          {profileImage ? (
            <div className="overflow-hidden rounded-2xl border border-[#A592D4]/30 bg-white">
              <img src={profileImage} alt="Aperçu du profil" className="h-44 w-full object-cover" />
            </div>
          ) : null}
        </section>

        <div className="mt-auto pb-2">
          <PrimaryButton
            type="button"
            disabled={!description.trim()}
            onClick={() => {
              clearStudentRegistrationProgress()
              navigate('/dashboard-etudiant', {
                replace: true,
                state: {
                  showCguModal: true
                }
              })
            }}
          >
            Terminer
          </PrimaryButton>
        </div>
      </div>
    </MobileShell>
  )
}
