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

// actually write the minting button
// todo move the minting function from profile page to here

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

    // todo dynamically change both the address and the value of eth which is sent
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
        <div>
            MINTING BUTTON
            <button disabled={!minting} onClick={() => { write?.()}}>mint here</button>
        </div>
    )
}

export default MintingButton;