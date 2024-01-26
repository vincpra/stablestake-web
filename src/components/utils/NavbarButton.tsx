import classNames from 'classnames'
import React from 'react'
import { calcRem } from 'utils/styles'

interface NavbarButtonProps {
  label: string
  onClick: () => void
  className?: string
}

interface NavbarButtonLinkProps {
  label: string
  href: string
  onClick: () => void
  className?: string
}

export const NavbarButton = ({ label, onClick, className }: NavbarButtonProps): JSX.Element => {
  return (
    <div
      className={classNames(
        'flex whitespace-nowrap items-center rounded-md px-6 font-semibold button-shadow hover:cursor-pointer',
        className
      )}
      style={{
        height: calcRem(44),
        fontSize: calcRem(14)
      }}
      onClick={onClick}
    >
      {label}
    </div>
  )
}

export const NavbarButtonLink = React.forwardRef(({ label, href, onClick, className }: NavbarButtonLinkProps, ref) => {
  return (
    <a href={href} ref={ref as any}>
      <NavbarButton label={label} onClick={onClick} className={className} />
    </a>
  )
})

NavbarButtonLink.displayName = 'NavbarButtonLink'
