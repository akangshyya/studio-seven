import { Container } from './Container'
import { Magnetic } from '../interactive/Magnetic'
export function Footer() { return <footer className="py-7"><Container className="flex flex-col justify-between gap-4 text-[9px] uppercase tracking-[.13em] text-white/40 sm:flex-row"><span className="mono">© 2026 Studio Seven</span><span className="mono">Built from the East</span><Magnetic as="a" href="#top" strength={0.35} cursorVariant="hover" className="mono hover:text-white">Back to top ↑</Magnetic></Container></footer> }
