import { motion } from 'framer-motion'
import type { MouseEvent } from 'react'
import { Container } from '../components/layout/Container'
import { Magnetic } from '../components/interactive/Magnetic'
import { useRouter } from '../lib/Router'
import { capabilities } from '../data/capabilities'

const rise = { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 } }

export function CapabilityDetailPage({ slug }: { slug: string }) {
  const { navigate, goToSection } = useRouter()
  const capability = capabilities.find((c) => c.slug === slug) ?? capabilities[0]

  const goBack = (e: MouseEvent) => {
    e.preventDefault()
    navigate('/what-we-build')
  }

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
          href="/what-we-build"
          onClick={goBack}
          className="reveal-link mb-14 inline-flex text-white/50 hover:text-white md:mb-20"
        >
          ← Back to capabilities
        </motion.a>

        <motion.div {...rise} transition={{ duration: 0.7, delay: 0.05 }}>
          <p className="eyebrow">Studio Seven / {capability.number}</p>
          <h1 className="display mt-6 max-w-3xl text-[clamp(3.2rem,7.6vw,7rem)]">{capability.title}</h1>
          <p className="mt-8 max-w-lg text-sm leading-7 text-white/62">{capability.text}</p>
        </motion.div>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.3 }} className="mt-16 origin-left border-t border-white/20 md:mt-24" />

        <div className="mt-16 space-y-6 md:mt-20 md:space-y-8">
          {capability.projects.map((project, index) => (
            <motion.div
              key={project.name}
              {...rise}
              transition={{ duration: 0.6, delay: 0.35 + index * 0.08 }}
              className="border border-white/15 p-7 md:p-10"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="mono text-[10px] uppercase tracking-[.14em] text-white/45">
                    0{index + 1} · {project.status}
                  </p>
                  <h2 className="display mt-4 text-[clamp(1.8rem,4.2vw,3.25rem)]">{project.name}</h2>
                </div>
                <Magnetic
                  as="a"
                  href="/#contact"
                  onClick={goHome('#contact')}
                  strength={0.3}
                  cursorVariant="view"
                  cursorLabel="Send"
                  className="reveal-link w-fit shrink-0 border-b border-[#a3b188]/70 pb-1 text-white/80 hover:border-white hover:text-white"
                >
                  Get started
                </Magnetic>
              </div>

              <div className="mt-8 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-3 md:mt-10 md:pt-10">
                {project.features.map((feature) => (
                  <p key={feature} className="text-sm leading-6 text-white/60">{feature}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...rise} transition={{ duration: 0.6, delay: 0.75 }} className="mt-20 flex flex-col items-start gap-6 md:mt-28 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-sm leading-7 text-white/60">Want something like this built for you?</p>
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
