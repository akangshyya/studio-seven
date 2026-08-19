import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { CurtainOverlay } from './components/layout/CurtainOverlay'
import { Home } from './pages/Home'
import { WhatWeBuildPage } from './pages/WhatWeBuildPage'
import { CapabilityDetailPage } from './pages/CapabilityDetailPage'
import { CursorProvider } from './lib/CursorContext'
import { RouterProvider, useRouter } from './lib/Router'
import { CustomCursor } from './components/cursor/CustomCursor'
import { CursorSpotlight } from './components/cursor/CursorSpotlight'
import { CursorPreview } from './components/cursor/CursorPreview'

function Shell() {
  const { path } = useRouter()
  const capabilitySlug = path.match(/^\/what-we-build\/([a-z0-9-]+)\/?$/)?.[1]

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
    <div className="site-shell">
      <CursorSpotlight />
      <Navbar />
      <main>
        {capabilitySlug ? (
          <CapabilityDetailPage slug={capabilitySlug} />
        ) : path === '/what-we-build' ? (
          <WhatWeBuildPage />
        ) : (
          <Home />
        )}
      </main>
      <Footer />
      <CustomCursor />
      <CursorPreview />
      <CurtainOverlay />
    </div>
  )
}

export default function App() {
  return (
    <CursorProvider>
      <RouterProvider>
        <Shell />
      </RouterProvider>
    </CursorProvider>
  )
}
