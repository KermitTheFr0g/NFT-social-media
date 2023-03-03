import { FC } from "react";
import Router, { useRouter } from 'next/router';
import { useState, useEffect } from "react";

import Head from 'next/head';

import { useAccount } from "wagmi";

import TopNav from "@/components/modules/TopNav";
import WalletButton from '@/components/WalletButton';

const ConnecWallet:FC = () => {
    const { address, isConnected } = useAccount();
    const router = useRouter();

    useEffect(() => {
        if(address){
            Router.push(`/user/profile/${address}`);
        }
    }, [address])

    return (
        <>
            <Head>
                <title>Connect Wallet</title>
            </Head>

            <TopNav />
            
            <div className="text-center text-5xl p-10 hover:cursor-default">
                Connect Wallet
            </div>
            
            <div className="flex flex-col m-auto justify-center w-1/3 rounded-xl p-10 bg-top-nav">
                <div className="text-xl text-center m-auto">
                    You currently don't have a wallet connected!
                </div>
                <p className="p-3">
                    Using an Injected Wallet within your browser connect to this web app.
                    A popular Injected Wallet is MetaMask.
                </p>
                <WalletButton />
            </div>
        </>
    )
}

export default ConnecWallet;