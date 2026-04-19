import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MobileShell } from '../components/MobileShell'
import { ProfileCard } from '../components/ProfileCard'
import { MapView } from '../components/MapView'
import { Logo } from '../components/Logo'
import { useAuth } from '../contexts/AuthContext'
import { marketplaceFilters, marketplaceProfiles } from '../data/mockData'

const PARTICULIER_CGU_STORAGE_KEY = 'epolia-particulier-cgu-accepted'

export function Home() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const [viewMode, setViewMode] = useState('list')
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('Tout')
  const [selectedMapUserId, setSelectedMapUserId] = useState(null)
  const [showCguModal, setShowCguModal] = useState(false)
  const [isCguSheetVisible, setIsCguSheetVisible] = useState(false)

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return marketplaceProfiles.filter((profile) => {
      const matchFilter = activeFilter === 'Tout' || profile.category === activeFilter
      const haystack = `${profile.name} ${profile.skill} ${profile.location} ${profile.skills.join(' ')}`.toLowerCase()
      const matchQuery = !normalizedQuery || haystack.includes(normalizedQuery)
      return matchFilter && matchQuery
    })
  }, [query, activeFilter])

  useEffect(() => {
    if (filteredUsers.length === 0) {
      setSelectedMapUserId(null)
      return
    }

    const selectedStillVisible = filteredUsers.some((user) => user.id === selectedMapUserId)
    if (!selectedStillVisible) {
      setSelectedMapUserId(null)
    }
  }, [filteredUsers, selectedMapUserId])

  useEffect(() => {
    if (user?.type === 'particulier' && location.state?.showCguModal) {
      setShowCguModal(true)
    }
  }, [location.state, user?.type])

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
    window.sessionStorage.setItem(PARTICULIER_CGU_STORAGE_KEY, 'true')
    setShowCguModal(false)
  }

  const selectedMapUser = useMemo(
    () => filteredUsers.find((user) => user.id === selectedMapUserId) ?? null,
    [filteredUsers, selectedMapUserId]
  )

  return (
    <MobileShell withNav>
      <div className="space-y-5 px-4 pb-4 pt-3 text-epolia-text">
        <header className="sticky top-0 z-20 space-y-3 pt-2">
          <div className="flex items-start justify-between">
            <Logo small />
            {!user ? (
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="rounded-full border border-epolia-purple/20 bg-white px-3 py-1.5 text-xs font-semibold text-epolia-purple"
              >
                Se connecter
              </button>
            ) : null}
          </div>
          {user?.type === 'particulier' ? (
            <h2 className="inline-flex w-fit rounded-full bg-[#58126A] px-4 py-2 text-xl font-bold text-white">
              Bonjour {user.firstName}
            </h2>
          ) : null}

          <label htmlFor="search" className="sr-only">
            Recherche
          </label>
          <input
            id="search"
            type="search"
            placeholder="Rechercher une mission ou compétence"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-lg border border-[#A592D4]/25 bg-white/80 px-3 py-2 text-sm text-epolia-text shadow-sm outline-none transition placeholder:text-epolia-muted focus:border-epolia-orange focus:bg-white"
          />

          <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
            {marketplaceFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  activeFilter === filter
                    ? 'border-[#FF661A] bg-[#FF661A] text-white'
                    : 'border-[#F3E8CC] bg-[#F3E8CC] text-[#58126A]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mx-auto flex w-fit items-center gap-1 rounded-full border border-[#A592D4]/25 bg-white/70 p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                viewMode === 'list' ? 'bg-epolia-orange text-white' : 'text-epolia-purple/60'
              }`}
            >
              Liste
            </button>
            <button
              type="button"
              onClick={() => setViewMode('map')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                viewMode === 'map' ? 'bg-epolia-orange text-white' : 'text-epolia-purple/60'
              }`}
            >
              Carte
            </button>
          </div>
        </header>

        <section className="transition-opacity duration-300">
          {viewMode === 'list' ? (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <ProfileCard
                  key={user.id}
                  user={user}
                  onOpenProfile={(selectedUser) => navigate(`/etudiant/${selectedUser.id}`, { state: { user: selectedUser } })}
                />
              ))}
              {filteredUsers.length === 0 ? (
                <p className="rounded-xl bg-white p-4 text-center text-sm text-epolia-muted shadow-sm ring-1 ring-epolia-purple/10">
                  Aucun profil ne correspond à votre recherche.
                </p>
              ) : null}
            </div>
          ) : (
            <div className="space-y-3">
              <MapView
                users={filteredUsers}
                onSelectUser={setSelectedMapUserId}
                selectedUser={selectedMapUser}
                onOpenProfile={(selectedUser) =>
                  navigate(`/etudiant/${selectedUser.id}`, { state: { user: selectedUser } })
                }
              />
            </div>
          )}
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
              En continuant, vous confirmez l&apos;exactitude des informations fournies et acceptez les conditions
              générales d&apos;utilisation d&apos;Epolia.
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
    </MobileShell>
  )
}
