import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaChevronDown, FaChevronUp, FaCog, FaEuroSign, FaGraduationCap, FaRegClock, FaShareAlt } from 'react-icons/fa'
import { MobileShell } from '../components/MobileShell'
import { useAuth } from '../contexts/AuthContext'
import profil1 from '../assets/images/profil/profil1.png'
import profil2 from '../assets/images/profil/profil2.png'
import profil3 from '../assets/images/profil/profil3.png'
import profil4 from '../assets/images/profil/profil4.png'
import profil5 from '../assets/images/profil/profil5.png'
import profil6 from '../assets/images/profil/profil6.png'
import profil7 from '../assets/images/profil/profil7.png'

export function ProfilePage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const isStudent = user?.type === 'etudiant'
  const [openSection, setOpenSection] = useState(null)
  const profileAvatar = useMemo(() => {
    const profileAvatars = [profil1, profil2, profil3, profil4, profil5, profil6, profil7]
    const randomIndex = Math.floor(Math.random() * profileAvatars.length)
    return profileAvatars[randomIndex]
  }, [])

  const currentMissions = [
    { id: 'm1', title: 'Aide aux devoirs (maths)', date: '24 avril 2026' },
    { id: 'm2', title: 'Création d’invitation anniversaire', date: '26 avril 2026' }
  ]

  const completedMissions = [
    { id: 'm3', title: 'Cours d’anglais conversation', date: '14 avril 2026' },
    { id: 'm4', title: 'Mise en page CV', date: '10 avril 2026' },
    { id: 'm5', title: 'Aide installation application', date: '3 avril 2026' }
  ]

  const toggleSection = (section) => {
    setOpenSection((current) => (current === section ? null : section))
  }

  const studentPreviewProfile = {
    id: 0,
    name: `${user?.firstName ?? 'Étudiant'} Epolia`,
    rating: 4.9,
    skill: 'Étudiant Epolia',
    location: user?.city ?? 'Grenoble',
    distance: 0,
    price: 24,
    skills: ['React Native', 'UI mobile', 'No-code'],
    studentDescription:
      "Je réalise des missions digitales pour les particuliers avec une approche claire et structurée.",
    avatar: profileAvatar,
    portfolioImages: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80'
    ],
    portfolioProjects: [
      {
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
        title: 'Application de réservation locale',
        description: 'Prototype mobile avec parcours simple pour un usage particulier.',
        date: '10/04/2026'
      }
    ],
    clientReviews: [
      {
        reviewerName: 'Client Epolia',
        reviewerPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
        rating: 5,
        comment: 'Très bonne qualité de service et excellent suivi.',
        date: '12/04/2026'
      }
    ]
  }

  const studentQualities = ['Réactif', 'Organisé', 'Pédagogue', 'Autonome', 'Ponctuel']
  const studentStudies = [
    'Master UX/UI Design - Grenoble École de Management',
    'BTS SIO - Option SLAM'
  ]
  const studentMissionPreferences = [
    'Missions courtes (2h à 4h)',
    'Disponibilité soir et week-end',
    'Priorité aux projets web/mobile'
  ]
  const studentAccordionSections = [
    { id: 'description', label: 'Description' },
    { id: 'competences', label: 'Compétences' },
    { id: 'qualites', label: 'Qualités' },
    { id: 'portfolio', label: 'Portfolio et réalisations' },
    { id: 'etude', label: 'Étude' },
    { id: 'preferences', label: 'Préférence de mission' }
  ]

  const renderStudentSectionContent = (sectionId) => {
    if (sectionId === 'description') {
      return <p className="text-sm leading-6 text-epolia-muted">{studentPreviewProfile.studentDescription}</p>
    }

    if (sectionId === 'competences') {
      return (
        <div className="flex flex-wrap gap-2">
          {studentPreviewProfile.skills.map((skill) => (
            <span key={skill} className="rounded-full bg-[#A592D4] px-3 py-1 text-xs font-semibold text-white">
              {skill}
            </span>
          ))}
        </div>
      )
    }

    if (sectionId === 'qualites') {
      return (
        <div className="flex flex-wrap gap-2">
          {studentQualities.map((quality) => (
            <span key={quality} className="rounded-full bg-[#C3E841] px-3 py-1 text-xs font-semibold text-[#58126A]">
              {quality}
            </span>
          ))}
        </div>
      )
    }

    if (sectionId === 'portfolio') {
      return (
        <div className="space-y-2">
          {studentPreviewProfile.portfolioProjects.map((project) => (
            <article key={project.title} className="rounded-xl bg-[#F3E8CC]/60 p-3">
              <p className="text-sm font-semibold text-[#58126A]">{project.title}</p>
              <p className="mt-1 text-xs text-epolia-muted">{project.description}</p>
              <p className="mt-2 text-[11px] font-medium text-[#58126A]">{project.date}</p>
            </article>
          ))}
        </div>
      )
    }

    if (sectionId === 'etude') {
      return (
        <div className="space-y-2">
          {studentStudies.map((study) => (
            <p key={study} className="rounded-xl bg-[#A592D4]/20 px-3 py-2 text-sm text-[#58126A]">
              {study}
            </p>
          ))}
        </div>
      )
    }

    return (
      <div className="space-y-2">
        {studentMissionPreferences.map((preference) => (
          <p key={preference} className="rounded-xl bg-[#F3E8CC]/70 px-3 py-2 text-sm text-[#58126A]">
            {preference}
          </p>
        ))}
      </div>
    )
  }

  const handleShareProfile = async () => {
    const shareUrl = `${window.location.origin}/etudiant/0`
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mon profil Epolia',
          text: 'Découvrez mon profil étudiant sur Epolia.',
          url: shareUrl
        })
        return
      } catch {
        // fallback below
      }
    }
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl)
    }
  }

  return (
    <MobileShell withNav>
      <div className="space-y-6 p-5 pb-8">
        <header className="space-y-1">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-epolia-purple">Profil</h1>
            <button
              type="button"
              aria-label="Paramètres"
              className="inline-flex h-10 w-10 items-center justify-center text-epolia-purple"
            >
              <FaCog className="text-[22px]" aria-hidden="true" />
            </button>
          </div>
          <p className="text-sm text-epolia-muted">{user?.email ?? 'Compte particulier'}</p>
        </header>

        <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-epolia-purple/10">
          <div className="space-y-3">
            <div className="mx-auto flex w-full justify-center">
              <div className="inline-flex rounded-full bg-[#A592D4] p-1.5 shadow-sm ring-1 ring-[#58126A]/15">
                <img
                  src={profileAvatar}
                  alt={user?.firstName ?? 'Particulier'}
                  className="h-24 w-24 rounded-full border-2 border-white object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <p className="text-sm text-epolia-muted">
              {user?.firstName ?? 'Visiteur'} utilise Epolia pour trouver rapidement des étudiants de confiance pour des missions du quotidien.
            </p>
          </div>
        </section>

        {isStudent ? (
          <section className="space-y-4">
            <div className="grid grid-cols-3 items-end gap-3 px-1">
              <article className="flex flex-col items-center gap-2 text-center">
                <FaGraduationCap className="text-[28px] text-[#58126A]" aria-hidden="true" />
                <p className="text-sm font-bold text-[#58126A]">Senior</p>
                <p className="text-sm font-semibold text-[#58126A]">Niveau</p>
              </article>

              <article className="-translate-y-2 flex flex-col items-center gap-2 text-center">
                <FaEuroSign className="text-[30px] text-[#58126A]" aria-hidden="true" />
                <p className="text-sm font-bold text-[#58126A]">24€/h</p>
                <p className="text-sm font-semibold text-[#58126A]">Tarif</p>
              </article>

              <article className="flex flex-col items-center gap-2 text-center">
                <FaRegClock className="text-[28px] text-[#58126A]" aria-hidden="true" />
                <p className="text-sm font-bold text-[#58126A]">0-2 ans</p>
                <p className="text-sm font-semibold text-[#58126A]">Expérience</p>
              </article>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={handleShareProfile}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#58126A] px-4 py-3 text-sm font-semibold text-white"
              >
                <FaShareAlt aria-hidden="true" />
                Partager mon profil
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate('/etudiant/0', {
                    state: { user: studentPreviewProfile }
                  })
                }
                className="w-full rounded-2xl border border-[#58126A]/25 bg-white px-4 py-3 text-sm font-semibold text-[#58126A]"
              >
                Voir mon profil en tant que client
              </button>
            </div>

            <div className="h-px w-full bg-[#A592D4]/35" />
          </section>
        ) : null}

        {isStudent ? (
          <section className="space-y-3">
            {studentAccordionSections.map((section) => (
              <article key={section.id} className="rounded-2xl bg-white shadow-sm ring-1 ring-epolia-purple/10">
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left"
                >
                  <span className="text-sm font-semibold text-epolia-purple">{section.label}</span>
                  {openSection === section.id ? (
                    <FaChevronUp className="text-xs text-epolia-purple/75" aria-hidden="true" />
                  ) : (
                    <FaChevronDown className="text-xs text-epolia-purple/75" aria-hidden="true" />
                  )}
                </button>
                {openSection === section.id ? <div className="px-4 pb-4">{renderStudentSectionContent(section.id)}</div> : null}
              </article>
            ))}
          </section>
        ) : (
          <section className="space-y-3">
            <article className="rounded-2xl bg-white shadow-sm ring-1 ring-epolia-purple/10">
              <button
                type="button"
                onClick={() => toggleSection('current')}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <span className="text-sm font-semibold text-epolia-purple">Missions en cours</span>
                <span className="text-xs font-medium text-epolia-muted">{currentMissions.length}</span>
              </button>
              {openSection === 'current' ? (
                <div className="space-y-2 px-4 pb-4">
                  {currentMissions.map((mission) => (
                    <div key={mission.id} className="rounded-xl bg-[#F3E8CC]/60 px-3 py-2">
                      <p className="text-sm font-medium text-[#58126A]">{mission.title}</p>
                      <p className="text-xs text-epolia-muted">{mission.date}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </article>

            <article className="rounded-2xl bg-white shadow-sm ring-1 ring-epolia-purple/10">
              <button
                type="button"
                onClick={() => toggleSection('completed')}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <span className="text-sm font-semibold text-epolia-purple">Missions terminées</span>
                <span className="text-xs font-medium text-epolia-muted">{completedMissions.length}</span>
              </button>
              {openSection === 'completed' ? (
                <div className="space-y-2 px-4 pb-4">
                  {completedMissions.map((mission) => (
                    <div key={mission.id} className="rounded-xl bg-[#A592D4]/20 px-3 py-2">
                      <p className="text-sm font-medium text-[#58126A]">{mission.title}</p>
                      <p className="text-xs text-epolia-muted">{mission.date}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </article>
          </section>
        )}

        <div className="space-y-3">
          <button
            onClick={() => {
              logout()
              navigate('/login')
            }}
            className="w-full rounded-2xl border border-[#58126A]/20 bg-white px-4 py-3 text-sm font-semibold text-[#58126A]"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </MobileShell>
  )
}
