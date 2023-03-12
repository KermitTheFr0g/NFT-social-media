import { FC } from "react";
import Head from 'next/head';
import Router from 'next/router';

import { GetStaticProps } from "next";
import { useState, useEffect } from "react";

import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";

import TopNav from "@/components/modules/TopNav";
import CreateProjectModule from "@/components/modules/CreateProject";

const CreateProject:FC = () => {
    const { address, isConnected } = useAccount();

    useEffect(() => {
        if(!address){
            Router.push('/user/connect-wallet')
        }
    }, [address]);

    return(
        <>
            <Head>
                <title>Create Project</title>
            </Head>

            <TopNav />

            <div className="text-center text-5xl p-10 hover:cursor-default">
                Create Project
            </div>

            <CreateProjectModule ethAddress={address} />

        </>
    ) 
}

export default CreateProject;