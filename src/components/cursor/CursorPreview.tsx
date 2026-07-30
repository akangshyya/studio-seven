import { AnimatePresence, motion, useSpring } from 'framer-motion'
import { useCursor } from '../../lib/CursorContext'

export function CursorPreview() {
  const { x, y, enabled, preview } = useCursor()
  const px = useSpring(x, { damping: 24, stiffness: 280, mass: 0.4 })
  const py = useSpring(y, { damping: 24, stiffness: 280, mass: 0.4 })

  if (!enabled) return null

  return (
    <AnimatePresence>
      {preview && (
        <motion.div
          aria-hidden
          style={{ x: px, y: py }}
          initial={{ opacity: 0, scale: 0.72 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.72 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none fixed left-0 top-0 z-[95] w-52 -translate-x-1/2 -translate-y-[135%] overflow-hidden rounded-sm border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,.55)]"
        >
          <div className={`relative aspect-[4/5] w-full ${preview.gradient}`}>
            <div
              aria-hidden
              className="absolute inset-0 opacity-40"
              style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(246,246,244,.05) 0px, rgba(246,246,244,.05) 1px, transparent 1px, transparent 34px), repeating-linear-gradient(90deg, rgba(246,246,244,.05) 0px, rgba(246,246,244,.05) 1px, transparent 1px, transparent 34px)' }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(163,177,136,.2),transparent_60%)]" />
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="mono text-[9px] uppercase tracking-[.1em] text-white">{preview.label}</p>
              {preview.meta && <p className="mono mt-1 text-[8px] uppercase tracking-[.08em] text-white/50">{preview.meta}</p>}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
