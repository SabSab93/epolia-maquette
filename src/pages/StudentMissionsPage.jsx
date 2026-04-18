import { useState } from 'react'
import { MobileShell } from '../components/MobileShell'

const ongoingMissions = [
  {
    id: 'ongoing-1',
    clientName: 'Sabrina Dupont',
    description: 'Application mobile de réservation à domicile',
    stage: 'Discussion en cours',
    amount: 78,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'ongoing-2',
    clientName: 'Nadia K.',
    description: 'Refonte d’une page vitrine pour artisan local',
    stage: 'Mission en cours',
    amount: 120,
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80'
  }
]

const doneMissions = [
  {
    id: 'done-1',
    clientName: 'Thomas Bernard',
    description: 'Mise en place d’un tableau de pilotage client',
    stage: 'Mission terminée',
    amount: 145,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
  }
]

export function StudentMissionsPage() {
  const [tab, setTab] = useState('en-cours')
  const missions = tab === 'en-cours' ? ongoingMissions : doneMissions

  return (
    <MobileShell withNav>
      <div className="space-y-4 p-5 pb-32">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold text-[#58126A]">Missions</h1>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setTab('en-cours')}
              className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                tab === 'en-cours'
                  ? 'bg-epolia-orange text-white'
                  : 'bg-white text-[#58126A] ring-1 ring-[#A592D4]/35'
              }`}
            >
              Mission en cours
            </button>
            <button
              type="button"
              onClick={() => setTab('terminees')}
              className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                tab === 'terminees'
                  ? 'bg-epolia-orange text-white'
                  : 'bg-white text-[#58126A] ring-1 ring-[#A592D4]/35'
              }`}
            >
              Mission terminées
            </button>
          </div>
        </header>

        <section className="space-y-2.5">
          {missions.map((mission) => (
            <article key={mission.id} className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-[#A592D4]/25">
              <div className="flex items-start gap-3">
                <img src={mission.avatar} alt={mission.clientName} className="h-11 w-11 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#58126A]">{mission.clientName}</p>
                  <p className="mt-1 text-xs text-epolia-muted">{mission.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <p className="inline-flex rounded-full bg-[#A592D4] px-2.5 py-1 text-[11px] font-semibold text-white">
                      {mission.stage}
                    </p>
                    <p
                      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        tab === 'en-cours' ? 'bg-[#FF661A]/15 text-[#58126A]' : 'bg-[#C3E841] text-[#58126A]'
                      }`}
                    >
                      {tab === 'en-cours'
                        ? `${mission.amount} € à recevoir`
                        : `${mission.amount} € reçu`}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </MobileShell>
  )
}
