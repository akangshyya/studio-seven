import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Container } from '../layout/Container'

type Topo = {
  name?: string
  coords?: string
  cx: number
  cy: number
  base: number
  rings: number
  step: number
  ry: number
  seed: number
}

const states: Topo[] = [
  { name: 'Assam', coords: '26.14, 91.73', cx: 150, cy: 210, base: 10, rings: 12, step: 9, ry: 1.05, seed: 2 },
  { name: 'Arunachal Pradesh', coords: '27.10, 93.62', cx: 200, cy: 80, base: 8, rings: 9, step: 7, ry: 0.8, seed: 5 },
  { name: 'Meghalaya', coords: '25.57, 91.88', cx: 62, cy: 235, base: 7, rings: 9, step: 6, ry: 1.25, seed: 9 },
  { name: 'Nagaland', coords: '25.67, 94.11', cx: 252, cy: 175, base: 6, rings: 8, step: 6, ry: 0.9, seed: 12 },
  { name: 'Manipur', coords: '24.82, 93.94', cx: 232, cy: 300, base: 7, rings: 9, step: 6, ry: 1.1, seed: 17 },
  { name: 'Mizoram', coords: '23.73, 92.72', cx: 108, cy: 355, base: 6, rings: 8, step: 6, ry: 1.35, seed: 21 },
  { name: 'Tripura', coords: '23.84, 91.28', cx: 42, cy: 372, base: 5, rings: 7, step: 5, ry: 0.85, seed: 26 },
]

const fillers: Topo[] = [
  { cx: 28, cy: 42, base: 5, rings: 7, step: 5, ry: 1.1, seed: 31 },
  { cx: 150, cy: 24, base: 4, rings: 6, step: 5, ry: 0.9, seed: 34 },
  { cx: 285, cy: 260, base: 5, rings: 7, step: 5, ry: 1.2, seed: 37 },
  { cx: 270, cy: 405, base: 4, rings: 6, step: 5, ry: 0.85, seed: 40 },
  { cx: 14, cy: 300, base: 4, rings: 6, step: 5, ry: 1.15, seed: 43 },
]

const all = [...states, ...fillers]

function OriginPanel() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const active = hoveredIdx !== null ? all[hoveredIdx] : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-8 flex flex-col md:mt-0 md:h-full md:justify-center"
    >
      <div className="relative w-full max-w-[340px] aspect-[300/420]">
        <svg viewBox="0 0 300 420" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full">
        <defs>
          {all.map((s) => (
            <filter key={s.seed} id={`wobble-${s.seed}`} x="-40%" y="-40%" width="180%" height="180%">
              <feTurbulence type="fractalNoise" baseFrequency="0.026 0.036" numOctaves="3" seed={s.seed} result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="15" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          ))}
        </defs>

        {all.map((s, i) => {
          const outerR = s.base + (s.rings - 1) * s.step
          const isActive = hoveredIdx === i
          return (
            <g key={s.seed}>
              <g filter={`url(#wobble-${s.seed})`} fill="none" stroke="#a3b188">
                {Array.from({ length: s.rings }).map((_, r) => {
                  const radius = s.base + r * s.step
                  return (
                    <ellipse
                      key={r}
                      cx={s.cx}
                      cy={s.cy}
                      rx={radius}
                      ry={radius * s.ry}
                      strokeWidth={r % 3 === 0 ? 1.1 : 0.55}
                      strokeOpacity={isActive ? 0.85 - r * (0.7 / s.rings) : 0}
                      style={{ transition: 'stroke-opacity .45s ease' }}
                    />
                  )
                })}
              </g>
              <circle
                cx={s.cx}
                cy={s.cy}
                r={outerR + 4}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx((cur) => (cur === i ? null : cur))}
              />
            </g>
          )
        })}
      </svg>

      <AnimatePresence>
        {active?.coords && (
          <motion.div
            key={active.coords}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute rounded-sm border border-white/15 bg-[#0b0c09]/95 px-2.5 py-1.5"
            style={{
              left: `${(active.cx / 300) * 100}%`,
              top: `${(active.cy / 420) * 100}%`,
              transform: 'translate(-50%, calc(-100% - 14px))',
            }}
          >
            <p className="mono whitespace-nowrap text-[8px] tracking-[.08em] text-[#a3b188]">{active.coords}</p>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      <p className="pointer-events-none mt-6 mono text-[9px] uppercase leading-relaxed tracking-[.14em] text-white/70">
        Seven states.<br />One horizon.
      </p>
    </motion.div>
  )
}

export function About() {
  return <section id="about" className="relative min-h-[70svh] overflow-hidden border-b border-white/15 py-28 md:py-40">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_20%,rgba(163,177,136,.07),transparent_45%)]" />
    <Container className="relative">
      <div className="grid gap-14 md:grid-cols-12 md:items-stretch">
        <div className="md:col-span-4">
          <p className="eyebrow">Origin</p>
          <OriginPanel />
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
