import { sepolia } from '@wagmi/chains'
import { WagmiConfig, createClient, configureChains, } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
 
const { chains, provider, webSocketProvider } = configureChains(
  [sepolia],
  [publicProvider()],
)
 
const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <div className='min-h-screen dark:bg-light-black dark:text-white font-main'>
          <Component {...pageProps} />
      </div>
    </WagmiConfig>
  )
}
