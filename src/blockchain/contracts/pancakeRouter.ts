import { web3 } from '../web3'
import { AbiItem } from 'web3-utils'
import { ChainId } from '../const'
import pancakeRouterContract from './../../abi/PancakeRouter.json'
import { PancakeRouter } from 'typechain/PancakeRouter'

export const WBNB: { [chainId in ChainId]: string } = {
  [ChainId.BSC_MAINNET]: '',
  [ChainId.BSC_TESTNET]: '0xae13d989dac2f0debff460ac112a837c89baa7cd'
}

export const PANCAKE_ROUTER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.BSC_MAINNET]: '',
  [ChainId.BSC_TESTNET]: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3'
}

export function getPancakeRouterContract(chainId: ChainId): PancakeRouter {
  return new web3.eth.Contract(pancakeRouterContract as AbiItem[], PANCAKE_ROUTER_ADDRESS[chainId]) as any
}
