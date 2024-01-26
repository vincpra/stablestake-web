import React, { useState, FC, createContext, useEffect, useContext, useCallback } from 'react'
import BN from 'big.js'
import { ChainId } from 'blockchain/const'
import { getRewardsContract } from 'blockchain/contracts/stableStake'
import { getUSDCContract } from 'blockchain/contracts/usdc'
import { Rewards } from 'typechain/Rewards'
import { useWalletContext } from './WalletContext'
import { IERC20 } from 'typechain/IERC20'
import { useRouter } from 'next/router'

export interface Deposit {
  id: number
  creationTime: string
  reward: number
  lastClaim: string
  untilNextClaim: string
  depositSize: string
  type: number
}

interface IDepositsContext {
  deposits: Deposit[]
  usdcBalance: number
  depositedValue: BN
  affiliateCount: number
  affiliateRewardsAvailability: boolean
  depositCount: number
  nextRewards: BN
  nextTimeUntilReward: BN
  accountCreationTime: BN
  isAccountUnlocked: boolean
  totalDepositsCreated: string
  availableRewards: BN
  affiliateRewardsAvailabile: BN
  usdcContract: IERC20 | null
  rewardsContract: Rewards | null
  isLoadingDeposits: boolean
  hasFetchedDeposits: boolean
  sponsor: string
}

const DEFAULT_DEPOSITS = {
  deposits: [],
  usdcBalance: 0,
  depositedValue: BN(0),
  affiliateCount: 0,
  affiliateRewardsAvailability: false,
  depositCount: 0,
  nextRewards: BN(0),
  nextTimeUntilReward: BN(0),
  accountCreationTime: BN(0),
  isAccountUnlocked: false,
  totalDepositsCreated: '',
  availableRewards: BN(0),
  affiliateRewardsAvailabile: BN(0),
  usdcContract: null,
  rewardsContract: null,
  isLoadingDeposits: false,
  hasFetchedDeposits: false,
  sponsor: '0x0000000000000000000000000000000000000000'
}

export const DepositsContext = createContext<IDepositsContext>(DEFAULT_DEPOSITS)

export const DepositsProvider: FC = ({ children }) => {
  // Hooks
  const { account, balance, chainId, isGoodChainId } = useWalletContext()

  // Contracts
  const [usdcContract, setUSDCContract] = useState<IERC20 | null>(null)
  const [rewardsContract, setRewardsContract] = useState<Rewards | null>(null)

  // User data
  const [usdcBalance, setUSDCBalance] = useState(0)
  const [sponsor, setSponsor] = useState<string>('0x0000000000000000000000000000000000000000')
  const [accountCreationTime, setAccountCreationTime] = useState<BN>(BN(0))
  const [isAccountUnlocked, setIsAccountUnlocked] = useState<boolean>(true)

  // Related to deposits
  const [deposits, setDeposits] = useState<Deposit[]>([])
  const [depositedValue, setDepositedValue] = useState<BN>(BN(0))
  const [depositCount, setDepositCount] = useState<number>(0)

  // Related to interests
  const [availableRewards, setAvailableRewards] = useState<BN>(BN(0))
  const [affiliateRewardsAvailabile, setAffiliateRewardsAvailable] = useState<BN>(BN(0))
  const [affiliateRewardsAvailability, setAffiliateRewardsAvailability] = useState<boolean>(false)
  const [affiliateCount, setAffiliateCount] = useState<number>(0)

  // Related to next interests
  const [nextRewards, setNextRewards] = useState<BN>(BN(0))
  const [nextTimeUntilReward, setNextTimeUntilReward] = useState<BN>(BN(0))

  // Internal
  const [isLoadingDeposits, setIsLoadingDeposits] = useState<boolean>(true)
  const [hasFetchedDeposits, setHasFetchedDeposits] = useState<boolean>(false)

  // Global data
  const [totalDepositsCreated, setTotalDepositsCreated] = useState<string>('0')

  const fetchBalance = useCallback(async () => {
    if (chainId && usdcContract && rewardsContract) {
      const bal = await usdcContract.methods.balanceOf(account).call()
      setUSDCBalance(parseFloat(bal) / 1e18)
    }
  }, [account, chainId, rewardsContract, usdcContract])

  useEffect(() => {
    fetchBalance()
  }, [fetchBalance])

  const fetchDeposits = useCallback(async () => {
    if (chainId && usdcContract && rewardsContract) {
      try {
        setIsLoadingDeposits(true)

        const results = await Promise.all([
          // 0
          rewardsContract.methods.getAccountDepositedValue(account).call(),
          // 1
          usdcContract.methods.balanceOf(account).call(),
          // 2
          rewardsContract.methods.getAccountInterestAvailable(account).call(), // OK

          // Related to affiliates
          // 3
          rewardsContract.methods.getAffiliateInterestsAvailability(account).call(),
          // 4
          rewardsContract.methods.getAffiliateInterestsAvailable(account).call(),
          // 5
          rewardsContract.methods.getAffiliateCount(account).call(),

          // 6
          rewardsContract.methods.getAccountInterestAvailableAsArray(account).call(),
          // 7
          rewardsContract.methods.getAccountLastClaimTimes(account).call(),
          // 8
          rewardsContract.methods.getAccountCreationTimes(account).call(),
          // 9
          rewardsContract.methods.getAccountTypes(account).call()
        ])

        const resultsBis = await Promise.all([
          // 10
          rewardsContract.methods.getAccountNextInterestTimes(account).call(),
          // 11
          rewardsContract.methods.getAccountDepositSizes(account).call(),
          // 12
          // rewardsContract.methods.getTimeUntilAccountUnlockTime(account).call()
        ])

        console.log('Promise results:', results)
        console.log('Promise resultsBis:', resultsBis)

        setUSDCBalance(parseFloat(results[1]) / 1e18)
        // setUSDCBalance(parseFloat(results[0]) / 1000000)

        setDepositedValue(BN(parseFloat(results[0]) / 1e18))
        setAvailableRewards(BN(parseFloat(results[2]) / 1e18))

        setAffiliateRewardsAvailability(results[3])
        setAffiliateRewardsAvailable(BN(parseFloat(results[4]) / 1e18))
        setAffiliateCount(parseFloat(results[5]))

        const availableRewards_ = results[6]
        const lastClaimTimes = results[7]
        const creationTimes = results[8]
        const depositTypes = results[9]
        const untilNextClaimTimes = resultsBis[0]
        const depositSizes = resultsBis[1]

        const newDeposits = [...availableRewards_.keys()].map((i) => {
          return {
            id: i,
            creationTime: creationTimes[i],
            reward: +availableRewards_[i],
            lastClaim: lastClaimTimes[i],
            untilNextClaim: untilNextClaimTimes[i],
            depositSize: depositSizes[i],
            type: +depositTypes[i]
          }
        })

        setDeposits(newDeposits)
        setDepositCount(newDeposits.length ?? 0)

        // Test
        // setIsAccountUnlocked(newDeposits.length > 0 && parseFloat(resultsBis[2]) == 0)

        setHasFetchedDeposits(true)
      } catch (error: any) {
        console.error('An error occurred in fetchDeposits():', error)
      } finally {
        setIsLoadingDeposits(false)
      }
    }
  }, [account, chainId, rewardsContract, usdcContract])

  useEffect(() => {
    if (isGoodChainId) fetchDeposits()
  }, [isGoodChainId, fetchDeposits])

  const fetchTotalDepositsCreated = useCallback(async (rewardsContrct: Rewards | null) => {
    if (rewardsContrct) {
      setTotalDepositsCreated(await rewardsContrct.methods.getTotalDepositsCreated().call())
    }
  }, [])

  // Update next reward data
  const fetchNextRewardData = useCallback(async () => {
    if (chainId && usdcContract && rewardsContract) {
      try {
        if (deposits.length > 0 && rewardsContract) {
          const results2 = await rewardsContract.methods.getDepositCreationTime(account, '0').call() // TODO: Implement
          setAccountCreationTime(BN(parseFloat(results2))) // TODO: check

          const nextTimesUntilReward = []
          const depositSizes = []

          for (let i = 0; i < deposits.length; i++) {
            nextTimesUntilReward[i] = parseFloat(deposits[i].untilNextClaim)
            depositSizes[i] = parseFloat(deposits[i].depositSize)
          }

          const nextTime = Math.min(...nextTimesUntilReward)
          const nextTimeIndex = nextTimesUntilReward.indexOf(nextTime)

          setNextRewards(BN(parseFloat(deposits[nextTimeIndex].depositSize) / 1e18))
          setNextTimeUntilReward(BN(parseFloat(deposits[nextTimeIndex].untilNextClaim)))
        }
      } catch (error: any) {
        console.error('An error occurred in fetchNextRewardData():', error)
      } finally {
      }
    }
  }, [account, chainId, deposits, rewardsContract, usdcContract])

  useEffect(() => {
    if (isGoodChainId) fetchNextRewardData()
  }, [isGoodChainId, fetchNextRewardData])

  // Update contracts
  useEffect(() => {
    if (isGoodChainId) {
      const newUSDCContract = getUSDCContract(chainId as ChainId)
      const newRewardsContract = getRewardsContract(chainId as ChainId)

      setUSDCContract(newUSDCContract)
      setRewardsContract(newRewardsContract)

      fetchTotalDepositsCreated(newRewardsContract)
    }
  }, [chainId, isGoodChainId, fetchTotalDepositsCreated, balance]) // Balance is here so we refresh the USDC balance after a swap

  // TODO: Check Sponsor GET method using NextJS router

  const router = useRouter()
  const Index = useCallback(async () => {
    const { ref } = router.query
    if (typeof ref == 'string') setSponsor(ref)
    return <div>{ref}</div>
  }, [router.query])

  useEffect(() => {
    Index()
  }, [Index])

  return (
    <DepositsContext.Provider
      value={{
        deposits,
        depositedValue,
        affiliateCount,
        affiliateRewardsAvailability,
        usdcBalance,
        depositCount,
        nextRewards,
        nextTimeUntilReward,
        accountCreationTime,
        isAccountUnlocked,
        totalDepositsCreated,
        availableRewards,
        affiliateRewardsAvailabile,
        usdcContract,
        rewardsContract,
        isLoadingDeposits,
        hasFetchedDeposits,
        sponsor
      }}
    >
      {children}
    </DepositsContext.Provider>
  )
}

export const useDepositsContext = () => useContext(DepositsContext)
