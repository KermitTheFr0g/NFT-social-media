import { FC } from "react";

import { useState } from "react";

import { useContractWrite, usePrepareContractWrite, useContractRead } from "wagmi";

import contractABI from '../../user_contracts_abi/contract_0x0b5F59bf4f1c987F7b74ca7683a2F7e98201587D_abi.json';

interface ToggleMintingInterface {
    address: string | undefined;
    contractAddress: string;
}

const ToggleMintButton:FC<ToggleMintingInterface> = (props) => {
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
        functionName: 'toggleMint'
    })
    const { write } = useContractWrite(config);

    return (
        <div className="p-10">
            <div>Toggle Minting</div>
            <div>Current State - { minting ? <>True</> : <>False</> }</div>            
            <button onClick={() => { write?.()}} >Click to Toggle Minting</button>
        </div>
    )
}

export default ToggleMintButton;