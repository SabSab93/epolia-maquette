import { useEffect, useMemo, useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import { MobileShell } from '../components/MobileShell'
import { useAuth } from '../contexts/AuthContext'
import { messages } from '../data/mockData'
import { readStoredNavMode } from '../utils/navMode'

const M3_COMPLETED_STORAGE_KEY = 'epolia-m3-mission-completed'

export function MessagesPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [activeConversationId, setActiveConversationId] = useState(null)
  const [draft, setDraft] = useState('')
  const [showMissionEndModal, setShowMissionEndModal] = useState(false)
  const isStudent = user?.type === 'etudiant' || (!user && readStoredNavMode() === 'etudiant')
  const isM3MissionCompleted =
    typeof window !== 'undefined' && window.sessionStorage.getItem(M3_COMPLETED_STORAGE_KEY) === 'true'

  const baseConversations = useMemo(
    () =>
      isStudent
        ? [
            {
              id: 's-1',
              from: 'Sabrina D.',
              preview: 'Super, quelle heure te convient pour démarrer ?',
              time: '11:48',
              unread: true,
              avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
              hourlyRate: 26,
              requiresPayment: false,
              thread: [
                {
                  id: 's-1-1',
                  from: 'them',
                  text: 'Bonjour, je veux avancer sur mon app cette semaine.',
                  time: '11:31'
                },
                {
                  id: 's-1-2',
                  from: 'me',
                  text: 'Bonjour Sabrina, je peux commencer demain à 14h.',
                  time: '11:36'
                },
                {
                  id: 's-1-3',
                  from: 'me',
                  text: 'Je pense que ça va durer environ 3h pour livrer une première version propre.',
                  time: '11:38'
                },
                { id: 's-1-4', from: 'them', text: 'Super, quelle heure te convient pour démarrer ?', time: '11:48' }
              ]
            },
            {
              id: 's-2',
              from: 'Nadia L.',
              preview: 'OK pour vendredi, on valide ce créneau.',
              time: 'Hier',
              unread: false,
              avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80',
              hourlyRate: 22,
              requiresPayment: false,
              thread: [
                {
                  id: 's-2-1',
                  from: 'me',
                  text: 'Je peux prendre la mission vendredi de 17h à 19h.',
                  time: '18:04'
                },
                {
                  id: 's-2-2',
                  from: 'them',
                  text: 'Parfait, ça me va pour ce créneau.',
                  time: '18:09'
                },
                {
                  id: 's-2-3',
                  from: 'me',
                  text: 'Top, je te partage un récap et le plan de réalisation.',
                  time: '18:12'
                },
                { id: 's-2-4', from: 'them', text: 'OK pour vendredi, on valide ce créneau.', time: '18:16' }
              ]
            }
          ]
        : [
            ...messages.map((item, index) => ({
              ...item,
              avatar: `https://picsum.photos/seed/message-${index + 1}/120/120`,
              hourlyRate: index === 0 ? 26 : 21,
              requiresPayment: true,
              thread: [
                { id: `${item.id}-1`, from: 'them', text: item.preview, time: item.time },
                { id: `${item.id}-2`, from: 'me', text: 'Merci, je vous confirme rapidement.', time: '12:03' }
              ]
            })),
            {
              id: 'm-3',
              from: 'Inès B.',
              preview: isM3MissionCompleted
                ? 'Mission validée, les fonds ont été transférés à l’étudiant.'
                : 'Le règlement est sécurisé jusqu’à la validation de la mission.',
              time: isM3MissionCompleted ? 'À l’instant' : 'Hier',
              unread: false,
              avatar: 'https://picsum.photos/seed/message-hair/120/120',
              hourlyRate: 25,
              requiresPayment: false,
              missionCanBeCompleted: true,
              missionCompleted: isM3MissionCompleted,
              thread: [
                { id: 'm-3-1', from: 'me', text: 'Bonjour Inès, je valide la coupe de ce matin.', time: '10:12' },
                { id: 'm-3-2', from: 'them', text: 'Parfait, je viens avec mon matériel.', time: '10:14' },
                {
                  id: 'm-3-2b',
                  from: 'system',
                  text: 'Le règlement de 75€ est sécurisé et sera libéré à la fin de la mission.',
                  time: '10:30'
                },
                { id: 'm-3-3', from: 'them', text: 'La coupe est terminée, merci pour votre confiance.', time: '11:03' },
                { id: 'm-3-4', from: 'me', text: 'Merci beaucoup, résultat super propre.', time: '11:08' },
                ...(isM3MissionCompleted
                  ? [
                      {
                        id: 'm-3-system-unlocked',
                        from: 'system',
                        text: 'Mission confirmée. Les fonds sécurisés sont débloqués et transférés à l’étudiant.',
                        time: '11:20'
                      }
                    ]
                  : [])
              ]
            }
          ],
    [isStudent, isM3MissionCompleted]
  )

  const [conversations, setConversations] = useState(baseConversations)

  useEffect(() => {
    setConversations(baseConversations)
  }, [baseConversations])

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeConversationId) ?? null,
    [activeConversationId, conversations]
  )

  const confirmMissionEnd = () => {
    setShowMissionEndModal(false)
    navigate('/messages/avis', {
      state: {
        conversationId: 'm-3',
        studentName: activeConversation?.from ?? 'Inès B.',
        studentAvatar: activeConversation?.avatar
      }
    })
  }

  useEffect(() => {
    if (location.state?.openConversationId) {
      setActiveConversationId(location.state.openConversationId)
    }
  }, [location.state])

  return (
    <MobileShell withNav>
      {activeConversation ? (
        <div className="flex min-h-[calc(100vh-6rem)] flex-col p-4 pb-3">
          <header className="mb-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveConversationId(null)}
              className="inline-flex items-center justify-center text-epolia-purple"
            >
              <FaChevronLeft className="text-sm" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-2">
              <img
                src={activeConversation.avatar}
                alt={activeConversation.from}
                className="h-10 w-10 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <p className="text-sm font-semibold text-epolia-purple">{activeConversation.from}</p>
                <p className="text-xs text-epolia-muted">En ligne • {activeConversation.hourlyRate}€/h</p>
              </div>
            </div>
          </header>

          <div className="flex-1 space-y-2 overflow-y-auto pb-4">
            {activeConversation.thread.map((message) => (
              <div
                key={message.id}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                  message.from === 'system'
                    ? 'mx-auto w-full max-w-full bg-[#F3E8CC] text-[#58126A] ring-1 ring-[#A592D4]/35'
                    : message.from === 'me'
                    ? 'ml-auto bg-[#A592D4] text-white'
                    : 'bg-white text-epolia-text ring-1 ring-epolia-purple/10'
                }`}
              >
                <p>{message.text}</p>
                <p className={`mt-1 text-[11px] ${message.from === 'me' ? 'text-white/80' : 'text-epolia-muted'}`}>
                  {message.time}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-auto space-y-3">
            <div className="rounded-2xl bg-white p-2 shadow-sm ring-1 ring-epolia-purple/10">
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Écrire un message..."
                className="w-full rounded-xl border border-transparent bg-[#F3E8CC]/40 px-3 py-2 text-sm text-epolia-text outline-none focus:border-epolia-orange focus:bg-white"
              />
            </div>
            {activeConversation.missionCanBeCompleted && !activeConversation.missionCompleted ? (
              <button
                type="button"
                onClick={() => setShowMissionEndModal(true)}
                className="w-full rounded-2xl bg-epolia-orange px-4 py-3 text-sm font-semibold text-white shadow-sm"
              >
                Confirmer la fin de mission
              </button>
            ) : null}
            {activeConversation.requiresPayment ? (
              <button
                type="button"
                onClick={() =>
                  navigate('/messages/paiement', {
                    state: {
                      conversationId: activeConversation.id,
                      studentName: activeConversation.from,
                      studentAvatar: activeConversation.avatar,
                      hourlyRate: activeConversation.hourlyRate
                    }
                  })
                }
                className="w-full rounded-2xl bg-epolia-orange px-4 py-3 text-sm font-semibold text-white shadow-sm"
              >
                Accepter et payer
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="space-y-4 p-5 pb-8">
          <header>
            <h1 className="text-2xl font-bold text-epolia-purple">Vos conversations</h1>
          </header>

          <div className="space-y-3">
            {conversations.map((message) => (
              <button
                key={message.id}
                type="button"
                onClick={() => {
                  setDraft('')
                  setActiveConversationId(message.id)
                }}
                className="w-full rounded-3xl bg-white p-4 text-left shadow-sm ring-1 ring-epolia-purple/10"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={message.avatar} alt={message.from} className="h-12 w-12 rounded-full object-cover" loading="lazy" />
                    <div>
                      <h2 className="font-semibold text-epolia-purple">{message.from}</h2>
                      <p className="mt-1 line-clamp-1 text-sm text-epolia-muted">{message.preview}</p>
                    </div>
                  </div>
                  <div className="text-right text-xs text-epolia-muted">
                    <p>{message.time}</p>
                    {message.unread ? <span className="mt-2 inline-block rounded-full bg-epolia-orange px-2 py-1 text-white">Nouveau</span> : null}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {showMissionEndModal ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1A1A1A]/55 p-4">
          <section className="w-full max-w-[430px] rounded-3xl bg-white p-5 shadow-lg">
            <p className="text-xs uppercase tracking-[0.12em] text-epolia-muted">Confirmation</p>
            <h2 className="mt-2 text-xl font-bold text-epolia-purple">Confirmer la fin de mission ?</h2>
            <p className="mt-3 text-sm leading-relaxed text-epolia-text">
              En confirmant, le paiement sécurisé sera débloqué et transféré à l’étudiant.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setShowMissionEndModal(false)}
                className="rounded-2xl border border-[#A592D4]/40 px-4 py-3 text-sm font-semibold text-[#58126A]"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={confirmMissionEnd}
                className="rounded-2xl bg-epolia-orange px-4 py-3 text-sm font-semibold text-white"
              >
                Confirmer
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </MobileShell>
  )
}
