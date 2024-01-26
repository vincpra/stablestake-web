import { NETWORK_ID } from "components/const/constants"
import { ChainId } from "./const"
import { web3 } from "./web3"

export const window_: any = typeof window !== 'undefined' ? window : undefined

export const hasWallet = () => {
  if (window_ == undefined) return false
  return window_.web3 || window_.ethereum
}

export const getAccounts = (): Promise<string[]> => {
  return window_.ethereum.request({ method: 'eth_accounts' })
}

export const requestAccounts = (): Promise<string[]> => {
  return window_.ethereum.request({ method: 'eth_requestAccounts' })
}

export async function getChainId(): Promise<ChainId | null> {
  const chainId_ = await window_.ethereum.request({ method: 'eth_chainId' })

  if (chainId_) {
    // Hex to base 10
    return parseInt(chainId_)
  } else {
    return null
  }
}

export const switchNetwork = async () => {
  await window_.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: `0x${NETWORK_ID.toString(16)}` }]
  })
}

export async function getBalance(address: string): Promise<number> {
  try {
    // const balance_ = await window_.ethereum.request({ method: 'eth_getBalance', params: [address] })
    const balance_ = await web3.eth.getBalance(address)

    if (balance_) {
      return parseFloat(web3.utils.fromWei(balance_))
    }
  } catch (error) {
    console.error('An error occurred when getting the user balance:', error)
  }

  return 0
}

// Chain ID change
export const onChainIdChanged = (newChainId: number) => {
  if (newChainId != NETWORK_ID) window.location.reload()
}

// Changing accounts
export const onAccountsChanged = (accounts: string[], setAccount: (account: string) => void) => {
  setAccount(accounts[0])
}