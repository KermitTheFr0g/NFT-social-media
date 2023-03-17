import { FC } from "react";
import { useState, useEffect } from "react";

import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";
import { InjectedConnector } from 'wagmi/connectors/injected';

const ConnectWallet:FC = () => {
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })
    
    const [walletAddress, setWalletAddress] = useState('Connect Wallet');

    useEffect(() => {
        if(address){
            setWalletAddress(address.slice(0, 9));
        } else if(!address){
            setWalletAddress('Connect Wallet')
        }
    }, [address])

    const handleClick = () => {
        if(address){
            disconnect();
        } else if(!address){
            connect();
        }
    }

    return (
        <button className="p-3 dark:hover:bg-accent-black rounded-2xl" onClick={() => handleClick()}>
            {walletAddress}
        </button>
    )

}

export default ConnectWallet;