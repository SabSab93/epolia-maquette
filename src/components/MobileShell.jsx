import { Navbar } from './Navbar'
import { useAuth } from '../contexts/AuthContext'

export function MobileShell({ children, withNav = false }) {
  const { user } = useAuth()
  const showNav = withNav && Boolean(user)

  return (
    <div className="min-h-screen bg-epolia-background">
      <div className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-epolia-background">
        <div className="pointer-events-none absolute -left-20 top-20 h-44 w-44 rounded-full bg-[#58126A]/10 blur-2xl" />
        <div className="pointer-events-none absolute -right-20 top-0 h-48 w-48 rounded-full bg-[#A592D4]/18 blur-2xl" />
        <div className="pointer-events-none absolute bottom-20 right-[-40px] h-40 w-40 rounded-full bg-[#FF661A]/10 blur-2xl" />

        <main className={showNav ? 'relative z-10 pb-24' : 'relative z-10'}>{children}</main>
        {showNav ? <Navbar /> : null}
      </div>
    </div>
  )
}
