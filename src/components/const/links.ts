import { ChainId } from 'blockchain/const'
import { USDC_ADDRESS } from 'blockchain/contracts/usdc'
import { NAME } from './constants'

export const PANCAKESWAP_LINK = `https://pancakeswap.finance/swap?outputCurrency=${USDC_ADDRESS[ChainId.BSC_MAINNET]}`
export const POOCOIN_LINK = `https://poocoin.app/tokens/${USDC_ADDRESS[ChainId.BSC_MAINNET]}`
export const METAMASK_LINK = 'https://metamask.io'
export const WEBAPP_LINK = `https://${NAME.toLowerCase()}.xyz`
export const WEBSITE_LINK = `https://${NAME.toLowerCase()}.xyz`
export const SWAP_LINK = `https://app.${NAME.toLowerCase()}.xyz/swap`
export const DISCLAIMER_LINK = `https://${NAME.toLowerCase()}.xyz/`
export const DOCS_LINK = `https://docs.${NAME.toLowerCase()}.xyz/`
export const WEB_DOCS_LINK = `http://www.${NAME.toLowerCase()}.xyz/documentation`
export const AFFI_DOCS_LINK = `https://www.${NAME.toLowerCase()}.xyz/affiliation`
export const DISCORD_LINK = `https://discord.gg/${NAME.toLowerCase()}`
export const TELEGRAM_LINK = `https://t.me/${NAME.toLowerCase()}xyz`
export const TWITTER_LINK = `https://twitter.com/${NAME.toLowerCase()}xyz`
export const FACEBOOK_LINK = `https://www.facebook.com/${NAME.toLowerCase()}xyz`
export const INSTAGRAM_LINK = `https://www.instagram.com/${NAME.toLowerCase()}xyz/`
