import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { Ecosystem } from './components/sections/Ecosystem'
import { WhatWeBuild } from './components/sections/WhatWeBuild'
import { Philosophy } from './components/sections/Philosophy'
import { SelectedWork } from './components/sections/SelectedWork'
import { About } from './components/sections/About'
import { Closing } from './components/sections/Closing'
import { Footer } from './components/layout/Footer'
import { CursorProvider } from './lib/CursorContext'
import { CustomCursor } from './components/cursor/CustomCursor'
import { CursorSpotlight } from './components/cursor/CursorSpotlight'
import { CursorPreview } from './components/cursor/CursorPreview'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return (
    <CursorProvider>
      <div className="site-shell">
        <CursorSpotlight />
        <Navbar />
        <main>
          <Hero />
          <Ecosystem />
          <WhatWeBuild />
          <Philosophy />
          <SelectedWork />
          <About />
          <Closing />
        </main>
        <Footer />
        <CustomCursor />
        <CursorPreview />
      </div>
    </CursorProvider>
  )
}
