import { FaChevronLeft, FaStar } from 'react-icons/fa'
import { useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { MobileShell } from '../components/MobileShell'
import { useAuth } from '../contexts/AuthContext'
import { marketplaceProfiles } from '../data/mockData'

const MONTHS_FR = {
  janvier: '01',
  fevrier: '02',
  février: '02',
  mars: '03',
  avril: '04',
  mai: '05',
  juin: '06',
  juillet: '07',
  aout: '08',
  août: '08',
  septembre: '09',
  octobre: '10',
  novembre: '11',
  decembre: '12',
  décembre: '12'
}

function formatToJJMMAAAA(rawDate) {
  if (!rawDate || typeof rawDate !== 'string') {
    return ''
  }

  const slashPattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
  const slashMatch = rawDate.trim().match(slashPattern)
  if (slashMatch) {
    const day = slashMatch[1].padStart(2, '0')
    const month = slashMatch[2].padStart(2, '0')
    const year = slashMatch[3]
    return `${day}/${month}/${year}`
  }

  const normalized = rawDate
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
  const parts = normalized.split(' ')
  if (parts.length === 3) {
    const [dayRaw, monthRaw, year] = parts
    const day = dayRaw.padStart(2, '0')
    const month = MONTHS_FR[monthRaw]
    if (month && /^\d{4}$/.test(year)) {
      return `${day}/${month}/${year}`
    }
  }

  const parsed = new Date(rawDate)
  if (!Number.isNaN(parsed.getTime())) {
    const day = String(parsed.getDate()).padStart(2, '0')
    const month = String(parsed.getMonth() + 1).padStart(2, '0')
    const year = parsed.getFullYear()
    return `${day}/${month}/${year}`
  }

  return rawDate
}

export function StudentProfileViewPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { id } = useParams()
  const profile = useMemo(() => {
    if (location.state?.user) {
      return location.state.user
    }

    const numericId = Number(id)
    return marketplaceProfiles.find((item) => item.id === numericId) ?? null
  }, [location.state, id])

  if (!profile) {
    return (
      <MobileShell>
        <div className="space-y-4 p-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-epolia-purple"
          >
            <FaChevronLeft className="text-[16px]" aria-hidden="true" />
          </button>
          <h1 className="text-2xl font-bold text-epolia-purple">Profil étudiant</h1>
          <p className="text-sm text-epolia-muted">Profil indisponible. Retournez au fil pour sélectionner un étudiant.</p>
        </div>
      </MobileShell>
    )
  }

  const estimatedMissions = Math.max(6, Math.round(profile.rating * 4))
  const detailedDescription =
    profile.studentDescription ??
    'Cet étudiant est disponible pour des missions ponctuelles et s’adapte aux besoins des particuliers.'
  const studyText = profile.formation ?? profile.currentStudy ?? profile.studentFormation ?? ''
  const portfolioProjects =
    profile.portfolioProjects ??
    (profile.portfolioImages ?? []).map((image, index) => ({
      image,
      title: `Réalisation ${index + 1}`,
      description: 'Exemple de mission réalisée par l’étudiant.',
      date: 'Date à préciser'
    }))
  const clientReviews =
    profile.clientReviews ??
    [
      {
        reviewerName: 'Particulier',
        reviewerPhoto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        rating: profile.rating,
        comment: 'Très bonne expérience, prestation conforme à mes attentes.',
        date: 'Date à préciser'
      }
    ]

  return (
    <MobileShell>
      <div className="space-y-4 p-4 pb-28">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-epolia-purple"
        >
          <FaChevronLeft className="text-[16px]" aria-hidden="true" />
        </button>

        <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-epolia-purple/10">
          <div className="flex items-start gap-4">
            <div className="w-[42%] space-y-3">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-40 w-full rounded-2xl object-cover"
                loading="lazy"
              />
              <div>
                <h1 className="text-lg font-bold text-epolia-purple">{profile.name}</h1>
                <p className="text-sm text-epolia-muted">{profile.location}</p>
                {studyText ? <p className="mt-1 text-sm text-epolia-muted">{studyText}</p> : null}
              </div>
            </div>

            <div className="min-w-0 flex-1 space-y-3">
              <div className="grid grid-cols-1 gap-2">
                <div className="rounded-xl bg-[#F3E8CC] px-3 py-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#58126A]">Missions réalisées</p>
                  <p className="text-base font-bold text-[#58126A]">{estimatedMissions}</p>
                </div>
                <div className="rounded-xl bg-[#A592D4] px-3 py-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#58126A]">Notes</p>
                  <p className="inline-flex items-center gap-1 text-base font-bold text-[#58126A]">
                    <FaStar className="text-[12px] text-epolia-orange" aria-hidden="true" />
                    {profile.rating}
                  </p>
                </div>
                <div className="rounded-xl bg-[#C3E841] px-3 py-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#58126A]">Taux horaire</p>
                  <p className="text-base font-bold text-[#58126A]">{profile.price}€/h</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {profile.skills?.map((skill) => (
                  <span key={skill} className="rounded-full bg-[#A592D4] px-2.5 py-1 text-xs font-medium text-white">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        <section>
          <p className="text-sm leading-6 text-epolia-muted">{detailedDescription}</p>
        </section>

        <section className="space-y-3">
          <h2 className="inline-flex w-fit rounded-full bg-[#58126A] px-3.5 py-1.5 text-base font-bold text-white">
            Réalisations et portfolio
          </h2>
          <div className="hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
            {portfolioProjects.map((project, index) => (
              <article
                key={`${profile.id}-project-${index}`}
                className="min-w-[88%] snap-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-epolia-purple/10"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
                <div className="space-y-2 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold text-[#58126A]">{project.title}</h3>
                    <span className="rounded-full bg-[#C3E841] px-2 py-1 text-[11px] font-medium text-[#58126A]">
                      {formatToJJMMAAAA(project.date)}
                    </span>
                  </div>
                  <p className="text-sm leading-5 text-epolia-muted">{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="inline-flex w-fit rounded-full bg-[#58126A] px-3.5 py-1.5 text-base font-bold text-white">
            Avis
          </h2>
          <div className="hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
            {clientReviews.map((review, index) => (
              <article
                key={`${profile.id}-review-${index}`}
                className="min-w-[88%] snap-center rounded-xl bg-white p-3 shadow-sm ring-1 ring-epolia-purple/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <img
                      src={review.reviewerPhoto}
                      alt={review.reviewerName}
                      className="h-11 w-11 rounded-full bg-[#F3E8CC] object-cover"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#58126A]">{review.reviewerName}</p>
                      <p className="inline-flex items-center gap-1 text-xs font-semibold text-[#58126A]">
                        <FaStar className="text-[11px] text-epolia-orange" aria-hidden="true" />
                        Note globale {review.rating}/5
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#C3E841] px-2 py-1 text-[11px] font-medium text-[#58126A]">
                    {formatToJJMMAAAA(review.date)}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-5 text-epolia-muted">{review.comment}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 z-30 w-[calc(100%-2rem)] max-w-[398px] -translate-x-1/2">
        <button
          type="button"
          onClick={() =>
            !user
              ? navigate('/')
              : navigate('/messages', {
                  state: {
                    openConversationId: `contact-${profile.id}`,
                    showNegotiationInfo: true,
                    startConversation: {
                      id: `contact-${profile.id}`,
                      from: profile.name,
                      avatar: profile.avatar,
                      hourlyRate: profile.price,
                      requiresPayment: true,
                      unread: true,
                      preview: `Bonjour ${profile.name}, je souhaite discuter de ma mission.`,
                      time: 'Maintenant',
                      thread: [
                        {
                          id: `contact-${profile.id}-1`,
                          from: 'system',
                          text: 'Vous pouvez discuter et négocier les modalités avec l’étudiant avant de valider le paiement.',
                          time: 'Maintenant'
                        },
                        {
                          id: `contact-${profile.id}-2`,
                          from: 'me',
                          text: `Bonjour ${profile.name}, je souhaite discuter de ma mission.`,
                          time: 'Maintenant'
                        }
                      ]
                    }
                  }
                })
          }
          className="w-full rounded-2xl bg-epolia-orange px-4 py-3 text-sm font-semibold text-white shadow-sm"
        >
          Contacter
        </button>
      </div>
    </MobileShell>
  )
}
