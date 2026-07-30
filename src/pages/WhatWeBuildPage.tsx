import { motion } from 'framer-motion'
import type { MouseEvent } from 'react'
import { Container } from '../components/layout/Container'
import { Magnetic } from '../components/interactive/Magnetic'
import { ScrambleText } from '../components/interactive/ScrambleText'
import { useRouter } from '../lib/Router'

const rise = { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 } }

const capabilities = [
  {
    number: '01',
    title: 'AI systems',
    text: 'Applied intelligence woven into products and operations — models, agents, and infrastructure built to think, not just automate.',
  },
  {
    number: '02',
    title: 'Branding',
    text: 'Identity systems, naming, and visual language that give an idea a voice people remember and trust.',
  },
  {
    number: '03',
    title: 'Content production',
    text: 'Film, photography, and campaigns produced with intent — content built to move culture, not just fill a feed.',
  },
  {
    number: '04',
    title: 'Digital products',
    text: 'Web and mobile products designed and engineered end to end, from first sketch to shipped release.',
  },
]

export function WhatWeBuildPage() {
  const { goToSection } = useRouter()

  const goHome = (hash?: string) => (e: MouseEvent) => {
    e.preventDefault()
    goToSection(hash ?? '#top')
  }

  return (
    <section id="top" className="page-grid relative min-h-[100svh] border-b border-white/15 pb-28 pt-40 md:pb-44 md:pt-52">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_88%_10%,rgba(163,177,136,.1),transparent_32%)]" />
      <Container className="relative">
        <motion.a
          {...rise}
          transition={{ duration: 0.6 }}
          href="/"
          onClick={goHome()}
          className="reveal-link mb-14 inline-flex text-white/50 hover:text-white md:mb-20"
        >
          ← Back home
        </motion.a>

        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <motion.div {...rise} transition={{ duration: 0.7, delay: 0.05 }}>
            <p className="eyebrow">Studio Seven / Capabilities</p>
            <h1 className="display mt-6 max-w-3xl text-[clamp(3.4rem,8.4vw,8rem)]">
              What we<br /><span className="text-white/50">build.</span>
            </h1>
          </motion.div>
          <motion.p {...rise} transition={{ duration: 0.7, delay: 0.15 }} className="max-w-sm text-sm leading-7 text-white/62">
            Four disciplines, one studio. We move between them freely, so an idea gets exactly what it needs — nothing more, nothing missing.
          </motion.p>
        </div>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.3 }} className="mt-16 origin-left border-t border-white/20 md:mt-24" />

        <div className="mt-2">
          {capabilities.map((item, index) => (
            <motion.div key={item.title} {...rise} transition={{ duration: 0.6, delay: 0.35 + index * 0.08 }}>
              <Magnetic
                as="a"
                href="/#contact"
                onClick={goHome('#contact')}
                strength={0.04}
                cursorVariant="view"
                cursorLabel="Enquire"
                className="group flex flex-col gap-4 border-t border-white/15 py-7 md:flex-row md:items-center md:justify-between md:py-9"
              >
                <div className="flex items-center gap-6">
                  <span className="mono text-[10px] text-[#a3b188]">{item.number}</span>
                  <ScrambleText
                    text={item.title}
                    as="h2"
                    className="display text-[clamp(2rem,5.4vw,4.75rem)] transition-[font-weight] duration-500 group-hover:font-bold"
                  />
                </div>
                <p className="max-w-sm text-sm leading-6 text-white/55 md:text-right">{item.text}</p>
              </Magnetic>
            </motion.div>
          ))}
          <div className="border-t border-white/15" />
        </div>

        <motion.div {...rise} transition={{ duration: 0.6, delay: 0.75 }} className="mt-20 flex flex-col items-start gap-6 md:mt-28 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-sm leading-7 text-white/60">Have an idea that touches more than one of these? That&apos;s usually where our best work starts.</p>
          <Magnetic
            as="a"
            href="/#contact"
            onClick={goHome('#contact')}
            strength={0.3}
            cursorVariant="view"
            cursorLabel="Send"
            className="reveal-link w-fit border-b border-[#a3b188] pb-3 hover:border-white"
          >
            Start a conversation
          </Magnetic>
        </motion.div>
      </Container>
    </section>
  )
}
