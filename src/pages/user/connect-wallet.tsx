import { FC } from "react";

import TopNav from "@/components/modules/TopNav";
import WalletButton from '@/components/WalletButton';

const ConnecWallet:FC = () => {
    return (
        <div>
            <TopNav />

            <div className="m-auto justify-center">
                <WalletButton />
            </div>
        </div>
    )
}

export default ConnecWallet;