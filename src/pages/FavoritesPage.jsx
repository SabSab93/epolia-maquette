import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { MobileShell } from '../components/MobileShell'
import { ProfileCard } from '../components/ProfileCard'
import { useAuth } from '../contexts/AuthContext'
import { marketplaceProfiles } from '../data/mockData'

export function FavoritesPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const favoriteProfiles = useMemo(() => marketplaceProfiles.filter((profile) => profile.isFavorite), [])

  return (
    <MobileShell withNav>
      <div className="space-y-5 px-4 pb-4 pt-3 text-epolia-text">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-epolia-purple">Favoris</h1>
          <p className="text-sm text-epolia-muted">
            {user?.firstName ? `${user.firstName}, voici vos profils enregistrés.` : 'Retrouvez vos profils préférés.'}
          </p>
        </header>

        <section className="space-y-4">
          {favoriteProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              user={profile}
              onOpenProfile={(selectedUser) => navigate(`/etudiant/${selectedUser.id}`, { state: { user: selectedUser } })}
            />
          ))}
        </section>
      </div>
    </MobileShell>
  )
}
