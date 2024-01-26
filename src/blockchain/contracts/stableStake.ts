import { web3 } from '../web3'
import { AbiItem } from 'web3-utils'
import { ChainId } from '../const'
import rewardsContract from '../../abi/StableStake.json'
import MainnetContracts from '../mainnet.json'
import TestnetContracts from '../testnet.json'
import { StableStake } from '../../typechain/StableStake'

export const SS_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.BSC_MAINNET]: MainnetContracts.StableStake,
  [ChainId.BSC_TESTNET]: TestnetContracts.StableStake
}

export function getRewardsContract(chainId: ChainId): StableStake {
  return new web3.eth.Contract(rewardsContract.abi as AbiItem[], SS_ADDRESS[chainId]) as any
}
