import { FC } from "react";
import Router from 'next/router';

import { GetStaticProps } from "next";
import { useState, useEffect } from "react";

import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";

import TopNav from "@/components/modules/TopNav";

const CreateProject:FC = () => {
    const { address, isConnected } = useAccount();

    useEffect(() => {
        if(!address){
            Router.push('/user/connect-wallet')
        }
    }, [])

    return(
        <div>
            <TopNav />

            CREATE PROJECT

            

        </div>
    ) 
}

export default CreateProject;