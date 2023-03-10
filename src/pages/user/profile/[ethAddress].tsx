import { FC } from "react";
import Head from 'next/head';
import Router, { useRouter } from 'next/router';

import { useState, useEffect } from "react";

import { useAccount, useConnect, useDisconnect, useContractWrite, usePrepareContractWrite } from "wagmi";

import TopNav from "@/components/modules/TopNav";

import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {}
  }
}

// need to add getserverside rendering
// check db if the profile actually exists

//* if profile is wallet connected
// enable user to toggle minting
// edit their profile for other users to view

const Profile:FC = () => {
    const { address, isConnected } = useAccount();
    const router = useRouter();
    const { ethAddress } = router.query;

    const [loading, setLoading] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [username, setUsername] = useState<any | null>(null);

    const { config } = usePrepareContractWrite({
        address: '0x78B610e65C162686Bf850a7982c0b28Bf1691A05',
        abi: [
            {
                "inputs": [],
                "name": "toggleMint",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
        ],
        functionName: 'toggleMint',
    })

    const { write } = useContractWrite(config);

    useEffect(() => {
        if(!address){
            Router.push('/user/connect-wallet');
        }
    }, [address])
    
    useEffect(() => {
        setLoading(true);

        //* check if connected address matches
        if(address === ethAddress){
            setIsUser(true);
        }

        // this will be replaced with an actual username if one is found
        setUsername(ethAddress);

        //todo check if user has changed account to a name

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
            <Head>
                <title>{username}</title>
            </Head>
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
                    <button onClick={() => {
                        write?.();
                    }}>
                        Toggle Mint
                    </button>
                </div>
                :
                <></>
            }

        </div>
    )
}

export default Profile;