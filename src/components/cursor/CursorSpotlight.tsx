import { motion, useSpring } from 'framer-motion'
import { useCursor } from '../../lib/CursorContext'

export function CursorSpotlight() {
  const { x, y, enabled } = useCursor()
  const sx = useSpring(x, { damping: 26, stiffness: 110, mass: 0.8 })
  const sy = useSpring(y, { damping: 26, stiffness: 110, mass: 0.8 })

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[1] size-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[.08] mix-blend-screen"
    >
      <div className="size-full rounded-full bg-[radial-gradient(circle,rgba(163,177,136,.95),transparent_62%)]" />
    </motion.div>
  )
}
