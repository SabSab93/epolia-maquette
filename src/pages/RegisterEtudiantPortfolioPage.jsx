import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'
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

const EMPTY_PORTFOLIO_FORM = {
  title: '',
  description: '',
  images: [],
  imageNames: []
}

export function RegisterEtudiantPortfolioPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const source = location.state?.source === 'portfolios' ? 'portfolios' : 'formations'
  const editPortfolioId = location.state?.editPortfolioId ?? null

  const initialData = useMemo(() => {
    const saved = loadStudentRegistrationProgress()
    const portfolios =
      Array.isArray(location.state?.portfolios)
        ? location.state.portfolios
        : Array.isArray(saved?.portfolios)
          ? saved.portfolios
          : []
    const editingPortfolio = editPortfolioId
      ? portfolios.find((portfolio) => portfolio.id === editPortfolioId) ?? null
      : null

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
      portfolios,
      editingPortfolio,
      portfolioDraft: {
        ...EMPTY_PORTFOLIO_FORM,
        ...(saved?.portfolioDraft ?? {}),
        ...(location.state?.portfolioDraft ?? {}),
        ...(editingPortfolio
          ? {
              title: editingPortfolio.title ?? '',
              description: editingPortfolio.description ?? '',
              images: editingPortfolio.images ?? [],
              imageNames:
                editingPortfolio.imageNames ??
                (editingPortfolio.images ?? []).map((_, index) => `Image ${index + 1}`)
            }
          : {})
      }
    }
  }, [location.state, editPortfolioId])

  const [form, setForm] = useState(initialData.portfolioDraft)

  useEffect(() => {
    setForm(initialData.portfolioDraft)
  }, [initialData])

  useEffect(() => {
    saveStudentRegistrationProgress({
      currentStep: 2,
      profileForm: initialData.profileForm,
      formations: initialData.formations,
      portfolios: initialData.portfolios,
      keySkills: initialData.keySkills,
      keyQualities: initialData.keyQualities,
      portfolioDraft: form
    })
  }, [form, initialData])

  const { progressPercent, progressLabel } = getStudentRegistrationProgress(3)
  const canSubmit = Boolean(form.title.trim() && form.description.trim() && form.images.length > 0)

  const handleImagesChange = (event) => {
    const files = Array.from(event.target.files ?? [])
    if (files.length === 0) return

    const imageUrls = files.map((file) => URL.createObjectURL(file))
    const imageNames = files.map((file) => file.name)

    setForm((current) => ({
      ...current,
      images: [...current.images, ...imageUrls],
      imageNames: [...current.imageNames, ...imageNames]
    }))

    event.target.value = ''
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!canSubmit) return

    const newPortfolio = {
      id: initialData.editingPortfolio?.id ?? `${Date.now()}`,
      title: form.title.trim(),
      description: form.description.trim(),
      images: form.images,
      imageNames: form.imageNames
    }

    const nextPortfolios = initialData.editingPortfolio
      ? initialData.portfolios.map((portfolio) =>
          portfolio.id === initialData.editingPortfolio.id ? newPortfolio : portfolio
        )
      : [...initialData.portfolios, newPortfolio]

    saveStudentRegistrationProgress({
      currentStep: 2,
      profileForm: initialData.profileForm,
      formations: initialData.formations,
      portfolios: nextPortfolios,
      keySkills: initialData.keySkills,
      keyQualities: initialData.keyQualities,
      portfolioDraft: EMPTY_PORTFOLIO_FORM
    })

    navigate('/register-etudiant-portfolios', {
      state: {
        profileForm: initialData.profileForm,
        formations: initialData.formations,
        portfolios: nextPortfolios,
        keySkills: initialData.keySkills,
        keyQualities: initialData.keyQualities,
        editPortfolioId: null
      }
    })
  }

  return (
    <MobileShell>
      <div className="space-y-6 p-5 pb-8">
        <header className="space-y-3">
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() => {
                if (source === 'portfolios') {
                  navigate('/register-etudiant-portfolios', {
                    state: {
                      profileForm: initialData.profileForm,
                      formations: initialData.formations,
                      portfolios: initialData.portfolios,
                      keySkills: initialData.keySkills,
                      keyQualities: initialData.keyQualities,
                      editPortfolioId: null
                    }
                  })
                  return
                }

                navigate('/register-etudiant-formations', {
                  state: {
                    profileForm: initialData.profileForm,
                    formations: initialData.formations,
                    portfolios: initialData.portfolios,
                    keySkills: initialData.keySkills,
                    keyQualities: initialData.keyQualities,
                    editPortfolioId: null
                  }
                })
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
          <h1 className="text-3xl font-bold text-epolia-purple">Ajouter un portfolio</h1>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            label="Intitulé"
            placeholder="Application de réservation"
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            required
          />

          <label className="block space-y-2">
            <span className="text-sm font-medium text-[#58126A]">Importer des images</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              className="w-full rounded-2xl border border-[#A592D4]/40 bg-[#F3E8CC]/35 px-4 py-3 text-sm text-epolia-text file:mr-3 file:rounded-full file:border-0 file:bg-[#58126A] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white"
            />
          </label>

          {form.imageNames.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {form.imageNames.map((name, index) => (
                <span key={`${name}-${index}`} className="rounded-full bg-[#A592D4] px-2.5 py-1 text-xs font-medium text-white">
                  {name}
                </span>
              ))}
            </div>
          ) : null}

          <label className="block space-y-2">
            <span className="text-sm font-medium text-[#58126A]">Description</span>
            <textarea
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              rows={4}
              placeholder="Décrivez cette réalisation..."
              className="w-full resize-none rounded-2xl border border-[#A592D4]/40 bg-[#F3E8CC]/35 px-4 py-3 text-sm text-epolia-text outline-none transition placeholder:text-epolia-muted focus:border-epolia-orange focus:bg-white"
              required
            />
          </label>

          <PrimaryButton type="submit" disabled={!canSubmit}>
            {initialData.editingPortfolio ? 'Enregistrer les modifications' : 'Suivant'}
          </PrimaryButton>
        </form>
      </div>
    </MobileShell>
  )
}
