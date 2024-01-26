import BN, { BigSource } from 'big.js'

export const fromWei = (amount: BigSource): BN => {
  return BN(amount).div(BN(10).pow(18))
}
