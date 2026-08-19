import { motion } from 'framer-motion'
import { Container } from '../layout/Container'

const divisions = [
  ['01', 'Labs', 'Emerging technology and intelligent systems.', '/tools/labs.png'],
  ['02', 'Growth', 'Strategies that give good work momentum.', '/tools/growth.png'],
  ['03', 'Studio', 'Digital products, brands, and experiences.', '/tools/studio.png'],
  ['04', 'Ventures', 'New companies built with intent from the ground up.', '/tools/ventures.png'],
] as const

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
      {divisions.map(([number, title, text, image]) => <motion.a id={title.toLowerCase()} whileHover={{ y: -5 }} transition={{ duration: .5 }} href="#contact" key={title} className="group relative min-h-64 scroll-mt-28 overflow-hidden border-b border-r border-white/15 p-6 md:p-8">
      <img src={image} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition duration-700 group-hover:scale-100 group-hover:opacity-60" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,.35)_0%,rgba(8,8,8,.55)_55%,rgba(8,8,8,.88)_100%)] opacity-0 transition duration-700 group-hover:opacity-100" />
      <span className="relative mono text-[10px] text-[#a3b188]">{number}</span>
      <div className="absolute inset-x-6 top-1/2 h-px origin-left scale-x-0 bg-[#a3b188] transition-transform duration-700 group-hover:scale-x-100 md:inset-x-8" />
      <div className="absolute bottom-7 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
        <h3 className="text-3xl tracking-[-.06em] transition-all duration-500 group-hover:font-bold">{title}</h3>
        <p className="mt-3 max-w-xs text-sm leading-6 text-white/52">{text}</p>
        </div></motion.a>)}
      </div>
    </Container>
  </section>
}
