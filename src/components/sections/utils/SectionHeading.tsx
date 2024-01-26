import { ReactNode } from 'react'
import { calcRem } from '../../../utils/styles'

interface SectionHeadingProps {
  children: ReactNode
}

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <div
      className="opacity-50 uppercase font-heebo"
      style={{
        fontSize: calcRem(12),
        lineHeight: calcRem(15),
        letterSpacing: calcRem(3)
      }}
    >
      {children}
    </div>
  )
}
