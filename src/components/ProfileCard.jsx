import { FaStar } from 'react-icons/fa'

export function ProfileCard({ user, onOpenProfile }) {
  const portfolioImages = Array.isArray(user.portfolioProjects) && user.portfolioProjects.length > 0
    ? user.portfolioProjects.map((project) => project.image)
    : user.portfolioImages ?? []
  const hasPortfolio = portfolioImages.length > 0

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpenProfile?.(user)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpenProfile?.(user)
        }
      }}
      className="cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-epolia-purple/10"
    >
      <div className="relative h-56 w-full">
        {hasPortfolio ? (
          <div className="hide-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto">
            {portfolioImages.map((image, index) => (
              <img
                key={`${user.id}-portfolio-${index}`}
                src={image}
                alt={`Réalisation ${index + 1} de ${user.name}`}
                className="h-full w-full min-w-full snap-center object-cover"
                loading="lazy"
              />
            ))}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-epolia-purple">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-24 w-24 rounded-full border-2 border-white object-cover"
              loading="lazy"
            />
          </div>
        )}

        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-[#58126A] px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            ✔ Vérifié
          </span>
        </div>

        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <span className="rounded-full bg-[#A592D4] px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
            {user.quality}
          </span>
          <span className="rounded-full bg-[#C3E841] px-2.5 py-1 text-[11px] font-semibold text-[#58126A] shadow-sm">
            {user.availability}
          </span>
        </div>

        {hasPortfolio ? (
          <>
            <div className="absolute bottom-3 left-3 rounded-full bg-[#F3E8CC] p-1 shadow-sm ring-1 ring-[#58126A]/15">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-16 w-16 rounded-full border-2 border-white object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/45 px-2 py-1">
              {portfolioImages.map((_, index) => (
                <span
                  key={`${user.id}-dot-${index}`}
                  className="h-1.5 w-1.5 rounded-full bg-white/90"
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold leading-tight text-epolia-text">{user.name}</h3>
            <p className="text-sm font-medium text-epolia-muted">{user.skill}</p>
          </div>
          <span className="mt-0.5 inline-flex items-center gap-1 text-sm font-medium text-epolia-purple">
            <FaStar className="text-[12px] text-epolia-orange" aria-hidden="true" />
            {user.rating}
          </span>
        </div>

        <p className="text-sm text-epolia-muted">
          {user.location} • {user.distance} km
        </p>

        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-[#A592D4] px-2.5 py-1 text-xs font-medium text-white"
            >
              {skill}
            </span>
          ))}
        </div>

        <p className="pt-1 text-base font-semibold text-[#58126A]">{user.price}€/h</p>
      </div>
    </article>
  )
}
