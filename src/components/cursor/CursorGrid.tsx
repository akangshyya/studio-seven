import { motion, useMotionTemplate } from 'framer-motion'
import { useCursor } from '../../lib/CursorContext'

export function CursorGrid() {
  const { x, y, enabled } = useCursor()
  const mask = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, black 0%, transparent 75%)`

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{
        WebkitMaskImage: mask,
        maskImage: mask,
        backgroundImage:
          'linear-gradient(90deg, rgba(163,177,136,.55) 1px, transparent 1px), linear-gradient(0deg, rgba(163,177,136,.55) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
      }}
    />
  )
}
