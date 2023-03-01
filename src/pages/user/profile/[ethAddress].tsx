import { FC } from "react";

import Router, { useRouter } from 'next/router';

import { GetStaticProps } from "next";
import { useState, useEffect } from "react";

import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";

import TopNav from "@/components/modules/TopNav";

const Profile:FC = () => {
    const { address, isConnected } = useAccount();
    const router = useRouter();
    const { ethAddress } = router.query;

    useEffect(() => {
        if(!address){
            Router.push('/user/connect-wallet');
        }
    }, [address])
    

    return (
        <div>
            <TopNav />

            <div>
                THIS HERE IS PROFILE SECTION
            </div>

            <div>
                {ethAddress}
            </div>

        </div>
    )
}

export default Profile;