import { motion } from 'framer-motion'
import { Container } from '../layout/Container'
import { Magnetic } from '../interactive/Magnetic'
import { useRouter } from '../../lib/Router'

const rise = { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 } }

export function Hero() {
  const { navigate } = useRouter()
  return <section id="top" className="page-grid relative flex min-h-[100svh] items-end overflow-hidden border-b border-white/15 pt-32">
    <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
      <source src="/tools/bg.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,.25)_0%,rgba(8,8,8,.55)_55%,rgba(8,8,8,.92)_100%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_88%_28%,rgba(163,177,136,.13),transparent_28%)]" />
    
    <Container className="relative pb-9 pt-32 md:pb-14 md:pt-40">
      <motion.div {...rise} transition={{ duration: .8, delay: .65 }} className="mb-10 flex items-center gap-3"><span className="eyebrow">From the east / to what&apos;s next</span><span className="h-px w-10 bg-[#a3b188]" /></motion.div>
      <motion.h1 {...rise} transition={{ duration: .8, delay: .85 }} className="display max-w-3xl text-[clamp(4.2rem,10.7vw,11.5rem)]">IDEAS,<br /><span className="text-white/88">BUILT.</span></motion.h1>
      <motion.div {...rise} transition={{ duration: .8, delay: 1.1 }} className="mt-12 grid max-w-xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <p className="max-w-sm text-base leading-7 text-white/70">We turn ambitious ideas into digital products, technology, and ventures built to last.</p>
        <Magnetic as="a" strength={0.3} cursorVariant="view" cursorLabel="Explore" className="reveal-link w-fit border-b border-white/30 pb-3 hover:border-[#a3b188]" href="/what-we-build" onClick={(e) => { e.preventDefault(); navigate('/what-we-build') }}>Explore what we build</Magnetic>
      </motion.div>
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 1.25 }} className="mt-20 origin-left border-t border-white/20 md:mt-28" />
      <motion.div {...rise} transition={{ duration: .8, delay: 1.35 }} className="mt-4 flex justify-between text-[9px] uppercase tracking-[.16em] text-white/40"><span className="mono">01 — Arrival</span><span className="mono">Scroll to enter</span></motion.div>
    </Container>
  </section>
}