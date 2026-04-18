import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaChevronLeft, FaEdit, FaTrash } from 'react-icons/fa'
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

const steps = ['Créer votre profil', 'Formation', 'Portfolio', 'Présentation', 'Catégories', 'Compétences', 'Qualités']

export function RegisterEtudiantPortfoliosPage() {
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
  const [portfolios, setPortfolios] = useState(data.portfolios)

  useEffect(() => {
    setPortfolios(data.portfolios)
  }, [data.portfolios])

  useEffect(() => {
    saveStudentRegistrationProgress({
      currentStep: 2,
      profileForm: data.profileForm,
      formations: data.formations,
      portfolios,
      presentationText: data.presentationText,
      selectedCategories: data.selectedCategories,
      keySkills: data.keySkills,
      keyQualities: data.keyQualities
    })
  }, [data.profileForm, data.formations, portfolios, data.presentationText, data.selectedCategories, data.keySkills, data.keyQualities])

  const progress = ((3) / steps.length) * 100

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col gap-5 p-5 pb-8">
        <header className="space-y-3">
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() =>
                navigate('/register-etudiant-formations', {
                  state: {
                    profileForm: data.profileForm,
                    formations: data.formations,
                    portfolios,
                    presentationText: data.presentationText,
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
                  style={{ width: `${progress}%` }}
                />
              </div>
            </section>
          </div>
          <h1 className="text-3xl font-bold text-epolia-purple">Portfolio & réalisations</h1>
        </header>

        <section className="space-y-4">
          {portfolios.length > 0 ? (
            portfolios.map((portfolio) => (
              <article key={portfolio.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-epolia-purple/10">
                <div className="hide-scrollbar flex snap-x snap-mandatory overflow-x-auto">
                  {(portfolio.images ?? []).map((image, index) => (
                    <img
                      key={`${portfolio.id}-image-${index}`}
                      src={image}
                      alt={`${portfolio.title} ${index + 1}`}
                      className="h-48 w-full min-w-full snap-center object-cover"
                      loading="lazy"
                    />
                  ))}
                </div>
                <div className="space-y-2 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-base font-semibold text-[#58126A]">{portfolio.title}</h2>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Modifier le portfolio"
                        onClick={() =>
                          navigate('/register-etudiant-portfolio', {
                            state: {
                              profileForm: data.profileForm,
                              formations: data.formations,
                              portfolios,
                              source: 'portfolios',
                              editPortfolioId: portfolio.id,
                              keySkills: data.keySkills,
                              keyQualities: data.keyQualities
                            }
                          })
                        }
                        className="inline-flex items-center justify-center text-[#FF661A]"
                      >
                        <FaEdit className="text-[12px]" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        aria-label="Supprimer le portfolio"
                        onClick={() => {
                          const nextPortfolios = portfolios.filter((item) => item.id !== portfolio.id)
                          setPortfolios(nextPortfolios)
                        }}
                        className="inline-flex items-center justify-center text-[#FF661A]"
                      >
                        <FaTrash className="text-[12px]" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm leading-5 text-epolia-muted">{portfolio.description}</p>
                </div>
              </article>
            ))
          ) : (
            <p className="rounded-xl bg-white p-4 text-sm text-epolia-muted shadow-sm ring-1 ring-epolia-purple/10">
              Aucun portfolio ajouté pour le moment.
            </p>
          )}
        </section>

        <div className="mt-auto space-y-3 pb-2">
          <div className="text-center text-sm text-epolia-purple/80">
            <button
              type="button"
              onClick={() =>
                navigate('/register-etudiant-portfolio', {
                  state: {
                    profileForm: data.profileForm,
                    formations: data.formations,
                    portfolios,
                    presentationText: data.presentationText,
                    selectedCategories: data.selectedCategories,
                    keySkills: data.keySkills,
                    keyQualities: data.keyQualities,
                    source: 'portfolios',
                    editPortfolioId: null
                  }
                })
              }
              className="font-semibold text-epolia-purple"
            >
              Ajouter un portfolio
            </button>
          </div>

          <PrimaryButton
            type="button"
            onClick={() => {
              navigate('/register-etudiant-presentation', {
                state: {
                  profileForm: data.profileForm,
                  formations: data.formations,
                  portfolios,
                  presentationText: data.presentationText,
                  selectedCategories: data.selectedCategories,
                  keySkills: data.keySkills,
                  keyQualities: data.keyQualities
                }
              })
            }}
          >
            Suivant
          </PrimaryButton>
        </div>
      </div>
    </MobileShell>
  )
}
