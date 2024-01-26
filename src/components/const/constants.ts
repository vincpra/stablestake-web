export const IS_MAINNET = false
export const IS_PAUSED = false

export const NETWORK_NAME = `${IS_MAINNET ? 'BSC Mainnet' : 'BSC Testnet'}`
export const TOKEN_SYMBOL = `${IS_MAINNET ? 'USDC' : 'TOKEN'}`
export const NETWORK_ID = IS_MAINNET ? 56 : 97
export const NAME = 'StableStake'
export const GAS_LIMIT = 2245300
export const SHOW_BACKGROUND = false
export const MAX_UINT256 = '115792089237316195423570985008687907853269984665640564039457584007913129639935'
export const MILLION_18_DECIMALS = '1000000000000000000000000'
export const SIX_ZEROES = '000000'
export const EIGHTEEN_ZEROES = '000000000000000000'

// Reward interval per deposit type. We store it here to avoid unnecessary latency
export const REWARD_INTERVAL_PER_DEPOSIT_TYPE = [2592000]
export const DEPOSIT_LOCK_TIME_PER_DEPOSIT_TYPE = [2592000]

// Min/max deposit sizes. We store them here to avoid unnecessary latency
export const MIN_DEPOSIT_SIZE = 50
export const MAX_FIRST_DEPOSIT_SIZE = 10000
export const MAX_DEPOSIT_SIZE = 100000

// Monthly ROI (%) per deposit type
export const APR_PER_DEPOSIT_TYPE = [10]
