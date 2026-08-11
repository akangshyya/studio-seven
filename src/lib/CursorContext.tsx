import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useMotionValue } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

export type CursorVariant = 'default' | 'hover' | 'view' | 'text'

export type CursorPreview = { label: string; meta?: string; gradient: string; image?: string } | null

type CursorContextValue = {
  x: MotionValue<number>
  y: MotionValue<number>
  variant: CursorVariant
  setVariant: (v: CursorVariant) => void
  label: string | null
  setLabel: (l: string | null) => void
  preview: CursorPreview
  setPreview: (p: CursorPreview) => void
  enabled: boolean
}

const CursorContext = createContext<CursorContextValue | null>(null)

export function CursorProvider({ children }: { children: ReactNode }) {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const [variant, setVariant] = useState<CursorVariant>('default')
  const [label, setLabel] = useState<string | null>(null)
  const [preview, setPreview] = useState<CursorPreview>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setEnabled(mq.matches)
    const onChange = () => setEnabled(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [enabled, x, y])

  useEffect(() => {
    document.documentElement.classList.toggle('cursor-none', enabled)
  }, [enabled])

  return (
    <CursorContext.Provider value={{ x, y, variant, setVariant, label, setLabel, preview, setPreview, enabled }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const ctx = useContext(CursorContext)
  if (!ctx) throw new Error('useCursor must be used within a CursorProvider')
  return ctx
}
