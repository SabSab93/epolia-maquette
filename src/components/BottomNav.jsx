import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Accueil', icon: '⌂' },
  { to: '/favoris', label: 'Favoris', icon: '♡' },
  { to: '/register-choice', label: '+', icon: '+' },
  { to: '/messages', label: 'Messages', icon: '✉' },
  { to: '/profil', label: 'Profil', icon: '◉' }
]

export function BottomNav() {
  return (
    <nav className="grid grid-cols-5 border-t border-stone-200 bg-white px-2 py-2">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 rounded-2xl py-2 text-[11px] font-medium transition ${
              isActive ? 'bg-orange-50 text-epolia-orange' : 'text-stone-500'
            }`
          }
        >
          <span className="text-lg leading-none">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
