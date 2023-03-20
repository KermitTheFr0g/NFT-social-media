import { FC } from "react";
import Head from 'next/head';

import TopNav from "@/components/modules/TopNav";

const Discover:FC = () => {
    return (
        <>
            <Head>
                <title>Discover</title>
            </Head>

            <TopNav />

            <div className="text-center text-4xl mt-10"> 
                Project Discovery Page
            </div>

        </>
    )
}

export default Discover