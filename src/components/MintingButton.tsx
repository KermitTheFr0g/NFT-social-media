import { FC } from "react";

import { useState, useEffect } from "react";

import { ethers } from "ethers";
import { useContractWrite, usePrepareContractWrite, useContractRead } from "wagmi";

//todo create a general abi
import contractABI from '../../user_contracts_abi/contract_0x0b5F59bf4f1c987F7b74ca7683a2F7e98201587D_abi.json';

interface MintingInterface {
    address: string | undefined;
    contractAddress: string;
    ethPrice: string;
}

const MintingButton:FC<MintingInterface> = (props) => {
    const [minting, setMinting] = useState<boolean>(false);
    
    const getMintStatus = useContractRead({
        address: `0x${props.contractAddress.split('0x')[1]}`,
        abi: contractABI,
        functionName: 'mintEnabled',
        onSuccess(){
            if(typeof getMintStatus.data == 'boolean'){
                setMinting(getMintStatus.data)
            }
        },
        watch: true
    })

    const { config } = usePrepareContractWrite({
        address: `0x${props.contractAddress.split('0x')[1]}`,
        abi: contractABI,
        functionName: 'publicMint',
        args: [props.address, 1], 
        overrides: {
            value: ethers.utils.parseEther(props.ethPrice.toString())
        }
    })
    const { write } = useContractWrite(config);

    return (
        <div className="flex flex-col w-1/5 m-auto bg-top-nav p-9 rounded-2xl">
            <div className={'text-2xl text-center m-3'}>Mint NFT here</div>
            <p>
                You can mint this NFT project using the button below.
            </p>
            <button
                className="w-full p-2 m-2 dark:hover:bg-accent-black rounded-2xl" 
                disabled={!minting} 
                onClick={() => { write?.()}}
            >
                Mint 1X
            </button>
        </div>
    )
}

export default MintingButton;