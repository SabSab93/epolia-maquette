import { Link, useNavigate } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'
import { MobileShell } from '../components/MobileShell'

export function RegisterChoicePage() {
  const navigate = useNavigate()

  return (
    <MobileShell>
      <div className="space-y-8 p-5">
        <header className="space-y-3">
          <Link to="/login" className="inline-flex items-center text-sm font-medium text-epolia-purple/80">
            <FaChevronLeft className="text-[16px]" aria-hidden="true" />
          </Link>
          <h1 className="text-3xl font-bold text-epolia-purple">Qui êtes vous ?</h1>
        </header>

        <div className="space-y-7 pt-16">
          <button
            onClick={() => navigate('/register-particulier')}
            className="w-full rounded-[26px] border border-transparent bg-[#A592D4] px-5 py-5 text-left text-white shadow-soft"
          >
            <p className="text-lg font-semibold">Je suis un Particulier</p>
            <p className="mt-1 text-sm text-white/80">Je cherche un étudiant pour une mission ponctuelle.</p>
          </button>

          <button
            type="button"
            onClick={() => navigate('/register-etudiant-preview')}
            className="w-full rounded-[26px] border border-[#B3D73A] bg-[#C3E841] px-5 py-5 text-left text-[#58126A] shadow-soft ring-1 ring-[#B3D73A]/40"
          >
            <span className="block text-left">
              <span className="block text-lg font-semibold">Je suis un Étudiant</span>
              <span className="mt-1 block text-sm font-medium text-[#58126A]/85">
                Aperçu du futur parcours multi-étapes.
              </span>
            </span>
          </button>
        </div>
      </div>
    </MobileShell>
  )
}
