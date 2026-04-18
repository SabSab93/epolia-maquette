import { FaStar } from 'react-icons/fa'

export function StudentCard({ profile, onContact }) {
  return (
    <article className="rounded-[24px] border border-stone-200 bg-white p-4 shadow-sm">
      <div className="flex gap-3">
        <img
          src={profile.photo}
          alt={profile.firstName}
          className="h-20 w-20 rounded-2xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-stone-900">{profile.firstName}</h3>
              <p className="line-clamp-2 text-sm text-stone-600">{profile.title}</p>
            </div>
            <span className="rounded-full bg-epolia-purple/8 px-2 py-1 text-xs font-semibold text-epolia-purple">
              {profile.pricePerHour}€/h
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-stone-500">
            <span>📍 {profile.distanceKm} km</span>
            <span className="inline-flex items-center gap-1">
              <FaStar className="text-[11px] text-epolia-orange" aria-hidden="true" />
              {profile.rating}
            </span>
            <span>{profile.reviews} avis</span>
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {profile.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-epolia-orange"
          >
            {skill}
          </span>
        ))}
      </div>
      <button
        onClick={onContact}
        className="mt-4 w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-800 transition hover:border-epolia-orange hover:text-epolia-orange"
      >
        Contacter
      </button>
    </article>
  )
}
