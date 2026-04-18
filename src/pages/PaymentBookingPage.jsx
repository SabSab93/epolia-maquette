import { useMemo, useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import { MobileShell } from '../components/MobileShell'
import { PrimaryButton } from '../components/PrimaryButton'

const HOUR_OPTIONS = [1, 2, 3, 4, 5]

function formatEuro(value) {
  return `${value.toFixed(2).replace('.', ',')}€`
}

export function PaymentBookingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const booking = location.state ?? {}

  const studentName = booking.studentName ?? 'Étudiant'
  const studentAvatar =
    booking.studentAvatar ??
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
  const hourlyRate = Number(booking.hourlyRate) || 20

  const [hours, setHours] = useState(2)
  const [note, setNote] = useState('')

  const totalPrice = useMemo(() => hours * hourlyRate, [hours, hourlyRate])

  return (
    <MobileShell>
      <div className="space-y-5 p-4 pb-8 text-epolia-text">
        <header className="space-y-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-epolia-purple"
          >
            <FaChevronLeft className="text-sm" aria-hidden="true" />
          </button>

          <h1 className="text-2xl font-bold text-[#58126A]">Choisir la durée et payer</h1>
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
              <p className="text-xs text-epolia-muted">Taux horaire: {formatEuro(hourlyRate)}</p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="inline-flex w-fit rounded-full bg-[#58126A] px-3.5 py-1.5 text-base font-bold text-white">
            Durée de la mission
          </h2>

          <div className="flex flex-wrap gap-2">
            {HOUR_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setHours(option)}
                className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
                  hours === option
                    ? 'border-[#FF661A] bg-[#FF661A] text-white'
                    : 'border-[#A592D4]/35 bg-white text-[#58126A]'
                }`}
              >
                {option}h
              </button>
            ))}
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-epolia-purple/10">
            <label htmlFor="brief" className="mb-2 block text-sm font-semibold text-[#58126A]">
              Détail de la mission (optionnel)
            </label>
            <textarea
              id="brief"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={3}
              placeholder="Exemple: coupe + brushing, samedi matin"
              className="w-full resize-none rounded-xl border border-transparent bg-[#F3E8CC]/40 px-3 py-2 text-sm text-epolia-text outline-none transition placeholder:text-epolia-muted focus:border-epolia-orange focus:bg-white"
            />
          </div>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-epolia-purple/10">
          <h2 className="text-sm font-semibold text-[#58126A]">Récapitulatif</h2>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-epolia-muted">Taux horaire</span>
              <span className="font-semibold text-[#58126A]">{formatEuro(hourlyRate)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-epolia-muted">Durée</span>
              <span className="font-semibold text-[#58126A]">{hours}h</span>
            </div>
            <div className="mt-1 h-px w-full bg-[#A592D4]/30" />
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#58126A]">Prix proposé</span>
              <span className="rounded-full bg-[#C3E841] px-3 py-1 text-base font-bold text-[#58126A]">{formatEuro(totalPrice)}</span>
            </div>
          </div>
        </section>

        <PrimaryButton onClick={() => navigate('/messages')}>
          Payer {formatEuro(totalPrice)}
        </PrimaryButton>
      </div>
    </MobileShell>
  )
}
