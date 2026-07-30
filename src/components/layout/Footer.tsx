import { Container } from './Container'
import { Magnetic } from '../interactive/Magnetic'
import { Mark } from './Mark'
import { useRouter } from '../../lib/Router'

export function Footer() {
  const { goToSection } = useRouter()

  return <footer className="py-7"><Container className="flex flex-col justify-between gap-4 text-[9px] uppercase tracking-[.13em] text-white/40 sm:flex-row sm:items-center"><span className="flex items-center gap-3 mono"><Mark className="h-4 w-auto opacity-70" color="#f5f3ee" />© 2026 Studio Seven</span><span className="mono">Built from the East</span><Magnetic as="a" href="#top" onClick={(e) => { e.preventDefault(); goToSection('#top') }} strength={0.35} cursorVariant="hover" className="mono hover:text-white">Back to top ↑</Magnetic></Container></footer>
}
