import { createContext, useContext, useEffect, useRef, useState } from 'react'
import type { PropsWithChildren } from 'react'

type Phase = 'idle' | 'covering' | 'revealing'

type RouterContextValue = {
  path: string
  navigate: (to: string) => void
  goToSection: (hash: string) => void
  phase: Phase
}

const RouterContext = createContext<RouterContextValue | null>(null)

const COVER_MS = 620
const REVEAL_MS = 620

export function RouterProvider({ children }: PropsWithChildren) {
  const [path, setPath] = useState(() => window.location.pathname)
  const [phase, setPhase] = useState<Phase>('idle')
  const timer = useRef<number | null>(null)
  const pathRef = useRef(path)
  pathRef.current = path

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current) }, [])

  // Runs the curtain cover -> action -> reveal sequence. Shared by page
  // navigation and same-page section jumps so both get the same transition.
  const runTransition = (action: () => void) => {
    if (phase !== 'idle') return
    setPhase('covering')
    timer.current = window.setTimeout(() => {
      action()
      setPhase('revealing')
      timer.current = window.setTimeout(() => setPhase('idle'), REVEAL_MS)
    }, COVER_MS)
  }

  const navigate = (to: string) => {
    if (to === pathRef.current) return
    runTransition(() => {
      window.history.pushState({}, '', to)
      setPath(to)
      window.scrollTo(0, 0)
    })
  }

  // For in-page anchors (e.g. "Contact") — plays the curtain, hops home first
  // if needed, then scrolls to the target section once hidden behind it.
  const goToSection = (hash: string) => {
    runTransition(() => {
      if (pathRef.current !== '/') {
        window.history.pushState({}, '', '/')
        setPath('/')
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.querySelector(hash)?.scrollIntoView({ behavior: 'auto' })
        })
      })
    })
  }

  return (
    <RouterContext.Provider value={{ path, navigate, goToSection, phase }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('useRouter must be used within a RouterProvider')
  return ctx
}

export { COVER_MS, REVEAL_MS }
export type { Phase }
