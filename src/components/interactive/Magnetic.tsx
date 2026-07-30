import { useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { useCursor } from '../../lib/CursorContext'
import type { CursorVariant } from '../../lib/CursorContext'

type MagneticProps = {
  children: ReactNode
  as?: 'a' | 'div' | 'button'
  href?: string
  className?: string
  strength?: number
  cursorVariant?: CursorVariant
  cursorLabel?: string
  onEnter?: () => void
  onLeave?: () => void
  onClick?: () => void
}

export function Magnetic({
  children,
  as = 'div',
  href,
  className = '',
  strength = 0.35,
  cursorVariant = 'hover',
  cursorLabel,
  onEnter,
  onLeave,
  onClick,
}: MagneticProps) {
  const ref = useRef<HTMLAnchorElement & HTMLDivElement & HTMLButtonElement>(null)
  const { setVariant, setLabel, enabled } = useCursor()

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (!enabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = (e.clientX - (rect.left + rect.width / 2)) * strength
    const relY = (e.clientY - (rect.top + rect.height / 2)) * strength
    ref.current.style.transform = `translate(${relX}px, ${relY}px)`
  }

  const handleEnter = () => {
    setVariant(cursorVariant)
    setLabel(cursorLabel ?? null)
    onEnter?.()
  }

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)'
    setVariant('default')
    setLabel(null)
    onLeave?.()
  }

  const sharedClassName = `transition-transform duration-300 ease-out will-change-transform ${className}`

  if (as === 'a') {
    return (
      <a ref={ref} href={href} onMouseMove={handleMove} onMouseEnter={handleEnter} onMouseLeave={handleLeave} onClick={onClick} className={sharedClassName}>
        {children}
      </a>
    )
  }

  if (as === 'button') {
    return (
      <button ref={ref} onMouseMove={handleMove} onMouseEnter={handleEnter} onMouseLeave={handleLeave} onClick={onClick} className={sharedClassName}>
        {children}
      </button>
    )
  }

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseEnter={handleEnter} onMouseLeave={handleLeave} onClick={onClick} className={sharedClassName}>
      {children}
    </div>
  )
}
