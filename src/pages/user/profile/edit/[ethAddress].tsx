import { FC } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

import TopNav from '@/components/modules/TopNav';

const EditProfile:FC = () => {
    const { address, isConnected } = useAccount();
    const router = useRouter();
    const { ethAddress } = router.query;

    const [isloading, setIsLoading] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [username, setUsername] = useState<any | null>(null);

    useEffect(() => {
        if(!address){
            Router.push('/user/connect-wallet');
        }
    }, [address]);

    useEffect(() => {
        setIsLoading(true);

        if(address == ethAddress){
            setIsUser(true);
        }

        // this will be replaced with an actual username if one is found
        setUsername(ethAddress);
        setIsLoading(false);
    })

    return (
        <div>
            
            
            <TopNav />



        </div>
    )
}

export default EditProfile;