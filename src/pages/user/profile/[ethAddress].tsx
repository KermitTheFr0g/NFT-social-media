import { FC } from "react";

import Router, { useRouter } from 'next/router';

import { GetStaticProps } from "next";
import { useState, useEffect } from "react";

import { useAccount, useConnect, useDisconnect, useContractWrite } from "wagmi";

import TopNav from "@/components/modules/TopNav";

import { GetServerSideProps } from 'next'

import contractABI from '../../../../user_contracts_abi/contract_0x0b5F59bf4f1c987F7b74ca7683a2F7e98201587D_abi.json';

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

    const { write } = useContractWrite({
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

    useEffect(() => {
        if(!address){
            Router.push('/user/connect-wallet');
        }
    }, [address])
    
    useEffect(() => {
        setLoading(true);

        // check if 

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
                <button onClick={write()}>
                    TOGGLE MINT
                </button>
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