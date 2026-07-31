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

// --- deterministic contour generation -------------------------------------------------
// Each ring is a real vector path (not a rasterized SVG filter), so it stays crisp at any
// scale. A small set of seeded sine harmonics is shared across all rings of one peak so the
// nested contours wobble coherently, the way real elevation bands do.

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function catmullRomPath(points: [number, number][]) {
  const n = points.length
  let d = `M ${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)} `
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n]
    const p1 = points[i]
    const p2 = points[(i + 1) % n]
    const p3 = points[(i + 2) % n]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += `C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)} `
  }
  return d + 'Z'
}

function buildContours(s: Topo, samples = 40) {
  const rand = mulberry32(s.seed)
  const harmonics = Array.from({ length: 4 }, () => ({
    freq: 2 + Math.floor(rand() * 4),
    amp: 0.045 + rand() * 0.05,
    phase: rand() * Math.PI * 2,
  }))

  const paths: string[] = []
  for (let r = 0; r < s.rings; r++) {
    const radius = s.base + r * s.step
    const pts: [number, number][] = []
    for (let i = 0; i < samples; i++) {
      const t = (i / samples) * Math.PI * 2
      let offset = 0
      for (const h of harmonics) offset += Math.sin(t * h.freq + h.phase) * h.amp
      const rr = radius * (1 + offset)
      pts.push([s.cx + Math.cos(t) * rr, s.cy + Math.sin(t) * rr * s.ry])
    }
    paths.push(catmullRomPath(pts))
  }
  return paths
}

const contours = new Map(all.map((s) => [s.seed, buildContours(s)]))

function OriginPanel() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const active = hoveredIdx !== null ? all[hoveredIdx] : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-8 h-[420px] w-full md:mt-0 md:h-full md:min-h-[480px]"
    >
      <svg viewBox="0 0 300 420" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full">
        {all.map((s, i) => {
          const outerR = s.base + (s.rings - 1) * s.step
          const isActive = hoveredIdx === i
          const paths = contours.get(s.seed)!
          return (
            <g key={s.seed}>
              <g fill="none" stroke="#a3b188" strokeLinejoin="round">
                {paths.map((d, r) => {
                  const order = s.rings - 1 - r // outer ring reveals first, peak completes last
                  return (
                    <motion.path
                      key={r}
                      d={d}
                      strokeWidth={r % 3 === 0 ? 1.1 : 0.55}
                      initial={false}
                      animate={
                        isActive
                          ? { opacity: 0.85 - r * (0.7 / s.rings), pathLength: 1 }
                          : { opacity: 0, pathLength: 0.82 }
                      }
                      transition={
                        isActive
                          ? {
                              opacity: { duration: 0.35, delay: order * 0.032 },
                              pathLength: { duration: 0.55, delay: order * 0.032, ease: [0.16, 1, 0.3, 1] },
                            }
                          : { duration: 0.3 }
                      }
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

      <p className="pointer-events-none absolute bottom-0 left-0 mono text-[9px] uppercase leading-relaxed tracking-[.14em] text-white/70">
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
        <div className="md:col-span-5">
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
