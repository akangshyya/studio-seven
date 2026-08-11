import { motion } from 'framer-motion'
import { Container } from '../layout/Container'

const divisions = [
  ['01', 'Labs', 'Emerging technology and intelligent systems.'],
  ['02', 'Growth', 'Strategies that give good work momentum.'],
  ['03', 'Studio', 'Digital products, brands, and experiences.'],
  ['04', 'Ventures', 'New companies built with intent from the ground up.'],
]

export function Ecosystem() {
  return <section id="ecosystem" className="border-b border-white/15 py-28 md:py-44">
    <Container>
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow">
            The Seven Ecosystem
          </p>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <h2 className="display max-w-2xl text-5xl md:text-7xl">
            Different disciplines.
            <br />
            One direction.
            </h2>
            <p className="mt-8 max-w-md leading-7 text-white/62">
            We bring the right perspectives together to make complex problems feel clear, considered, and possible.
            </p>
          </div>
        </div>
      <div className="mt-24 grid border-l border-t border-white/15 sm:grid-cols-2">
      {divisions.map(([number, title, text]) => <motion.a id={title.toLowerCase()} whileHover={{ y: -5 }} transition={{ duration: .5 }} href="#contact" key={title} className="group relative min-h-64 scroll-mt-28 border-b border-r border-white/15 p-6 md:p-8">
      <span className="mono text-[10px] text-[#a3b188]">{number}</span>
      <div className="absolute inset-x-6 top-1/2 h-px origin-left scale-x-0 bg-[#a3b188] transition-transform duration-700 group-hover:scale-x-100 md:inset-x-8" />
      <div className="absolute bottom-7 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
        <h3 className="text-3xl tracking-[-.06em] transition-all duration-500 group-hover:font-bold">{title}</h3>
        <p className="mt-3 max-w-xs text-sm leading-6 text-white/52">{text}</p>
        </div></motion.a>)}
      </div>
    </Container>
  </section>
}
