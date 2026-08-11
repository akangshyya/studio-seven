import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Container } from '../layout/Container'

type StateTopo = {
  name: string
  coords: string
  leftPct: number
  topPct: number
  size: number
  base: number
  rings: number
  step: number
  ry: number
  seed: number
}

const states: StateTopo[] = [
  // size scaled by real land area (Arunachal is NE India's largest state, Tripura the smallest)
  // position scaled from each state's approximate real lat/long centroid
  { name: 'Arunachal Pradesh', coords: '27.10, 93.62', leftPct: 72, topPct: 12, size: 340, base: 18, rings: 7, step: 10, ry: 0.8, seed: 5 },
  { name: 'Assam', coords: '26.14, 91.73', leftPct: 51, topPct: 43, size: 330, base: 17, rings: 7, step: 10, ry: 1.05, seed: 2 },
  { name: 'Nagaland', coords: '25.67, 94.11', leftPct: 86, topPct: 44, size: 160, base: 12, rings: 5, step: 8, ry: 0.9, seed: 12 },
  { name: 'Meghalaya', coords: '25.57, 91.88', leftPct: 10, topPct: 54, size: 183, base: 14, rings: 6, step: 9, ry: 1.25, seed: 9 },
  { name: 'Manipur', coords: '24.82, 93.94', leftPct: 73, topPct: 67, size: 183, base: 14, rings: 6, step: 9, ry: 1.1, seed: 17 },
  { name: 'Tripura', coords: '23.84, 91.28', leftPct: 21, topPct: 80, size: 130, base: 10, rings: 5, step: 7, ry: 0.85, seed: 26 },
  { name: 'Mizoram', coords: '23.73, 92.72', leftPct: 47, topPct: 90, size: 178, base: 13, rings: 6, step: 9, ry: 1.35, seed: 21 },
]

function StateCluster({ s, isActive, onEnter, onLeave }: { s: StateTopo; isActive: boolean; onEnter: () => void; onLeave: () => void }) {
  const idleDelay = (s.seed % 5) * 0.18

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{ left: `${s.leftPct}%`, top: `${s.topPct}%`, width: s.size, height: s.size }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
        <defs>
          <filter id={`wobble-${s.seed}`} x="-40%" y="-40%" width="180%" height="180%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03 0.04" numOctaves="3" seed={s.seed} result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="10" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <g filter={`url(#wobble-${s.seed})`} fill="none" stroke="#a3b188">
          {Array.from({ length: s.rings }).map((_, r) => {
            const radius = s.base + r * s.step
            const targetOpacity = 0.85 - r * (0.7 / s.rings)
            return (
              <motion.ellipse
                key={r}
                cx={100}
                cy={100}
                rx={radius}
                ry={radius * s.ry}
                strokeWidth={r % 3 === 0 ? 1.1 : 0.55}
                initial={false}
                animate={isActive ? { pathLength: 1, opacity: targetOpacity } : { pathLength: 0, opacity: 0 }}
                transition={isActive ? { duration: 0.85, delay: r * 0.055, ease: [0.65, 0, 0.35, 1] } : { duration: 0.3, ease: 'easeIn' }}
              />
            )
          })}
        </g>
        <motion.circle
          cx={100}
          cy={100}
          fill="#f5f3ee"
          animate={isActive ? { r: 2.6, opacity: 1 } : { r: [1.5, 2.1, 1.5], opacity: [0.35, 0.6, 0.35] }}
          transition={isActive ? { duration: 0.25 } : { duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: idleDelay }}
        />
        <motion.circle
          cx={100}
          cy={100}
          fill="none"
          stroke="#a3b188"
          strokeWidth={0.8}
          animate={isActive ? { r: 9, opacity: 0.7 } : { r: [5.5, 7.5, 5.5], opacity: [0.2, 0.4, 0.2] }}
          transition={isActive ? { duration: 0.25 } : { duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: idleDelay }}
        />
      </svg>
    </div>
  )
}

function OriginTopology() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const active = hoveredIdx !== null ? states[hoveredIdx] : null

  return (
    <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-full overflow-hidden md:block md:w-[40%]">
      {states.map((s, i) => (
        <div key={s.name} className="pointer-events-auto">
          <StateCluster s={s} isActive={hoveredIdx === i} onEnter={() => setHoveredIdx(i)} onLeave={() => setHoveredIdx((cur) => (cur === i ? null : cur))} />
        </div>
      ))}

      <AnimatePresence>
        {active && (
          <motion.div
            key={active.name}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute rounded-sm border border-white/15 bg-[#0b0c09]/95 px-2.5 py-1.5"
            style={{
              left: `${active.leftPct}%`,
              top: `${active.topPct}%`,
              transform: 'translate(-50%, calc(-100% - 12px))',
            }}
          >
            <p className="mono whitespace-nowrap text-[9px] tracking-[.1em] text-[#a3b188]">{active.coords}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function About() {
  return <section id="about" className="relative min-h-[70svh] overflow-hidden border-b border-white/15 py-28 md:py-40">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_20%,rgba(163,177,136,.07),transparent_45%)]" />
    <p className="eyebrow absolute left-4 top-12 z-10 md:left-10 md:top-16">Origin</p>
    <Container className="relative">
      <div className="grid gap-14 md:grid-cols-12 md:items-center">
        <div className="md:col-span-4" />

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
    <OriginTopology />
    <p className="pointer-events-none absolute bottom-8 left-4 mono text-[9px] uppercase leading-relaxed tracking-[.14em] text-white/70 md:left-10">
      Seven states.<br />One horizon.
    </p>
  </section>
}
