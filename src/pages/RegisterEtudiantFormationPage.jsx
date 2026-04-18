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

const LEVEL_OPTIONS = ['CAP', 'BEP', 'Bac', 'BTS', 'Licence', 'Master', 'Doctorat']

const EMPTY_FORMATION = {
  title: '',
  school: '',
  level: 'Licence',
  startDate: '',
  endDate: '',
  inProgress: false
}

const EMPTY_PROFILE_FORM = {
  lastName: '',
  firstName: '',
  email: '',
  phone: '',
  nif: ''
}

export function RegisterEtudiantFormationPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const source = location.state?.source === 'formations' ? 'formations' : 'preview'
  const editFormationId = location.state?.editFormationId ?? null

  const initialData = useMemo(() => {
    const saved = loadStudentRegistrationProgress()
    const formations =
      Array.isArray(location.state?.formations)
        ? location.state.formations
        : Array.isArray(saved?.formations)
          ? saved.formations
          : []
    const editingFormation = editFormationId
      ? formations.find((formation) => formation.id === editFormationId) ?? null
      : null

    return {
      profileForm: {
        ...EMPTY_PROFILE_FORM,
        ...(saved?.profileForm ?? {}),
        ...(location.state?.profileForm ?? {})
      },
      formations,
      portfolios:
        Array.isArray(location.state?.portfolios)
          ? location.state.portfolios
          : Array.isArray(saved?.portfolios)
            ? saved.portfolios
            : [],
      editingFormation,
      formationDraft: {
        ...EMPTY_FORMATION,
        ...(saved?.formationDraft ?? {}),
        ...(location.state?.formationDraft ?? {}),
        ...(editingFormation
          ? {
              title: editingFormation.title ?? '',
              school: editingFormation.school ?? '',
              level: editingFormation.level ?? 'Licence',
              startDate: editingFormation.startDate ?? '',
              endDate: editingFormation.endDate ?? '',
              inProgress: Boolean(editingFormation.inProgress)
            }
          : {})
      }
    }
  }, [location.state, editFormationId])

  const [form, setForm] = useState(initialData.formationDraft)

  useEffect(() => {
    setForm(initialData.formationDraft)
  }, [initialData])

  useEffect(() => {
    saveStudentRegistrationProgress({
      currentStep: 1,
      profileForm: initialData.profileForm,
      formations: initialData.formations,
      portfolios: initialData.portfolios,
      formationDraft: form
    })
  }, [form, initialData])

  const canSubmit = Boolean(
    form.title.trim() && form.school.trim() && form.level && form.startDate && (form.inProgress || form.endDate)
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!canSubmit) return

    const newFormation = {
      id: initialData.editingFormation?.id ?? `${Date.now()}`,
      title: form.title.trim(),
      school: form.school.trim(),
      level: form.level,
      startDate: form.startDate,
      endDate: form.inProgress ? '' : form.endDate,
      inProgress: form.inProgress
    }

    const nextFormations = initialData.editingFormation
      ? initialData.formations.map((formation) =>
          formation.id === initialData.editingFormation.id ? newFormation : formation
        )
      : [...initialData.formations, newFormation]

    saveStudentRegistrationProgress({
      currentStep: 1,
      profileForm: initialData.profileForm,
      formations: nextFormations,
      portfolios: initialData.portfolios,
      formationDraft: EMPTY_FORMATION
    })

    navigate('/register-etudiant-formations', {
      state: {
        formations: nextFormations,
        profileForm: initialData.profileForm,
        portfolios: initialData.portfolios,
        editFormationId: null
      }
    })
  }

  return (
    <MobileShell>
      <div className="space-y-6 p-5 pb-8">
        <header className="space-y-3">
          <button
            type="button"
            onClick={() => {
              if (source === 'formations') {
                navigate('/register-etudiant-formations', {
                  state: {
                    formations: initialData.formations,
                    profileForm: initialData.profileForm,
                    portfolios: initialData.portfolios,
                    editFormationId: null
                  }
                })
                return
              }

              navigate('/register-etudiant-preview', {
                state: {
                  currentStep: 1,
                  profileForm: initialData.profileForm,
                  formations: initialData.formations,
                  portfolios: initialData.portfolios,
                  editFormationId: null
                }
              })
            }}
            className="inline-flex items-center text-sm font-medium text-epolia-purple/80"
          >
            <FaChevronLeft className="text-[16px]" aria-hidden="true" />
          </button>
          <h1 className="text-3xl font-bold text-epolia-purple">Ajouter une formation</h1>
        </header>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            label="Intitulé de la formation"
            placeholder="BUT Informatique"
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            required
          />

          <InputField
            label="École"
            placeholder="IUT2 Grenoble"
            value={form.school}
            onChange={(event) => setForm({ ...form, school: event.target.value })}
            required
          />

          <label className="block space-y-2">
            <span className="text-sm font-medium text-[#58126A]">Niveau</span>
            <select
              value={form.level}
              onChange={(event) => setForm({ ...form, level: event.target.value })}
              className="w-full rounded-2xl border border-[#A592D4]/40 bg-[#F3E8CC]/35 px-4 py-3 text-sm text-epolia-text outline-none transition focus:border-epolia-orange focus:bg-white"
              required
            >
              {LEVEL_OPTIONS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </label>

          <InputField
            label="Date de début"
            type="month"
            value={form.startDate}
            onChange={(event) => setForm({ ...form, startDate: event.target.value })}
            required
          />

          <label className="flex items-center gap-2 rounded-xl bg-[#F3E8CC]/60 px-3 py-2">
            <input
              type="checkbox"
              checked={form.inProgress}
              onChange={(event) =>
                setForm({ ...form, inProgress: event.target.checked, endDate: event.target.checked ? '' : form.endDate })
              }
              className="h-4 w-4 rounded border-[#A592D4]/60 accent-[#58126A]"
            />
            <span className="text-sm font-medium text-[#58126A]">En cours</span>
          </label>

          <InputField
            label="Date de fin"
            type="month"
            value={form.endDate}
            onChange={(event) => setForm({ ...form, endDate: event.target.value })}
            disabled={form.inProgress}
            required={!form.inProgress}
          />

          <div className="pt-2">
            <PrimaryButton type="submit" disabled={!canSubmit}>
              {initialData.editingFormation ? 'Enregistrer les modifications' : 'Enregistrer'}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </MobileShell>
  )
}
