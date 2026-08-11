import { useCallback, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&$*+=/\\'

type ScrambleTextProps = {
  text: string
  className?: string
  as?: 'span' | 'h2' | 'h3' | 'p'
  speed?: number
}

export function ScrambleText({ text, className = '', as: Tag = 'span', speed = 26 }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text)
  const timer = useRef<number | null>(null)

  const clear = () => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current)
      timer.current = null
    }
  }

  const scramble = useCallback(() => {
    clear()
    let iteration = 0
    const step = () => {
      setDisplay(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) return text[index]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join(''),
      )
      if (iteration >= text.length) {
        setDisplay(text)
        timer.current = null
        return
      }
      iteration += 1 / 2.5
      timer.current = window.setTimeout(step, speed)
    }
    step()
  }, [text, speed])

  const reset = useCallback(() => {
    clear()
    setDisplay(text)
  }, [text])

  return (
    <Tag className={className} onMouseEnter={scramble} onMouseLeave={reset}>
      {display}
    </Tag>
  )
}
