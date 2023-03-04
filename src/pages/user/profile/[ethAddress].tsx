import { FC } from "react";

import Router, { useRouter } from 'next/router';

import { GetStaticProps } from "next";
import { useState, useEffect } from "react";

import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";

import TopNav from "@/components/modules/TopNav";

import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {}
  }
}

// need to add getserverside rendering
// check db if the profile actually exists

const Profile:FC = () => {
    const { address, isConnected } = useAccount();
    const router = useRouter();
    const { ethAddress } = router.query;

    const [loading, setLoading] = useState(false);
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {
        if(!address){
            Router.push('/user/connect-wallet');
        }
    }, [address])
    
    useEffect(() => {
        setLoading(true);

        console.log(address, ethAddress);
        if(address === ethAddress){
            setIsUser(true);
        }
        
        setLoading(false);
    }, [])

    if(loading){
        return (
            <div>
                <TopNav />
    
                <div>LOADING</div>

            </div>
        )
    }

    return (
        <div>
            <TopNav />

            <div>
                THIS HERE IS PROFILE SECTION
            </div>

            <div>
                {ethAddress}
            </div>

            {
                isUser ?
                <div>
                    YOU OWN THIS PAGE
                </div>
                :
                <></>
            }

        </div>
    )
}

export default Profile;