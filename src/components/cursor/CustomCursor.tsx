import { AnimatePresence, motion, useSpring } from 'framer-motion'
import { useCursor } from '../../lib/CursorContext'

const RING_SIZE: Record<string, number> = { default: 16, hover: 44, text: 36, view: 58 }

export function CustomCursor() {
  const { x, y, variant, label, enabled, preview } = useCursor()
  const ringX = useSpring(x, { damping: 26, stiffness: 300, mass: 0.4 })
  const ringY = useSpring(y, { damping: 26, stiffness: 300, mass: 0.4 })
  const dotX = useSpring(x, { damping: 50, stiffness: 1000, mass: 0.12 })
  const dotY = useSpring(y, { damping: 50, stiffness: 1000, mass: 0.12 })

  if (!enabled) return null

  const hasLabel = Boolean(label) && !preview
  const hidden = Boolean(preview)
  const size = RING_SIZE[variant] ?? RING_SIZE.default

  return <>
    <motion.div
      aria-hidden
      style={{ x: dotX, y: dotY }}
      animate={{ scale: hidden || hasLabel ? 0 : variant === 'default' ? 1 : 0.4, opacity: hidden ? 0 : 1 }}
      transition={{ type: 'spring', damping: 24, stiffness: 600 }}
      className="pointer-events-none fixed left-0 top-0 z-[90] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a3b188] mix-blend-difference"
    />

    <motion.div
      aria-hidden
      layout
      style={{ x: ringX, y: ringY, mixBlendMode: hasLabel ? 'normal' : 'difference' }}
      animate={{
        opacity: hidden ? 0 : 1,
        width: hasLabel ? 'auto' : size,
        height: hasLabel ? 40 : size,
        paddingLeft: hasLabel ? 20 : 0,
        paddingRight: hasLabel ? 20 : 0,
        backgroundColor: hasLabel ? '#a3b188' : variant === 'default' ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,.05)',
        borderColor: hasLabel ? 'rgba(163,177,136,0)' : 'rgba(255,255,255,.55)',
      }}
      transition={{ type: 'spring', damping: 22, stiffness: 280, mass: 0.6 }}
      className="pointer-events-none fixed left-0 top-0 z-[89] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center whitespace-nowrap rounded-full border"
    >
      <AnimatePresence mode="wait">
        {hasLabel && (
          <motion.span
            key={label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.16 }}
            className="mono text-[10px] font-medium uppercase tracking-[.1em] text-[#080808]"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  </>
}
