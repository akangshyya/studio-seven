import { Container } from '../layout/Container'
import { Magnetic } from '../interactive/Magnetic'
import { ScrambleText } from '../interactive/ScrambleText'

export function Closing() {
  return <section id="contact" className="page-grid relative border-b border-white/15 py-28 md:py-48">
    <Container>
      <div className="grid gap-20 md:grid-cols-12">
        <div className="md:col-span-4"><p className="eyebrow">Start a conversation</p></div>
        <div className="md:col-span-8">
          <p className="mono text-[10px] uppercase tracking-[.13em] text-white/45">Have an idea?</p>
          <h2 className="display mt-6 text-[clamp(4rem,10vw,10rem)]">Let&apos;s build<br /><span className="text-white/48">it well.</span></h2>
          <div className="mt-14 flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-12">
            <Magnetic as="a" href="mailto:studiosevencreatives@gmail.com" strength={0.3} cursorVariant="view" cursorLabel="Send" className="group inline-flex border-b border-[#a3b188] pb-4 mono text-[11px] uppercase tracking-[.13em]">
              <ScrambleText text="studiosevencreatives@gmail.com" />
              <span className="ml-10 transition-transform duration-500 group-hover:translate-x-1">↗</span>
            </Magnetic>
            <Magnetic as="a" href="https://www.instagram.com/studiosevencreatives?igsh=MWlvdTdjN3lqbG8zcA%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" strength={0.3} cursorVariant="view" cursorLabel="Follow" className="group inline-flex border-b border-white/25 pb-4 mono text-[11px] uppercase tracking-[.13em] hover:border-[#a3b188]">
              <ScrambleText text="@studioseven" />
              <span className="ml-10 transition-transform duration-500 group-hover:translate-x-1">↗</span>
            </Magnetic>
          </div>
        </div>
      </div>
    </Container>
  </section>
}
