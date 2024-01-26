import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import { DepositsProvider } from 'context/DepositsContext'
import { WalletProvider } from 'context/WalletContext'
import { useRouter } from 'next/dist/client/router'
import { DepositInterfaceProvider } from 'context/DepositInterfaceContext'

export const FB_PIXEL_ID = '2285157098305368'

function MyApp({ Component, pageProps }: AppProps) {
  // const router = useRouter()

  // useEffect(() => {
  //   import('react-facebook-pixel')
  //     .then((x) => x.default)
  //     .then((ReactPixel) => {
  //       ReactPixel.init(FB_PIXEL_ID) // facebookPixelId
  //       ReactPixel.pageView()

  //       router.events.on('routeChangeComplete', () => {
  //         ReactPixel.pageView()
  //       })
  //     })
  // }, [router.events])

  return (
    <WalletProvider>
      <DepositsProvider>
        <DepositInterfaceProvider>
          <Component {...pageProps} />
        </DepositInterfaceProvider>
      </DepositsProvider>
    </WalletProvider>
  )
}
export default MyApp
