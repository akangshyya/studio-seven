import type { PropsWithChildren } from 'react'

type ContainerProps = PropsWithChildren<{ className?: string }>

export function Container({ children, className = '' }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-[1600px] px-4 md:px-10 ${className}`}>{children}</div>
}
