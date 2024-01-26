import classNames from 'classnames'
import { ReactNode } from 'react'
import { calcRem } from '../../../utils/styles'

interface SectionTitleProps {
  className?: string
  children: ReactNode
}

export function SectionTitle({ className, children }: SectionTitleProps) {
  return (
    <h2 className={classNames('section-title font-heebo font-bold text-center mt-2 mb-16 laptop:w-1/2 laptop:text-left tablet:mb-8', className)}>
      {children}
      <style jsx>{`
        .section-title {
          font-size: ${calcRem(30)};
          line-height: ${calcRem(50)};
        }

        @media (min-width: 1280px) {
          .section-title {
            font-size: ${calcRem(30)};
            line-height: ${calcRem(50)};
          }
        }
      `}</style>
    </h2>
  )
}
