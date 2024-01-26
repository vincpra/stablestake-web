import { useState } from 'react'
import { calcRem } from '../utils/styles'
import { useWalletContext } from 'context/WalletContext'
import { Deposit, useDepositsContext } from 'context/DepositsContext'
import { NavbarButtonLink } from 'components/utils/NavbarButton'
import { AFFI_DOCS_LINK, PANCAKESWAP_LINK, WEBAPP_LINK } from './const/links'
import classNames from 'classnames'
import { AiFillInfoCircle, AiOutlineInfoCircle } from 'react-icons/ai'
import { APR_PER_DEPOSIT_TYPE } from './const/constants'
import { ClaimErrors, DepositErrors, useDepositInterfaceContext } from 'context/DepositInterfaceContext'
import { shortenedAccount } from 'utils/shorten'
import Link from 'next/link'

interface BottomSectionProps {
  className?: string
}

export function BottomSection({ className }: BottomSectionProps) {
  const { D_NO_ERROR, D_TRANSACTION_ERROR } = DepositErrors
  const { C_NO_ERROR, C_TRANSACTION_ERROR } = ClaimErrors
  const { account, connected } = useWalletContext()
  const { deposits, depositedValue, availableRewards, rewardsContract } = useDepositsContext()
  const { cashoutAndCompoundAll, cashoutAllDeposits, compoundAffiliateRewards, cashoutAllRewards } =
    useDepositInterfaceContext()
  const [isLoading, setLoading] = useState(false)
  const [hasCopiedLink, setHasCopiedLink] = useState(false)
  // const [claimAllError, setClaimAllError] = useState<DepositErrors>(D_NO_ERROR)

  function fallbackCopyTextToClipboard(text: any) {
    var textArea = document.createElement('textarea')
    textArea.value = text

    // Avoid scrolling to bottom
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      var successful = document.execCommand('copy')
      var msg = successful ? 'successful' : 'unsuccessful'
      console.log('Fallback: Copying text command was ' + msg)
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err)
    }

    document.body.removeChild(textArea)
  }
  function copyTextToClipboard(text: any) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text)
      return
    }
    navigator.clipboard.writeText(text).then(
      function () {
        console.log('Async: Copying to clipboard was successful!')
      },
      function (err) {
        console.error('Async: Could not copy text: ', err)
      }
    )
    setHasCopiedLink(true)
  }

  // Elements

  const YourNextInterests = () => {
    return (
      <div className="rounded-lg bg-white bg-opacity-5 border border-white border-opacity-25 text-white">
        <div
          style={{ fontSize: calcRem(18) }}
          className="w-full tablet:flex text-center justify-center gap-1 font-semibold py-2 bg-white bg-opacity-25 rounded-t-lg"
        >
          Your upcoming interest
          <p className="opacity-50">(if you reinvest your interest)</p>
        </div>
        <div className="w-full px-6 py-6 gap-4 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4">
          <div className="bg-white bg-opacity-10 rounded-xl text-center justify-center border-2 border-white border-opacity-30">
            <div className="bg-white bg-opacity-20 rounded-t-lg py-2 font-semibold" style={{ fontSize: calcRem(22) }}>
              In 3 months
            </div>
            <div className="mx-auto my-auto py-4 text-center justify-center items-center h-full">
              <p className="font-bold" style={{ fontSize: calcRem(26) }}>
                {(depositedValue.toNumber() * ((100 + APR_PER_DEPOSIT_TYPE[0]) / 100) ** 3)
                  .toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })
                  .slice(0, -1)}
              </p>
              <p className="opacity-50" style={{ fontSize: calcRem(16) }}>
                (
                {/* {(
                  (depositedValue.toNumber() * ((100 + APR_PER_DEPOSIT_TYPE[0]) / 100) ** 3 -
                    depositedValue.toNumber()) /
                  3
                ).toFixed(1)} */}
                {(depositedValue.toNumber() * 0.1 * ((100 + APR_PER_DEPOSIT_TYPE[0]) / 100) ** 3)
                  .toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })
                  .slice(0, -1)}
                /month)
              </p>
            </div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-xl text-center justify-center border-2 border-white border-opacity-30">
            <div className="bg-white bg-opacity-20 rounded-t-lg py-2 font-semibold" style={{ fontSize: calcRem(22) }}>
              In 6 months
            </div>
            <div className="mx-auto my-auto py-4 text-center justify-center items-center h-full">
              <p className="font-bold" style={{ fontSize: calcRem(26) }}>
                {(depositedValue.toNumber() * ((100 + APR_PER_DEPOSIT_TYPE[0]) / 100) ** 6)
                  .toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })
                  .slice(0, -1)}
              </p>
              <p className="opacity-50" style={{ fontSize: calcRem(16) }}>
                (
                {/* {(
                  (depositedValue.toNumber() * ((100 + APR_PER_DEPOSIT_TYPE[0]) / 100) ** 6 -
                    depositedValue.toNumber()) /
                  6
                ).toFixed(1)} */}
                {(depositedValue.toNumber() * 0.1 * ((100 + APR_PER_DEPOSIT_TYPE[0]) / 100) ** 6)
                  .toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })
                  .slice(0, -1)}
                /month)
              </p>
            </div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-xl text-center justify-center border-2 border-white border-opacity-30">
            <div className="bg-white bg-opacity-20 rounded-t-lg py-2 font-semibold" style={{ fontSize: calcRem(22) }}>
              In 1 year
            </div>
            <div className="mx-auto my-auto py-4 text-center justify-center items-center h-full">
              <p className="font-bold" style={{ fontSize: calcRem(26) }}>
                {(depositedValue.toNumber() * ((100 + APR_PER_DEPOSIT_TYPE[0]) / 100) ** 12)
                  .toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })
                  .slice(0, -1)}
              </p>
              <p className="opacity-50" style={{ fontSize: calcRem(16) }}>
                (
                {/* {(
                  (depositedValue.toNumber() * ((100 + APR_PER_DEPOSIT_TYPE[0]) / 100) ** 12 -
                    depositedValue.toNumber()) /
                  12
                ).toFixed(1)} */}
                {(depositedValue.toNumber() * 0.1 * ((100 + APR_PER_DEPOSIT_TYPE[0]) / 100) ** 12)
                  .toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })
                  .slice(0, -1)}
                /month)
              </p>
            </div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-xl text-center justify-center border-2 border-white border-opacity-30">
            <div className="bg-white bg-opacity-20 rounded-t-lg py-2 font-semibold" style={{ fontSize: calcRem(22) }}>
              In 2 years
            </div>
            <div className="mx-auto my-auto py-4 text-center justify-center items-center h-full">
              <p className="font-bold" style={{ fontSize: calcRem(26) }}>
                {(depositedValue.toNumber() * ((100 + APR_PER_DEPOSIT_TYPE[0]) / 100) ** 24)
                  .toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })
                  .slice(0, -1)}
              </p>
              <p className="opacity-50" style={{ fontSize: calcRem(16) }}>
                (
                {/* {(
                  (depositedValue.toNumber() * ((100 + APR_PER_DEPOSIT_TYPE[0]) / 100) ** 24 -
                    depositedValue.toNumber()) /
                  24
                ).toFixed(1)} */}
                {(depositedValue.toNumber() * 0.1 * ((100 + APR_PER_DEPOSIT_TYPE[0]) / 100) ** 24)
                  .toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  })
                  .slice(0, -1)}
                /month)
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const AffiliationBlock = () => {
    return (
      <div className="rounded-lg bg-white bg-opacity-5 border border-white border-opacity-25 text-white">
        <div
          style={{ fontSize: calcRem(18) }}
          className="w-full tablet:flex text-center justify-center gap-1 font-semibold py-2 bg-white bg-opacity-25 rounded-t-lg"
        >
          Affiliation
          <p className="opacity-50">(get 30% of your affiliates&apos; first deposits!)</p>
        </div>
        <div className="px-6 w-full flex">
          <div
            style={{ height: calcRem(50) }}
            className="w-full flex justify-between bg-white bg-opacity-10 rounded-lg my-4"
          >
            <div
              style={{ height: calcRem(50), maxWidth: calcRem(900) }}
              className="pl-4 py-3 text-opacity-90 whitespace-nowrap overflow-ellipsis hidden laptop:flex"
            >
              {`${WEBAPP_LINK}/?ref=${account}`}
              {/* {`localhost:3000/?ref=${account}`} */}
            </div>
            <div
              style={{ height: calcRem(50), maxWidth: calcRem(900) }}
              className="pl-4 py-3 text-opacity-90 whitespace-nowrap overflow-ellipsis hidden tablet:flex laptop:hidden"
            >
              {`${WEBAPP_LINK}/?ref=${shortenedAccount(account)}`}
              {/* {`localhost:3000/?ref=${shortenedAccount(account)}`} */}
            </div>
            <div
              style={{ height: calcRem(50), maxWidth: calcRem(900) }}
              className="pl-4 py-3 text-opacity-90 whitespace-nowrap overflow-ellipsis tablet:hidden"
            >
              {`https://app...`}
              {/* {`localhost:3000/?ref=${veryShortenedAccount(account)}`} */}
            </div>
            <div
              style={{ height: calcRem(50), width: calcRem(130) }}
              className=" bg-blue-marine border-2 border-white border-opacity-50 cursor-pointer rounded-lg px-6 text-center py-3 font-semibold"
              // onClick={() => copyTextToClipboard(`localhost:3000/?ref=${account}`)}
              onClick={() => copyTextToClipboard(`${WEBAPP_LINK}/?ref=${account}`)}
            >
              {hasCopiedLink ? 'Copied!' : 'Copy'}
            </div>
          </div>
        </div>
        <div className="px-6 pb-4">
          To receive 30% of your referral’s first deposit, copy and send this link to your referral. For example: if
          your referral makes a first deposit of $10,000 through your affiliate link, you will receive $3,000 in
          commissions. Click{' '}
          <Link href={AFFI_DOCS_LINK} passHref>
            <a className="underline" target="_blank">here</a>
          </Link>{' '}
          for more information.
        </div>
      </div>
    )
  }

  return (
    <div
      className={classNames(
        'laptop:container mx-auto px-6 py-20 w-full grid grid-cols-1 gap-16 items-center justify-center',
        className
      )}
    >
      {depositedValue.toNumber() > 0 && <YourNextInterests />}
      {connected && depositedValue.toNumber() > 0 && <AffiliationBlock />}
      {/* <History /> */}
    </div>
  )
}
