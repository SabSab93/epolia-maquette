import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MobileShell } from '../components/MobileShell'
import { useAuth } from '../contexts/AuthContext'
import { getProfileAvatar } from '../utils/profileAvatar'

const CGU_STORAGE_KEY = 'epolia-student-cgu-accepted'
const PROFILE_ONLINE_STORAGE_KEY = 'epolia-student-profile-online'
const STUDENT_ONBOARDING_POPUP_DONE_KEY = 'epolia-student-onboarding-popup-done'

export function StudentDashboardPage() {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [showCguModal, setShowCguModal] = useState(false)
  const [isCguSheetVisible, setIsCguSheetVisible] = useState(false)
  const [showCongratsModal, setShowCongratsModal] = useState(false)
  const [shouldPromptPublishing, setShouldPromptPublishing] = useState(false)
  const [missionTab, setMissionTab] = useState('en-cours')
  const [isProfileOnline, setIsProfileOnline] = useState(
    typeof window !== 'undefined' && window.sessionStorage.getItem(PROFILE_ONLINE_STORAGE_KEY) === 'true'
  )

  const profileAvatar = getProfileAvatar(user)

  const currentMissions = [
    {
      id: 'cur-1',
      clientName: 'Sabrina Dupont',
      clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      description: 'Création d’une app mobile simple pour gérer ses rendez-vous personnels.',
      stage: 'Discussion en cours',
      amount: 68
    },
    {
      id: 'cur-2',
      clientName: 'Nadia K.',
      clientAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80',
      description: 'Refonte d’une landing page vitrine pour son activité indépendante.',
      stage: 'Mission en cours',
      amount: 94
    }
  ]

  const completedMissions = [
    {
      id: 'done-1',
      clientName: 'Thomas Bernard',
      clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      description: 'Automatisation d’un tableau de suivi client + nettoyage des données.',
      completedAt: '10/04/2026',
      amount: 132
    },
    {
      id: 'done-2',
      clientName: 'Claire Martin',
      clientAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      description: 'Création de 3 visuels social media et adaptation de sa charte.',
      completedAt: '03/04/2026',
      amount: 98
    }
  ]

  const totalRevenue = completedMissions.reduce((sum, mission) => sum + mission.amount, 0)
  const walletRevenue = 110
  const ongoingRevenue = currentMissions.reduce((sum, mission) => sum + mission.amount, 0)

  useEffect(() => {
    const hasAlreadyCompletedFlow = window.sessionStorage.getItem(STUDENT_ONBOARDING_POPUP_DONE_KEY) === 'true'
    if (location.state?.showCguModal && !hasAlreadyCompletedFlow) {
      setShowCguModal(true)
      setShouldPromptPublishing(true)
    }
    if (location.state?.showCguModal) {
      navigate(location.pathname, { replace: true })
    }
  }, [location.pathname, location.state, navigate])

  useEffect(() => {
    if (!showCguModal) {
      setIsCguSheetVisible(false)
      return
    }

    const animationFrame = window.requestAnimationFrame(() => {
      setIsCguSheetVisible(true)
    })

    return () => window.cancelAnimationFrame(animationFrame)
  }, [showCguModal])

  const acceptCgu = () => {
    window.sessionStorage.setItem(CGU_STORAGE_KEY, 'true')
    setShowCguModal(false)
    if (shouldPromptPublishing) {
      setShowCongratsModal(true)
      setShouldPromptPublishing(false)
    }
  }

  const publishProfileNow = () => {
    window.sessionStorage.setItem(PROFILE_ONLINE_STORAGE_KEY, 'true')
    window.sessionStorage.setItem(STUDENT_ONBOARDING_POPUP_DONE_KEY, 'true')
    setIsProfileOnline(true)
    setShowCongratsModal(false)
  }

  const publishProfileLater = () => {
    window.sessionStorage.setItem(PROFILE_ONLINE_STORAGE_KEY, 'false')
    window.sessionStorage.setItem(STUDENT_ONBOARDING_POPUP_DONE_KEY, 'true')
    setIsProfileOnline(false)
    setShowCongratsModal(false)
  }

  const publishFromDashboard = () => {
    window.sessionStorage.setItem(PROFILE_ONLINE_STORAGE_KEY, 'true')
    setIsProfileOnline(true)
  }

  return (
    <MobileShell withNav>
      <div className="space-y-5 p-5 pb-32">
        <header className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-[#58126A]">Dashboard</h1>
            <img
              src={profileAvatar}
              alt="Photo de profil"
              className="h-11 w-11 rounded-full border-2 border-[#A592D4]/55 bg-[#C3E841] object-cover"
            />
          </div>
          <div className="h-px w-full bg-[#A592D4]/35" />
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setMissionTab('en-cours')}
              className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                missionTab === 'en-cours'
                  ? 'bg-epolia-orange text-white'
                  : 'bg-white text-[#58126A] ring-1 ring-[#A592D4]/35'
              }`}
            >
              Mission en cours
            </button>
            <button
              type="button"
              onClick={() => setMissionTab('terminees')}
              className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                missionTab === 'terminees'
                  ? 'bg-epolia-orange text-white'
                  : 'bg-white text-[#58126A] ring-1 ring-[#A592D4]/35'
              }`}
            >
              Mission terminées
            </button>
          </div>
        </header>

        {!isProfileOnline ? (
          <section className="rounded-2xl bg-[#A592D4]/25 p-4 shadow-sm ring-1 ring-[#A592D4]/45">
            <h2 className="text-sm font-semibold text-[#58126A]">Votre profil n&apos;est pas encore en ligne</h2>
            <p className="mt-1 text-xs text-epolia-muted">
              Activez votre profil pour apparaître dans le fil et recevoir des demandes.
            </p>
            <button
              type="button"
              onClick={publishFromDashboard}
              className="mt-3 rounded-xl bg-[#58126A] px-3 py-2 text-xs font-semibold text-white"
            >
              Mettre mon profil en ligne
            </button>
          </section>
        ) : null}

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#58126A]">Mission</h2>
            <button type="button" className="text-sm font-semibold text-epolia-orange">
              Voir tout
            </button>
          </div>

          <div className="space-y-2.5">
            {missionTab === 'en-cours'
              ? currentMissions.map((mission) => (
                  <article
                    key={mission.id}
                    className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-[#A592D4]/25"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={mission.clientAvatar}
                        alt={mission.clientName}
                        className="h-11 w-11 rounded-full bg-[#F3E8CC] object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#58126A]">{mission.clientName}</p>
                        <p className="mt-1 text-xs text-epolia-muted">{mission.description}</p>
                        <p className="mt-2 inline-flex rounded-full bg-[#A592D4] px-2.5 py-1 text-[11px] font-semibold text-white">
                          {mission.stage}
                        </p>
                      </div>
                    </div>
                  </article>
                ))
              : completedMissions.map((mission) => (
                  <article
                    key={mission.id}
                    className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-[#A592D4]/25"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={mission.clientAvatar}
                        alt={mission.clientName}
                        className="h-11 w-11 rounded-full bg-[#F3E8CC] object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#58126A]">{mission.clientName}</p>
                        <p className="mt-1 text-xs text-epolia-muted">{mission.description}</p>
                        <p className="mt-2 inline-flex rounded-full bg-[#C3E841] px-2.5 py-1 text-[11px] font-semibold text-[#58126A]">
                          Mission terminée • {mission.completedAt}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#58126A]">Mon chiffre d&apos;affaire</h2>
          <div className="grid grid-cols-2 gap-3">
            <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#A592D4]/25">
              <p className="text-xs text-epolia-muted">Chiffre d&apos;affaires</p>
              <p className="mt-1 text-2xl font-bold text-[#58126A]">{totalRevenue} €</p>
              <p className="mt-2 inline-flex rounded-full bg-[#A592D4]/35 px-2.5 py-1 text-[11px] font-semibold text-[#58126A]">
                {walletRevenue} € à récupérer
              </p>
            </article>
            <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#A592D4]/25">
              <p className="text-xs text-epolia-muted">Missions en cours</p>
              <p className="mt-1 text-2xl font-bold text-[#58126A]">{ongoingRevenue} €</p>
              <p className="mt-2 inline-flex rounded-full bg-[#FF661A]/15 px-2.5 py-1 text-[11px] font-semibold text-[#58126A]">
                {currentMissions.length} mission(s) active(s)
              </p>
            </article>
          </div>
        </section>
      </div>

      {showCguModal ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#1A1A1A]/55">
          <section
            className={`mb-[calc(5.5rem+env(safe-area-inset-bottom))] w-[calc(100%-2rem)] max-w-[398px] rounded-3xl bg-white p-5 shadow-lg transition-all duration-300 ${
              isCguSheetVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <p className="text-xs uppercase tracking-[0.12em] text-epolia-muted">CGU</p>
            <h2 className="mt-2 text-xl font-bold text-epolia-purple">Responsabilités et conditions</h2>
            <p className="mt-3 text-sm leading-relaxed text-epolia-text">
              En continuant, vous confirmez que vos informations sont exactes, que vous réalisez les missions dans
              le respect des règles Epolia, et que vous acceptez les conditions générales d’utilisation.
            </p>
            <button
              type="button"
              onClick={acceptCgu}
              className="mt-5 w-full rounded-2xl bg-epolia-orange px-4 py-3 text-sm font-semibold text-white transition hover:brightness-95"
            >
              J&apos;accepte les CGU
            </button>
          </section>
        </div>
      ) : null}

      {showCongratsModal ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1A1A1A]/55 p-4">
          <section className="w-full max-w-[430px] rounded-3xl bg-white p-5 shadow-lg">
            <p className="text-xs uppercase tracking-[0.12em] text-epolia-muted">Inscription terminée</p>
            <h2 className="mt-2 text-xl font-bold text-epolia-purple">Félicitations</h2>
            <p className="mt-3 text-sm leading-relaxed text-epolia-text">
              Votre inscription est validée. Souhaitez-vous mettre votre profil en ligne maintenant ?
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={publishProfileLater}
                className="rounded-2xl border border-[#A592D4]/40 px-4 py-3 text-sm font-semibold text-[#58126A]"
              >
                Plus tard
              </button>
              <button
                type="button"
                onClick={publishProfileNow}
                className="rounded-2xl bg-epolia-orange px-4 py-3 text-sm font-semibold text-white"
              >
                Mettre en ligne
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </MobileShell>
  )
}
