import { AnimatePresence, motion } from 'framer-motion'
import { useRouter, COVER_MS, REVEAL_MS } from '../../lib/Router'
import { Logo } from './Logo'
import { Mark } from './Mark'

const ease = [0.83, 0, 0.17, 1] as const

export function CurtainOverlay() {
  const { phase } = useRouter()

  return (
    <AnimatePresence>
      {phase !== 'idle' && (
        <motion.div
          key="curtain"
          initial={{ y: '100%' }}
          animate={{ y: phase === 'covering' ? '0%' : '-100%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: (phase === 'covering' ? COVER_MS : REVEAL_MS) / 1000, ease }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#080808]"
        >
          <div className="absolute inset-0 border-y border-white/10" />
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: phase === 'covering' ? 1 : 0, scale: phase === 'covering' ? 1 : 0.94 }}
            transition={{ duration: 0.4, ease }}
            className="flex flex-col items-center gap-5"
          >
            <motion.div
              initial={{ rotate: -8, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease }}
            >
              <Mark className="h-9 w-auto md:h-11" />
            </motion.div>
            <Logo className="h-3.5 w-auto md:h-4" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
