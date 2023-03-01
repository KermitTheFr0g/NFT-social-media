import { FC } from "react";
import Head from 'next/head';

import TopNav from "@/components/modules/TopNav";
import WalletButton from '@/components/WalletButton';

const ConnecWallet:FC = () => {
    return (
        <>
            <Head>
                <title>Connect Wallet</title>
            </Head>
            
            <TopNav />

            <div className="block mr-auto ml-auto">
                <WalletButton />
            </div>
        </>
    )
}

export default ConnecWallet;