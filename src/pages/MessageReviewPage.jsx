import { useState } from 'react'
import { FaChevronLeft, FaStar } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import { MobileShell } from '../components/MobileShell'
import { PrimaryButton } from '../components/PrimaryButton'

const M3_COMPLETED_STORAGE_KEY = 'epolia-m3-mission-completed'

export function MessageReviewPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const payload = location.state ?? {}

  const studentName = payload.studentName ?? 'Inès B.'
  const studentAvatar =
    payload.studentAvatar ?? 'https://picsum.photos/seed/message-hair/120/120'

  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [service, setService] = useState('Coupe + brushing')
  const [description, setDescription] = useState('')

  const canSubmit = rating > 0 && title.trim().length > 0 && description.trim().length > 0

  const handleSubmit = () => {
    if (!canSubmit) return
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(M3_COMPLETED_STORAGE_KEY, 'true')
    }
    navigate('/messages', {
      state: {
        openConversationId: 'm-3'
      }
    })
  }

  return (
    <MobileShell>
      <div className="space-y-5 p-4 pb-8">
        <header className="space-y-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-epolia-purple"
          >
            <FaChevronLeft className="text-sm" aria-hidden="true" />
          </button>

          <h1 className="text-2xl font-bold text-[#58126A]">Laisser un avis</h1>
        </header>

        <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-epolia-purple/10">
          <div className="flex items-center gap-3">
            <img
              src={studentAvatar}
              alt={studentName}
              className="h-12 w-12 rounded-full bg-[#F3E8CC] object-cover"
              loading="lazy"
            />
            <div>
              <p className="text-sm font-semibold text-[#58126A]">{studentName}</p>
              <p className="text-xs text-epolia-muted">Merci de noter cette mission</p>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-epolia-purple/10">
          <div>
            <p className="text-sm font-semibold text-[#58126A]">Votre note</p>
            <div className="mt-2 flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button key={value} type="button" onClick={() => setRating(value)} className="text-xl">
                  <FaStar
                    className={value <= rating ? 'text-epolia-orange' : 'text-[#A592D4]/35'}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#58126A]">Titre de l&apos;avis</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Exemple: Très satisfaite de la prestation"
              className="w-full rounded-xl border border-[#A592D4]/35 bg-[#F3E8CC]/35 px-3 py-2 text-sm text-epolia-text outline-none transition placeholder:text-epolia-muted focus:border-epolia-orange focus:bg-white"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#58126A]">Service réalisé</span>
            <input
              value={service}
              onChange={(event) => setService(event.target.value)}
              placeholder="Exemple: Coupe + brushing"
              className="w-full rounded-xl border border-[#A592D4]/35 bg-[#F3E8CC]/35 px-3 py-2 text-sm text-epolia-text outline-none transition placeholder:text-epolia-muted focus:border-epolia-orange focus:bg-white"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[#58126A]">Descriptif</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              placeholder="Décrivez votre expérience (ponctualité, qualité, communication...)"
              className="w-full resize-none rounded-xl border border-[#A592D4]/35 bg-[#F3E8CC]/35 px-3 py-2 text-sm text-epolia-text outline-none transition placeholder:text-epolia-muted focus:border-epolia-orange focus:bg-white"
            />
          </label>
        </section>

        <PrimaryButton onClick={handleSubmit} disabled={!canSubmit}>
          Publier l&apos;avis
        </PrimaryButton>
      </div>
    </MobileShell>
  )
}
