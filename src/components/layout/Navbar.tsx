import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import type { MouseEvent } from 'react'
import { Container } from './Container'
import { Logo } from './Logo'
import { Magnetic } from '../interactive/Magnetic'
import { ScrambleText } from '../interactive/ScrambleText'
import { useRouter } from '../../lib/Router'

const links = [
  { label: 'Product', href: '#product' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { goToSection } = useRouter()

  const handleJump = (hash: string) => (e: MouseEvent) => {
    e.preventDefault()
    goToSection(hash)
  }

  return <header className="absolute inset-x-0 top-0 z-30">
    <Container className="pt-5 md:pt-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .3 }} className="flex items-center justify-between border-y border-white/15 py-4">
        <Magnetic as="a" href="#top" onClick={handleJump('#top')} strength={0.25} cursorVariant="text" className="text-sm font-semibold tracking-[-.07em]">
          <Logo className="h-3.5 w-auto md:h-4" />
        </Magnetic>
        <nav aria-label="Primary navigation" className="hidden items-center gap-5 lg:flex">
          {links.map((link) => <Magnetic as="a" strength={0.4} cursorVariant="hover" className="group relative pb-1 text-[10px] font-medium uppercase tracking-[.13em] text-white/75 hover:text-white" href={link.href} onClick={handleJump(link.href)} key={link.label}><ScrambleText text={link.label} /><i className="absolute inset-x-0 -bottom-0 h-px origin-left scale-x-0 bg-[#a3b188] transition-transform duration-700 group-hover:scale-x-100" /></Magnetic>)}
          <Magnetic as="a" strength={0.4} cursorVariant="view" cursorLabel="Go" className="ml-3 pb-1 text-[10px] font-medium uppercase tracking-[.13em]" href="#contact" onClick={handleJump('#contact')}><ScrambleText text="Contact ↗" /></Magnetic>
        </nav>
        <button aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)} className="grid size-9 place-items-center lg:hidden">{open ? <X size={18} /> : <Menu size={18} />}</button>
      </motion.div>
    </Container>
    <AnimatePresence>{open && <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-b border-white/15 bg-[#080808] lg:hidden"><Container className="flex flex-col gap-5 py-8">{[...links, { label: 'Contact', href: '#contact' }].map(link => <a onClick={(e) => { setOpen(false); handleJump(link.href)(e) }} href={link.href} className="text-2xl tracking-[-.05em]" key={link.label}>{link.label}</a>)}</Container></motion.nav>}</AnimatePresence>
  </header>
}
