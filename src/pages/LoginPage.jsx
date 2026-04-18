import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaChevronLeft, FaGoogle } from 'react-icons/fa'
import { MobileShell } from '../components/MobileShell'
import { InputField } from '../components/InputField'
import { PrimaryButton } from '../components/PrimaryButton'
import { SecondaryButton } from '../components/SecondaryButton'
import { useAuth } from '../contexts/AuthContext'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextUser = login({ email: form.email || 'visiteur.particulier@epolia.app' })

    if (nextUser?.type === 'etudiant') {
      navigate('/dashboard-etudiant')
      return
    }

    navigate('/')
  }

  return (
    <MobileShell>
      <div className="flex min-h-screen flex-col p-5">
        <div className="flex items-center justify-between pb-4">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-epolia-purple/80">
            <FaChevronLeft className="text-[16px]" aria-hidden="true" />
          </Link>
        </div>

        <div className="mx-auto w-full max-w-[360px]">
          <div className="mb-6 flex items-center justify-start gap-3">
            <h1 className="text-2xl font-bold text-epolia-purple">Connexion à</h1>
            <img
              src="/icons/icon-epolia.png"
              alt="Epolia"
              className="h-10 w-auto object-contain"
              loading="eager"
            />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputField
              label="Email ou numéro de téléphone"
              type="text"
              placeholder="vous@exemple.com"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
            />

            <div className="space-y-2">
              <InputField
                label="Mot de passe"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                required
              />
              <div className="flex justify-end">
                <button type="button" className="text-xs font-medium text-epolia-purple/80">
                  Mot de passe oublié
                </button>
              </div>
            </div>

            <PrimaryButton type="submit">Se connecter</PrimaryButton>

            <div className="flex items-center gap-3 py-1">
              <span className="h-px flex-1 bg-epolia-purple/20" />
              <span className="text-xs font-medium uppercase tracking-[0.08em] text-epolia-purple/60">ou</span>
              <span className="h-px flex-1 bg-epolia-purple/20" />
            </div>

            <SecondaryButton type="button" className="inline-flex items-center justify-center gap-2">
              <FaGoogle className="text-[15px]" aria-hidden="true" />
              Connexion avec Google
            </SecondaryButton>
          </form>
        </div>

        <div className="mt-auto pt-6 text-center text-sm text-epolia-purple/80">
          <span>Vous n'avez pas de compte ? </span>
          <Link to="/register-choice" className="font-semibold text-epolia-purple">
            S'inscrire
          </Link>
        </div>
      </div>
    </MobileShell>
  )
}
