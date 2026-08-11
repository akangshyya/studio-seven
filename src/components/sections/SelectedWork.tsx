import { Container } from '../layout/Container'
import { Magnetic } from '../interactive/Magnetic'
import { useCursor } from '../../lib/CursorContext'

const projects = [
  ['01', 'AI Voice Receptionist', 'AI  systems· Digital Product', 'bg-[#11110f]', '/tools/first.jpg'],
  ['02', 'Real Estate Growth Systems', 'AI  systems· Paid Growth', 'bg-[#1b1e17]', '/tools/second.jpg'],
  ['03', 'Elite Rankers', 'Brand campaign · Paid growth', 'bg-[#181818]', '/tools/first.jpg'],
] as const

export function SelectedWork() {
  const { setPreview } = useCursor()
  return <section id="labs" className="border-b border-white/15 py-28 md:py-44"><Container><div className="flex items-baseline justify-between"><p className="eyebrow">Selected work</p><span className="mono text-[10px] text-white/40">A selection / 2026</span></div><div className="mt-16 grid gap-5 md:grid-cols-3">{projects.map(([number, title, type, bg, image]) => <Magnetic
    as="a"
    href="#contact"
    key={number}
    strength={0.05}
    cursorVariant="view"
    className="group block"
    onEnter={() => setPreview({ label: title, meta: type, gradient: bg, image })}
    onLeave={() => setPreview(null)}
  >
    <div className={`relative aspect-[4/5] overflow-hidden border border-white/15 ${bg}`}>
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
    <div aria-hidden className="absolute inset-0 opacity-25 mix-blend-overlay" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(246,246,244,.05) 0px, rgba(246,246,244,.05) 1px, transparent 1px, transparent 34px), repeating-linear-gradient(90deg, rgba(246,246,244,.05) 0px, rgba(246,246,244,.05) 1px, transparent 1px, transparent 34px)' }} />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,.05)_0%,rgba(8,8,8,.15)_55%,rgba(8,8,8,.75)_100%)]" />
    <span className="absolute left-5 top-5 mono text-[10px] text-white/70">{number}</span>
    <span className="absolute bottom-5 left-5 mono text-[9px] uppercase tracking-[.1em] text-white/50">Click To View</span>
    <span className="absolute bottom-5 right-5 text-xl text-white/60 transition duration-700 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
    </div>
    <div className="mt-5 border-t border-white/15 pt-4">
      <h3 className="text-xl tracking-[-.05em] transition duration-500 group-hover:font-bold">{title}</h3>
      <p className="mt-2 mono text-[9px] uppercase tracking-[.1em] text-white/45">{type}</p>
    </div>
    </Magnetic>)}</div>
    </Container>
    </section>
}
