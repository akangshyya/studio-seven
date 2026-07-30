import { motion } from 'framer-motion'
import { Container } from '../layout/Container'

export function About() {
  return <section id="about" className="relative min-h-[70svh] overflow-hidden border-b border-white/15 py-28 md:py-40">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_20%,rgba(163,177,136,.07),transparent_45%)]" />
    <Container className="relative">
      <div className="grid gap-14 md:grid-cols-12 md:items-center">
        <div className="md:col-span-4">
          <p className="eyebrow">Origin</p>

          <motion.div
            initial={{ opacity: 0, scale: 1.06 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-8 aspect-[3/4] w-full max-w-sm overflow-hidden border border-white/15"
          >
            <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
              <source src="/tools/hills.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,.05)_0%,rgba(8,8,8,.15)_55%,rgba(8,8,8,.85)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(163,177,136,.16),transparent_55%)] mix-blend-overlay" />
            <div
              aria-hidden
              className="absolute inset-0 opacity-[.08]"
              style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(246,246,244,.4) 0px, rgba(246,246,244,.4) 1px, transparent 1px, transparent 34px)' }}
            />
            <span className="absolute left-4 top-4 h-1.5 w-1.5 rounded-full bg-[#a3b188] shadow-[0_0_10px_2px_rgba(163,177,136,.7)]" />
            <p className="absolute bottom-4 left-4 right-4 mono text-[9px] uppercase leading-relaxed tracking-[.14em] text-white/75">
              Seven states.<br />One horizon.
            </p>
          </motion.div>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <h2 className="display max-w-3xl text-[clamp(2.6rem,6.4vw,5.5rem)]">
            Built from the Northeast.<br />
            <span className="text-[#A3B188]">Designed for what&apos;s next.</span>
          </h2>
          <p className="mt-10 max-w-md text-sm leading-7 text-white/62">
            Studio Seven is a digital ventures company building products, technology, and businesses at the intersection of innovation and creativity.
          </p>
        </div>
      </div>
    </Container>
  </section>
}
