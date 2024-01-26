import { web3 } from '../web3'
import { AbiItem } from 'web3-utils'
import { ChainId } from '../const'
import usdcContract from '../../abi/IERC20.json'
import MainnetContracts from '../mainnet.json'
import TestnetContracts from '../testnet.json'
import { IERC20 } from '../../typechain/IERC20'

export const USDC_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.BSC_MAINNET]: MainnetContracts.USDC,
  [ChainId.BSC_TESTNET]: TestnetContracts.USDC
}

export function getUSDCContract(chainId: ChainId): IERC20 {
  return new web3.eth.Contract(usdcContract.abi as AbiItem[], USDC_ADDRESS[chainId]) as any
}
