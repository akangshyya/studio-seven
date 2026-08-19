import { Container } from '../layout/Container'
import { Magnetic } from '../interactive/Magnetic'
import { ScrambleText } from '../interactive/ScrambleText'
import { useRouter } from '../../lib/Router'
import { capabilities } from '../../data/capabilities'

const status: Record<string, string> = {
  'ai-systems': 'Live now',
  branding: 'In development',
  'content-production': 'In development',
  'digital-products': 'In development',
}

export function WhatWeBuild() {
  const { navigate } = useRouter()
  return <section id="studio" className="page-grid border-b border-white/15 py-28 md:py-44"><Container><div className="flex flex-col justify-between gap-10 md:flex-row"><p className="eyebrow">What we build</p><p className="max-w-sm text-sm leading-6 text-white/60">An idea may arrive as chaos. Our work gives it a shape people can use, believe in, and grow with.</p></div><div className="mt-20">{capabilities.map((item) => <Magnetic as="a" href={`/what-we-build/${item.slug}`} onClick={(e) => { e.preventDefault(); navigate(`/what-we-build/${item.slug}`) }} strength={0.04} cursorVariant="view" cursorLabel="View" className="group flex items-center justify-between border-t border-white/15 py-5 md:py-7" key={item.slug}><span className="mono shrink-0 text-[10px] text-[#a3b188]">{item.number} · {status[item.slug]?.toUpperCase()}</span><ScrambleText text={item.title} as="h2" className="display mr-auto ml-6 text-[clamp(2.25rem,6.2vw,6.5rem)] transition-[font-weight] duration-500 group-hover:font-bold" /><span className="reveal-link hidden shrink-0 text-white/50 transition duration-500 group-hover:text-[#a3b188] md:inline-flex">View</span><span className="text-xl text-white/35 transition duration-500 group-hover:translate-x-1 group-hover:text-[#a3b188] md:hidden">↗</span></Magnetic>)}</div></Container></section>
}
