import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaChevronLeft, FaEdit, FaTrash } from 'react-icons/fa'
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
function formatMonth(value) {
  if (!value) return ''
  const [year, month] = value.split('-')
  if (!year || !month) return value
  return `${month}/${year}`
}

export function RegisterEtudiantFormationsPage() {
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
            : []
    }
  }, [location.state])
  const [formations, setFormations] = useState(data.formations)
  const [portfolios, setPortfolios] = useState(data.portfolios)

  useEffect(() => {
    setFormations(data.formations)
    setPortfolios(data.portfolios)
  }, [data.formations, data.portfolios])

  useEffect(() => {
    saveStudentRegistrationProgress({
      currentStep: 1,
      profileForm: data.profileForm,
      formations,
      portfolios
    })
  }, [data.profileForm, formations, portfolios])
  const { progressPercent, progressLabel } = getStudentRegistrationProgress(2)

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col gap-5 p-5 pb-8">
        <header className="space-y-3">
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() =>
                navigate('/register-etudiant-formation', {
                  state: {
                    formations,
                    profileForm: data.profileForm,
                    portfolios
                  }
                })
              }
              className="inline-flex items-center text-sm font-medium text-epolia-purple/80"
            >
              <FaChevronLeft className="text-[16px]" aria-hidden="true" />
            </button>
            <section className="pointer-events-none absolute left-1/2 w-full max-w-[200px] -translate-x-1/2">
              <div className="h-1.5 overflow-hidden rounded-full bg-[#F3E8CC]">
                <div
                  className="h-full rounded-full bg-[#C3E841] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </section>
          </div>
          <p className="text-center text-xs font-semibold text-[#58126A]/70">{progressLabel}</p>
          <h1 className="text-3xl font-bold text-epolia-purple">Ajouter une formation</h1>
        </header>

        <section className="space-y-3">
          {formations.length > 0 ? (
            formations.map((formation) => (
              <article
                key={formation.id}
                className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-epolia-purple/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-[#58126A]">{formation.title}</p>
                    <p className="text-sm text-epolia-muted">{formation.school}</p>
                  </div>
                  <div className="flex items-center gap-2 text-[#58126A]/70">
                    <button
                      type="button"
                      aria-label="Modifier la formation"
                      onClick={() =>
                        navigate('/register-etudiant-formation', {
                          state: {
                            formations,
                            profileForm: data.profileForm,
                            portfolios,
                            source: 'formations',
                            editFormationId: formation.id
                          }
                        })
                      }
                      className="inline-flex h-8 w-8 items-center justify-center text-[#FF661A]"
                    >
                      <FaEdit className="text-[16px]" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label="Supprimer la formation"
                      onClick={() => {
                        const nextFormations = formations.filter((item) => item.id !== formation.id)
                        setFormations(nextFormations)
                      }}
                      className="inline-flex h-8 w-8 items-center justify-center text-[#FF661A]"
                    >
                      <FaTrash className="text-[16px]" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex items-end justify-between gap-3">
                  <p className="text-xs text-epolia-muted">
                    {formatMonth(formation.startDate)} - {formation.inProgress ? 'En cours' : formatMonth(formation.endDate)}
                  </p>
                  <span className="rounded-full bg-[#C3E841] px-2.5 py-1 text-xs font-semibold text-[#58126A]">
                    {formation.level}
                  </span>
                </div>
              </article>
            ))
          ) : (
            <p className="rounded-xl bg-white p-4 text-sm text-epolia-muted shadow-sm ring-1 ring-epolia-purple/10">
              Aucune formation ajoutée pour le moment.
            </p>
          )}
        </section>

        <div className="mt-auto space-y-3 pb-2">
          <div className="text-center text-sm text-epolia-purple/80">
            <button
              type="button"
              onClick={() =>
                navigate('/register-etudiant-formation', {
                  state: {
                    formations,
                    profileForm: data.profileForm,
                    portfolios,
                    source: 'formations'
                  }
                })
              }
              className="font-semibold text-epolia-purple"
            >
              Ajouter une formation
            </button>
          </div>

          <PrimaryButton
            type="button"
            onClick={() => {
              if (portfolios.length > 0) {
                navigate('/register-etudiant-portfolios', {
                  state: {
                    profileForm: data.profileForm,
                    formations,
                    portfolios
                  }
                })
                return
              }

              navigate('/register-etudiant-portfolio', {
                state: {
                  profileForm: data.profileForm,
                  formations,
                  portfolios
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
