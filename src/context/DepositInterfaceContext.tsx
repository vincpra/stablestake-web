import React, { useState, FC, createContext, useEffect, useContext, useCallback } from 'react'
import { useWalletContext } from './WalletContext'
import { useDepositsContext } from 'context/DepositsContext'
import { useRouter } from 'next/router'

export enum DepositErrors {
  D_NO_ERROR,
  D_TRANSACTION_ERROR
}
export enum ClaimErrors {
  C_NO_ERROR,
  C_TRANSACTION_ERROR
}

interface IDepositInterfaceContext {
  usdcAmount: string
  sponsor: string
  isCompounding: boolean
  isCashingOutRewards: boolean
  setUSDCAmount: (value: string) => void
  onChangeInputAmount: (event: any) => void
  cashoutAndCompoundAll: () => void
  cashoutAllDeposits: () => void
  compoundAffiliateRewards: () => void
  cashoutAllRewards: () => void
}

const DEFAULT_DEPOSIT_INTERFACE = {
  usdcAmount: '',
  sponsor: '0x0000000000000000000000000000000000000000',
  isCompounding: false,
  isCashingOutRewards: false,
  setUSDCAmount: () => {},
  onChangeInputAmount: () => {},
  cashoutAndCompoundAll: () => {},
  cashoutAllDeposits: () => {},
  compoundAffiliateRewards: () => {},
  cashoutAllRewards: () => {}
}

export const DepositInterfaceContext = createContext<IDepositInterfaceContext>(DEFAULT_DEPOSIT_INTERFACE)

export const DepositInterfaceProvider: FC = ({ children }) => {
  const window_: any = typeof window !== 'undefined' ? window : undefined

  const { D_NO_ERROR, D_TRANSACTION_ERROR } = DepositErrors
  const { C_NO_ERROR, C_TRANSACTION_ERROR } = ClaimErrors

  // Hooks
  const { account, balance, chainId, isGoodChainId } = useWalletContext()
  const { usdcContract, rewardsContract, availableRewards } = useDepositsContext()

  // User data
  const [usdcAmount, setUSDCAmount] = useState<string>('')
  const [sponsor, setSponsor] = useState<string>('0x0000000000000000000000000000000000000000')

  // Loading
  const [isCompounding, setIsCompounding] = useState<boolean>(false)
  const [isCashingOutRewards, setIsCashingOutRewards] = useState<boolean>(false)

  // Errors
  const [yourInterestError, setYourInterestError] = useState<ClaimErrors>()

  const USER_ALLOWANCE_REGEX = /^[0-9]*[\.|,]?[0-9]*$/

  const onChangeInputAmount = (event: any) => {
    const newInputAmount = event.target.value

    // Correct input
    if (newInputAmount.match(USER_ALLOWANCE_REGEX)) {
      // Replace commas with dots
      const formatted = newInputAmount.replace(',', '.')

      // Set balance
      setUSDCAmount(formatted)
    }

    // Wrong input: don't do anything
  }

  const router = useRouter()
  const Index = useCallback(async () => {
    const { ref } = router.query
    if (typeof ref == 'string') setSponsor(ref)
    return <div>{ref}</div>
  }, [router.query])

  useEffect(() => {
    Index()
  }, [Index])

  // On-chain functions

  const cashoutAndCompoundAll = async () => {
    if (chainId && isGoodChainId && rewardsContract) {
      try {
        setIsCompounding(true)

        await rewardsContract?.methods.cashoutAndCompoundAll().send({
          from: account
        })
      } catch (error: any) {
        console.error('An error occurred in cashoutAndCompoundAll():', error)
        if (!error.message.includes('User denied transaction signature.')) setYourInterestError(C_TRANSACTION_ERROR)
      } finally {
        setIsCompounding(false)
      }
    }
  }

  const cashoutAllDeposits = async () => {
    if (chainId && isGoodChainId && rewardsContract) {
      try {
        setIsCompounding(true)

        await rewardsContract?.methods.cashoutAllDeposits().send({
          from: account
        })
      } catch (error: any) {
        console.error('An error occurred in cashoutAllDeposits():', error)
        if (!error.message.includes('User denied transaction signature.')) setYourInterestError(C_TRANSACTION_ERROR)
      } finally {
        setIsCompounding(false)
      }
    }
  }

  const compoundAffiliateRewards = async () => {
    if (!window_.ethereum) return

    if (chainId && isGoodChainId && rewardsContract) {
      try {
        setIsCompounding(true)

        await rewardsContract?.methods.compoundAffiliateInterests().send({
          from: account
        })
      } catch (error: any) {
        console.error('An error occurred in compoundAffiliateInterests():', error)
        if (!error.message.includes('User denied transaction signature.')) setYourInterestError(C_TRANSACTION_ERROR)
      } finally {
        setIsCompounding(false)
      }
    }
  }

  const cashoutAllRewards = async () => {
    if (!window_.ethereum || availableRewards.eq(0)) return

    if (chainId && isGoodChainId && rewardsContract) {
      try {
        setIsCompounding(true)

        await rewardsContract?.methods.cashoutAllInterests().send({
          from: account
        })
      } catch (error: any) {
        console.error('An error occurred in cashoutAllInterests():', error)
        if (!error.message.includes('User denied transaction signature.')) setYourInterestError(C_TRANSACTION_ERROR)
      } finally {
        setIsCompounding(false)
      }
    }
  }

  return (
    <DepositInterfaceContext.Provider
      value={{
        usdcAmount,
        sponsor,
        isCompounding,
        isCashingOutRewards,
        setUSDCAmount,
        onChangeInputAmount,
        cashoutAndCompoundAll,
        cashoutAllDeposits,
        compoundAffiliateRewards,
        cashoutAllRewards
      }}
    >
      {children}
    </DepositInterfaceContext.Provider>
  )
}

export const useDepositInterfaceContext = () => useContext(DepositInterfaceContext)
