import { Container } from '../layout/Container'
import { Magnetic } from '../interactive/Magnetic'
import { useCursor } from '../../lib/CursorContext'

const projects = [
  ['01', 'A connected health platform', 'Product strategy · Interface · Growth', 'bg-[#11110f]'],
  ['02', 'Building a more human financial tool', 'Brand · Digital product · Systems', 'bg-[#1b1e17]'],
  ['03', 'A new operating system for learning', 'Venture · Experience · Technology', 'bg-[#181818]'],
] as const

export function SelectedWork() {
  const { setPreview } = useCursor()
  return <section id="labs" className="border-b border-white/15 py-28 md:py-44"><Container><div className="flex items-baseline justify-between"><p className="eyebrow">Selected work</p><span className="mono text-[10px] text-white/40">A selection / 2026</span></div><div className="mt-16 grid gap-5 md:grid-cols-3">{projects.map(([number, title, type, bg]) => <Magnetic
    as="a"
    href="#contact"
    key={number}
    strength={0.05}
    cursorVariant="view"
    className="group block"
    onEnter={() => setPreview({ label: title, meta: type, gradient: bg })}
    onLeave={() => setPreview(null)}
  ><div className={`relative aspect-[4/5] overflow-hidden border border-white/15 ${bg}`}><div aria-hidden className="absolute inset-0 opacity-40 transition duration-700 group-hover:scale-105 group-hover:opacity-55" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(246,246,244,.05) 0px, rgba(246,246,244,.05) 1px, transparent 1px, transparent 34px), repeating-linear-gradient(90deg, rgba(246,246,244,.05) 0px, rgba(246,246,244,.05) 1px, transparent 1px, transparent 34px)' }} /><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(163,177,136,.14),transparent_60%)]" /><span className="absolute left-5 top-5 mono text-[10px] text-white/55">{number}</span><span className="absolute bottom-5 left-5 mono text-[9px] uppercase tracking-[.1em] text-white/30">Case study pending</span><span className="absolute bottom-5 right-5 text-xl text-white/60 transition duration-700 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span></div><div className="mt-5 border-t border-white/15 pt-4"><h3 className="text-xl tracking-[-.05em] transition duration-500 group-hover:font-bold">{title}</h3><p className="mt-2 mono text-[9px] uppercase tracking-[.1em] text-white/45">{type}</p></div></Magnetic>)}</div></Container></section>
}
