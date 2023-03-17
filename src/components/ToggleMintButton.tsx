import { FC } from "react";

import { useState } from "react";

import { ethers } from "ethers";
import { useContractWrite } from "wagmi";

import contractABI from '../../user_contracts_abi/contract_0x0b5F59bf4f1c987F7b74ca7683a2F7e98201587D_abi.json';

interface ToggleMintingInterface {
    address: string | undefined;
    contractAddress: string;
}

const ToggleMintButton:FC<ToggleMintingInterface> = (props) => {
    const [minting, setMinting] = useState(false);

    return (
        <div>
            <div>Toggle Minting</div>
            <div>Current State - { minting ? <>True</> : <>False</> }</div>            
            <button>Click to Toggle Minting</button>
        </div>
    )
}

export default ToggleMintButton;