import classNames from 'classnames'
import {
  EIGHTEEN_ZEROES,
  MAX_DEPOSIT_SIZE,
  MAX_FIRST_DEPOSIT_SIZE,
  MAX_UINT256,
  MILLION_18_DECIMALS,
  MIN_DEPOSIT_SIZE,
} from 'components/const/constants'
import React, { useCallback, useEffect, useState } from 'react'
import AriaModal from 'react-aria-modal'
import { calcRem } from 'utils/styles'
import { SS_ADDRESS } from 'blockchain/contracts/stableStake'
import BN from 'big.js'
import { IoMdClose } from 'react-icons/io'
import Link from 'next/link'
import { useDepositsContext } from 'context/DepositsContext'
import { useWalletContext } from 'context/WalletContext'
import { useDepositInterfaceContext } from 'context/DepositInterfaceContext'
import { TOKEN_SYMBOL } from '../../const/constants'
import { DISCLAIMER_LINK } from '../../const/links'
import { Checkbox } from 'components/Checkbox'

interface DepositModalProps {
  className?: string
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
}

enum DepositModalError {
  NO_ERROR,
  DISCLAIMER_NOT_READ,
  BALANCE_TOO_LOW,
  WALLET_NOT_CONNECTED,
  FIRST_DEPOSIT_SIZE_LIMIT,
  DEPOSIT_SIZE_LIMIT,
  DEPOSIT_SIZE_THRESHOLD,
  TRANSACTION_ERROR
}

export const DepositModal = ({ className, isModalOpen, setIsModalOpen }: DepositModalProps) => {
  const {
    NO_ERROR,
    DISCLAIMER_NOT_READ,
    BALANCE_TOO_LOW,
    WALLET_NOT_CONNECTED,
    FIRST_DEPOSIT_SIZE_LIMIT,
    DEPOSIT_SIZE_LIMIT,
    DEPOSIT_SIZE_THRESHOLD,
    TRANSACTION_ERROR
  } = DepositModalError

  const [isApproved, setIsApproved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isBalanceTooLow, setIsBalanceTooLow] = useState(false)
  const [isChecked, setIsChecked] = useState(true)
  const [modalError, setModalError] = useState<DepositModalError>(NO_ERROR)

  const { account, chainId } = useWalletContext()
  const { deposits, usdcBalance, usdcContract, rewardsContract } = useDepositsContext()
  const { usdcAmount, sponsor, setUSDCAmount, onChangeInputAmount } = useDepositInterfaceContext()

  const approveUsdc = async () => {
    if (!account || !chainId || !usdcContract) {
      // TODO: Ask user to connect wallet
    } else {
      try {
        setModalError(NO_ERROR)
        setIsLoading(true)
        await usdcContract.methods.approve(SS_ADDRESS[chainId], MAX_UINT256).send({
          from: account
        })
        setIsApproved(true)
      } catch (error: any) {
        console.error('An error occurred in approveCard():', error)
        if (!error.message.includes('User denied transaction signature.')) setModalError(TRANSACTION_ERROR)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const modalErrorAsString = (): string => {
    switch (modalError) {
      case NO_ERROR:
        return ''
      case DISCLAIMER_NOT_READ:
        return 'Please read the disclaimer before making a deposit.'
      case BALANCE_TOO_LOW:
        return 'Your USDT balance is too low to make a deposit of this size.'
      case WALLET_NOT_CONNECTED:
        return 'Please connect your wallet.'
      case FIRST_DEPOSIT_SIZE_LIMIT:
        return `For security reasons, your first deposit is limited to ${MAX_FIRST_DEPOSIT_SIZE.toLocaleString(
          'en-US',
          {
            style: 'currency',
            currency: 'USD'
          }
        )} USDT. If you want to deposit more, make a second deposit. After the first deposit there is no deposit limit anymore.`
      case DEPOSIT_SIZE_LIMIT:
        return `Deposit size cannot exceed ${MAX_DEPOSIT_SIZE.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })} USDT.`
      case DEPOSIT_SIZE_THRESHOLD:
        return `Deposit size should be above ${MIN_DEPOSIT_SIZE.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })} USDT.`
      case TRANSACTION_ERROR:
        return 'An error occurred when creating your deposit. Please try again.'
    }
  }

  // Returns an error in the modal, if there is one
  const modalErrorHandling = (): DepositModalError => {
    if (!account || !chainId || !rewardsContract) return WALLET_NOT_CONNECTED
    if (isBalanceTooLow) return BALANCE_TOO_LOW
    if (parseFloat(usdcAmount) > 0 && parseFloat(usdcAmount) < MIN_DEPOSIT_SIZE) return DEPOSIT_SIZE_THRESHOLD
    if (deposits.length == 0 && parseFloat(usdcAmount) > MAX_FIRST_DEPOSIT_SIZE) {
      return FIRST_DEPOSIT_SIZE_LIMIT
    } else if (parseFloat(usdcAmount) > MAX_DEPOSIT_SIZE) {
      return DEPOSIT_SIZE_LIMIT
    }
    return NO_ERROR
  }

  const createDeposit = async () => {
    const modalError = modalErrorHandling()
    if (modalError) {
      setModalError(modalError)
      return
    }

    try {
      setModalError(NO_ERROR)
      setIsLoading(true)

      await rewardsContract?.methods.createDepositWithTokens(`${usdcAmount}${EIGHTEEN_ZEROES}`, 0, sponsor).send({
        from: account
      })

      setIsModalOpen(false)
    } catch (error: any) {
      console.error('An error occurred in createDeposit():', error)
      if (!error.message.includes('User denied transaction signature.')) setModalError(TRANSACTION_ERROR)
    } finally {
      setIsLoading(false)
    }
  }

  const getApprovalStatus = useCallback(async () => {
    if (!account || !chainId || !usdcContract) return
    try {
      const allowance = BN(await usdcContract.methods.allowance(account, SS_ADDRESS[chainId]).call())
      setIsApproved(allowance.gt(MILLION_18_DECIMALS))
    } catch (error: any) {
      console.error('An error occurred in getApprovalStatus():', error)
    }
  }, [account, chainId, usdcContract])

  useEffect(() => {
    const isBalanceTooLow_ = parseFloat(usdcBalance.toString()) < parseFloat(usdcAmount)
    setIsBalanceTooLow(isBalanceTooLow_)
    if (modalError == BALANCE_TOO_LOW || modalError == NO_ERROR)
      setModalError(isBalanceTooLow_ ? BALANCE_TOO_LOW : NO_ERROR)
  }, [usdcBalance, modalError, BALANCE_TOO_LOW, NO_ERROR, usdcAmount])

  useEffect(() => {
    getApprovalStatus()
  }, [getApprovalStatus])

  // As reference - TODO: Delete
  // const DepositButton = () => {
  //   return (
  //     <div
  //       style={{ height: calcRem(56) }}
  //       className="w-full cursor-pointer flex rounded-xl bg-green"
  //       onClick={() => setIsModalOpen(true)}
  //     >
  //       <div className="bg-green-dark rounded-l-xl py-5 px-5">
  //         <img style={{ height: calcRem(20), width: calcRem(34) }} src="/icons/deposit-icon.png" alt="Deposit"></img>
  //       </div>
  //       <div style={{ fontSize: calcRem(19) }} className="flex w-full space-x-1 mx-auto justify-center items-center">
  //         Deposit
  //       </div>
  //       <div className="tablet:hidden py-5 px-5">
  //         <img
  //           style={{ height: calcRem(20), width: calcRem(34), opacity: 0 }}
  //           src="/icons/deposit-icon.png"
  //           alt="Deposit"
  //         ></img>
  //       </div>
  //     </div>
  //   )
  // }

  const ApproveButton = () => {
    return (
      <button
        onClick={() => isChecked && approveUsdc()}
        className={classNames(
          'flex whitespace-nowrap text-center items-center rounded-md w-1/2 tablet:w-auto px-6 my-auto font-semibold text-white text-opacity-100 tablet:mr-2 justify-center',
          isChecked ? 'bg-green hover:bg-opacity-90 cursor-pointer duration-300' : 'bg-red-error cursor-not-allowed'
        )}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center">
            <p className="my-2 mr-3 text-white">Approving...</p>
            <div
              style={{ borderTopColor: 'transparent', width: calcRem(20), height: calcRem(20) }}
              className="border-2 rounded-full animate-spin"
            ></div>
          </div>
        ) : (
          <p className="my-2 text-white">Approve</p>
        )}
      </button>
    )
  }

  // // As reference - TODO: Delete
  // const WithdrawButton = () => {
  //   return (
  //     <div
  //       style={{ height: calcRem(56) }}
  //       className="w-full cursor-pointer tablet:w-2/5 flex rounded-xl opacity-70 border border-white border-opacity-40 bg-black bg-opacity-5"
  //     >
  //       <div
  //         style={{ fontSize: calcRem(19) }}
  //         className="flex w-full pl-4 space-x-1 mx-auto px-2 justify-center items-center"
  //       >
  //         Withdraw
  //       </div>
  //     </div>
  //   )
  // }

  const MakeDepositButton = () => {
    return isApproved ? (
      <button
        onClick={() => isChecked && createDeposit()}
        className={classNames(
          'flex justify-center whitespace-nowrap text-center items-center rounded-md w-1/2 tablet:w-auto px-6 my-auto font-semibold mr-2',
          !isBalanceTooLow
            ? isChecked
              ? 'bg-green text-white border-2 border-green border-opacity-50'
              : 'bg-red-error cursor-not-allowed'
            : 'bg-red-error text-white cursor-not-allowed'
        )}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center">
            <p className="my-2 mr-3 laptop:hidden">Creating...</p>
            <p className="my-2 mr-3 hidden laptop:flex">Creating deposit...</p>
            <div
              style={{ borderTopColor: 'transparent', width: calcRem(20), height: calcRem(20) }}
              className="border-2 rounded-full animate-spin"
            ></div>
          </div>
        ) : (
          <p className="my-2">Create deposit</p>
        )}
      </button>
    ) : (
      <button
        onClick={() => createDeposit()}
        className={classNames(
          'hover:cursor-not-allowed button-transition flex justify-center text-center items-center rounded-md w-1/2 tablet:w-auto px-6 my-auto font-semibold button-blue-border text-white mr-2'
        )}
        disabled
      >
        <p className="my-2 whitespace-nowrap">Make deposit</p>
      </button>
    )
  }

  return (
    <div className={classNames(className)}>
      {isModalOpen ? (
        <AriaModal
          titleText="Make a deposit"
          underlayClickExits={false}
          onExit={() => setIsModalOpen(false)}
          initialFocus="#top"
        >
          {/* // TODO: Remove double <div> */}
          <div
            id="top"
            className="modal-animation left-0 top-0 w-full desktop:flex desktop:justify-center desktop:content-center desktop:overflow-y-auto desktop:overflow-x-hidden"
          >
            <div
              className="rounded-md bg-blue-marine border-4 border-gray border-opacity-50 laptop:mt-16 desktop:mt-22 pt-10"
              style={{ maxWidth: calcRem(800) }}
            >
              <div className="px-12 flex flex-col items-center">
                <div className="flex justify-between items-center mb-12 w-full">
                  <div>
                    <a style={{ fontSize: calcRem(18) }}>
                      <IoMdClose size="30" className="opacity-0 transition-all duration-300 text-white" />
                    </a>
                  </div>
                  <div className="w-full justify-center text-center">
                    <h2
                      className="font-extrabold justify-center text-center text-white"
                      style={{ fontSize: calcRem(26), lineHeight: calcRem(32) }}
                    >
                      Make a new deposit
                    </h2>
                  </div>
                  <div>
                    <a
                      className="cursor-pointer"
                      style={{ fontSize: calcRem(18) }}
                      onClick={() => setIsModalOpen(false)}
                    >
                      <IoMdClose size="30" className="hover:opacity-70 transition-all duration-300 text-white" />
                    </a>
                  </div>
                </div>
                <div className="w-full laptop:w-2/3 text-right text-white justify-end">
                  Balance: {parseFloat(usdcBalance.toString()).toFixed(2)} ${TOKEN_SYMBOL}
                </div>
                <div
                  className="flex w-full laptop:w-2/3 mt-2 mb-2 px-2 rounded-lg bg-white bg-opacity-20 justify-between gap-4"
                  style={{ height: calcRem(55) }}
                >
                  <div className="flex justify-between items-center w-full font-semibold">
                    <input
                      className="outline-none pl-2 bg-none w-full text-white ss-input"
                      value={usdcAmount}
                      placeholder="0.0"
                      onChange={onChangeInputAmount}
                    />
                    <p
                      className="cursor-pointer text-white pr-2"
                      onClick={() => setUSDCAmount(usdcBalance.toFixed(0).toString())}
                    >
                      MAX
                    </p>
                  </div>
                </div>

                {modalError != NO_ERROR && (
                  <p
                    className="text-red-error mt-2 mb-4 w-full laptop:w-2/3 font-semibold text-center"
                    style={{ fontSize: calcRem(14) }}
                  >
                    {modalErrorAsString()}
                  </p>
                )}
              </div>
              <div
                className={classNames(
                  'flex flex-col tablet:flex-row justify-between w-full laptop:w-3/4 py-8 mx-auto px-12 items-center tablet:space-x-4'
                )}
              >
                <div className="flex space-x-2 items-center">
                  {/* <div
                    className="flex justify-center items-center border-2 rounded-md border-blue hover:border-blue-light hover:border-opacity-70 bg-white"
                    style={{ minWidth: calcRem(22), minHeight: calcRem(22) }}
                  >
                    <input
                      type="checkbox"
                      className="opacity-0 w-full absolute"
                      style={{ width: calcRem(22), height: calcRem(22) }}
                      onChange={onCheck}
                    />
                    <Check
                      className={classNames('text-blue fill-current', isChecked ? 'flex' : 'hidden')}
                      style={{ width: calcRem(12), height: calcRem(12) }}
                    />
                  </div> */}
                  <div style={{ width: calcRem(20) }} onClick={() => setIsChecked(!isChecked)}>
                    <Checkbox isChecked={isChecked} />
                  </div>
                  <div className="disclaimer-text inline-block text-white" style={{ fontSize: calcRem(14) }}>
                    By making a deposit, you acknowledge that you have read the{' '}
                    <Link href={DISCLAIMER_LINK} passHref>
                      <a className="font-bold underline text-cyan-light" target="_blank">
                        informations
                      </a>
                    </Link>{' '}
                    and wish to continue.
                  </div>
                </div>
                <div className="flex w-full tablet:w-auto space-x-2 mt-4 tablet:mt-0">
                  {!isApproved && <ApproveButton />}
                  <MakeDepositButton />
                </div>
              </div>
            </div>
          </div>
        </AriaModal>
      ) : (
        false
      )}
      <style jsx>{`
        .modal-animation {
          animation: showModal ease 0.3s;
        }

        @keyframes showModal {
          0% {
            opacity: 0;
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: 0;
          }
        }
        .ss-input {
          background-color: rgba(0, 0, 0, 0);
        }

         @media (max-width: 640px) {
          .disclaimer {
            width: 78vw;
          }

          .disclaimer-text {
            width: ${calcRem(6000)};
          }
      `}</style>
    </div>
  )
}
