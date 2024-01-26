import classNames from 'classnames'
import { useDepositInterfaceContext } from 'context/DepositInterfaceContext'
import Link from 'next/link'
import { BsDot } from 'react-icons/bs'
import { calcRem } from '../utils/styles'
import { WEB_DOCS_LINK } from './const/links'
import { NAME } from './const/constants'

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={classNames(
        'container footer-main items-center mx-auto tablet:space-x-1 justify-center py-7 tablet:py-14 tablet:flex tablet:whitespace-nowrap text-white mb-10',
        className
      )}
    >
      <div className="flex items-center justify-center space-x-2">
        <img src="logo/ss-logo-header.png" alt="ss logo" width={'28px'} />
        <p
          style={{ fontSize: calcRem(14) }}
          className="credits-footer text-green-light"
        >
          {NAME}
        </p>
      </div>
      <div className="hidden tablet:flex">
        <BsDot />
      </div>
      <div
        style={{ fontSize: calcRem(14) }}
        className="mx-auto tablet:mx-0 align-middle items-center w-full tablet:w-min text-center pt-4 tablet:pt-0 justify-center"
      >
        <Link href={WEB_DOCS_LINK} passHref>
          <a className="opacity-80 hover:opacity-60 transition-all ease-in-out duration-200" target="_blank">
            Documentation
          </a>
        </Link>
      </div>
    </footer>
  )
}
