export enum ChainId {
  BSC_MAINNET = 56,
  BSC_TESTNET = 97
}

export const PROVIDER: { [chainId in ChainId]: string } = {
  [ChainId.BSC_MAINNET]: 'https://bsc-dataseed1.binance.org',
  // [ChainId.BSC_TESTNET]: 'https://bsctestapi.terminet.io/rpc	' //old: https://data-seed-prebsc-1-s1.binance.org:8545 (upgraded with moralis speedynode provider)
  [ChainId.BSC_TESTNET]: 'https://data-seed-prebsc-1-s1.binance.org:8545' //old: https://data-seed-prebsc-1-s1.binance.org:8545 (upgraded with moralis speedynode provider)
}
