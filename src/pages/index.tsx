import Head from 'next/head'

import TopNav from '@/components/modules/TopNav'

export default function Home() {
  return (
    <>
      <Head>
        <title>NFT Social Media</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopNav />

      <div className='text-center text-5xl mt-10'>
        NFT Generation 
      </div>

      

    </>
  )
}
