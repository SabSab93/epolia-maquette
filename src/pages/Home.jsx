import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MobileShell } from '../components/MobileShell'
import { ProfileCard } from '../components/ProfileCard'
import { MapView } from '../components/MapView'
import { Logo } from '../components/Logo'
import { useAuth } from '../contexts/AuthContext'
import { marketplaceFilters, marketplaceProfiles } from '../data/mockData'

export function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [viewMode, setViewMode] = useState('list')
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('Tout')
  const [selectedMapUserId, setSelectedMapUserId] = useState(null)

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
    </MobileShell>
  )
}
