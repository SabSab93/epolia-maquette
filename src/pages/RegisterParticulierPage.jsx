import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'
import { MobileShell } from '../components/MobileShell'
import { InputField } from '../components/InputField'
import { PrimaryButton } from '../components/PrimaryButton'
import { useAuth } from '../contexts/AuthContext'

export function RegisterParticulierPage() {
  const navigate = useNavigate()
  const { registerParticulier } = useAuth()
  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    email: '',
    city: '',
    password: '',
    confirmPassword: ''
  })

  const passwordsMatch = form.password === form.confirmPassword

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!passwordsMatch) return

    registerParticulier({
      firstName: form.firstName,
      email: form.email,
      city: form.city
    })
    navigate('/')
  }

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col p-5 pb-8">
        <header className="space-y-3">
          <Link to="/register-choice" className="inline-flex items-center text-sm font-medium text-epolia-purple/80">
            <FaChevronLeft className="text-[16px]" aria-hidden="true" />
          </Link>
          <h1 className="text-3xl font-bold text-epolia-purple">Créer un compte Particulier</h1>
          <p className="text-sm text-epolia-muted">Renseignez vos informations pour démarrer sur Epolia.</p>
        </header>

        <form className="mt-6 flex flex-1 flex-col space-y-4" onSubmit={handleSubmit}>
          <InputField
            label="Nom"
            placeholder="Cochet"
            value={form.lastName}
            onChange={(event) => setForm({ ...form, lastName: event.target.value })}
            required
          />
          <InputField
            label="Prénom"
            placeholder="Théo"
            value={form.firstName}
            onChange={(event) => setForm({ ...form, firstName: event.target.value })}
            required
          />

          <InputField
            label="Email"
            type="email"
            placeholder="theo.particulier@exemple.com"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            required
          />
          <InputField
            label="Ville"
            placeholder="Grenoble"
            value={form.city}
            onChange={(event) => setForm({ ...form, city: event.target.value })}
            required
          />
          <InputField
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            required
          />
          <InputField
            label="Confirmer le mot de passe"
            type="password"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
            required
          />

          {!passwordsMatch ? (
            <p className="rounded-xl bg-[#F3E8CC] px-3 py-2 text-xs font-medium text-[#58126A]">
              Les mots de passe doivent être identiques.
            </p>
          ) : null}

          <div className="mt-auto pb-4">
            <PrimaryButton type="submit" disabled={!passwordsMatch}>
              Créer mon compte
            </PrimaryButton>
          </div>
        </form>
      </div>
    </MobileShell>
  )
}
