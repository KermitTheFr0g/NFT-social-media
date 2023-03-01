import { FC } from "react";

import Router from 'next/router';

import { GetStaticProps } from "next";
import { useState, useEffect } from "react";

import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";

import TopNav from "@/components/modules/TopNav";

const Profile:FC = () => {
    const { address, isConnected } = useAccount();
    
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

        </div>
    )
}

export default Profile;