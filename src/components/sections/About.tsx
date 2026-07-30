import { Container } from '../layout/Container'

export function About() {
  return <section id="about" className="relative min-h-[70svh] overflow-hidden border-b border-white/15 py-28 md:py-40">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_20%,rgba(163,177,136,.07),transparent_45%)]" />
    <Container className="relative">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow">Origin</p>
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
