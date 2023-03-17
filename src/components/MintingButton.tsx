import { FC } from "react";

interface MintingInterface {
    contractAddress: string;
    EthPrice: string;
    MintingEnabled: boolean;
}

// actually write the minting button
// todo move the minting function from profile page to here

const MintingButton:FC<MintingInterface> = (props) => {
    return (
        <div>
            MINTING BUTTON
        </div>
    )
}

export default MintingButton;