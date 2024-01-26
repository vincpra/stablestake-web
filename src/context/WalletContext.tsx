import { ChainId } from 'blockchain/const'
import { getAccounts, getBalance, getChainId, hasWallet, onAccountsChanged, onChainIdChanged, requestAccounts, window_ } from 'blockchain/wallet'
import { NETWORK_ID } from 'components/const/constants'
import { useInterval } from 'hooks/useInterval'
import React, { useState, FC, createContext, useEffect, useContext } from 'react'

interface IWalletContext {
  hasWallet: boolean
  connected: boolean
  chainId: ChainId | null
  isGoodChainId: boolean
  account: string
  balance: number | null
  requestConnection: () => void
}

const DEFAULT_WALLET = {
  hasWallet: false,
  connected: false,
  chainId: null,
  isGoodChainId: false,
  account: '',
  balance: null,
  requestConnection: () => {}
}

export const WalletContext = createContext<IWalletContext>(DEFAULT_WALLET)

export const WalletProvider: FC = ({ children }) => {
  const [chainId, setChainId] = useState<ChainId | null>(null)
  const [isGoodChainId, setIsGoodChainId] = useState(false)
  const [account, setAccount] = useState<string>('')
  const [connected, setConnected] = useState<boolean>(false)
  const [balance, setBalance] = useState<number>(0)

  const connectAccount = (accounts: string[], balance: number, chainId: ChainId | null) => {
    if (accounts.length > 0 && chainId) {
      setAccount(accounts[0])
      setChainId(chainId)
      setIsGoodChainId(chainId !== null && chainId == NETWORK_ID)
      setConnected(true)
      setBalance(balance)
    } else setIsGoodChainId(false)
  }

  useEffect(() => {
    if (window_.ethereum) {
      const chainIdListener = (newChainId: number) => onChainIdChanged(newChainId)
      const accountsListener = (accounts: string[]) => onAccountsChanged(accounts, setAccount)

      window_.ethereum.on('chainChanged', chainIdListener)
      window_.ethereum.on('accountsChanged', accountsListener)

      return () => {
        window_.ethereum.removeListener('chainChanged', chainIdListener)
        window_.ethereum.removeListener('accountsChanged', accountsListener)
      }
    }
  }, [])

  // TODO: No memory leaks here?
  useInterval({
    callback: async () => {
      if (window_.ethereum) {
        // If the chain changed
        const currentChainId = await getChainId()
        if (currentChainId !== chainId) {
          connectAccount(await getAccounts(), balance, currentChainId)
        }

        // If the balance changed
        if (connected) {
          const currentBalance = await getBalance(account)
          if (currentBalance !== balance) {
            setBalance(currentBalance)
          }
        }

        // If the user disconnected
        if (connected && hasWallet() && (await getAccounts()).length === 0) {
          setConnected(false)
          setAccount('')
        }
      }
    },
    delay: 500,
    leading: true
  })

  async function requestConnection() {
    if (!connected) {
      const [accounts, chainId] = await Promise.all([requestAccounts(), getChainId()])
      const balance = accounts ? await getBalance(accounts[0]) : 0
      connectAccount(accounts, balance, chainId)
    }
  }

  return (
    <WalletContext.Provider
      value={{
        hasWallet: hasWallet(),
        connected,
        chainId,
        isGoodChainId,
        account,
        balance,
        requestConnection
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWalletContext = () => useContext(WalletContext)
