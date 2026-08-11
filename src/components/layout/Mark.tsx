type MarkProps = { className?: string; color?: string }

export function Mark({ className = 'h-8 w-auto', color = '#a3b188' }: MarkProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 637.93 610.26"
      role="img"
      aria-label="Studio Seven mark"
    >
      <rect fill={color} width="637.93" height="85.36" />
      <rect fill={color} y="131.22" width="637.93" height="85.36" />
      <rect fill={color} x="233.32" y="262.45" width="245.43" height="85.36" />
      <rect fill={color} x="142.96" y="393.67" width="213.09" height="85.36" />
      <rect fill={color} x="36.41" y="524.9" width="213.09" height="85.36" />
    </svg>
  )
}
