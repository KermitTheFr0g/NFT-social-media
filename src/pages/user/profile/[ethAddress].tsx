import { FC } from "react";
import Head from 'next/head';
import Router, { useRouter } from 'next/router';

import { useState, useEffect } from "react";

import { useAccount, useConnect, useDisconnect, useContractWrite, usePrepareContractWrite } from "wagmi";

import TopNav from "@/components/modules/TopNav";

import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {}
  }
}

// need to add getserverside rendering
// check db if the profile actually exists

//* if profile is wallet connected
// enable user to toggle minting
// edit their profile for other users to view

const Profile:FC = () => {
    const { address, isConnected } = useAccount();
    const router = useRouter();
    const { ethAddress } = router.query;

    const [projectPresent, setProjectPresent] = useState(false);
    const [projectName, setProjectName] = useState('');


    const [loading, setLoading] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [username, setUsername] = useState<any | null>(null);
    const [edit, setEdit] = useState(false);

    const getProfileData = async () => {
        const response = fetch(`/api/user/profile?ethAddress=${ethAddress}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })

        const data = await (await response).json();
        return data;
    }

    useEffect(() => {
        if(!address){
            Router.push('/user/connect-wallet');
        }
    }, [address])
    
    useEffect(() => {
        setLoading(true);

        const getData = async () => {
            const response = fetch(`/api/user/profile?ethAddress=${ethAddress}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });

            const data = await (await response).json();
            if(!data.project){
                return 
            }

            setProjectPresent(true)
            setProjectName(data.project.projectName)

            

            console.log(data.project);
        }

        //* check if connected address matches
        if(address === ethAddress){
            setIsUser(true);
        }

        //todo go to db to check the user exists
        //todo get the user's username if they have one setup
        //todo check the projects the user has launched
        getData();


        // this will be replaced with an actual username if one is found
        setUsername(ethAddress);

        //todo check if user has changed account to a name

        setLoading(false);
    }, [])

    if(loading){
        return (
            <div>
                <TopNav />
    
                <div>LOADING</div>
            </div>
        )
    }

    //todo if the user is not the owner and there is no project render a different page
    if(!isUser && !projectPresent){
        return (
            <div>
                <TopNav />
    
                <div>NO PROJECT PRESENT</div>
            </div>
        )
    }

    return (
        <div>
            <Head>
                <title>{username}</title>
            </Head>
            <TopNav />

            <div>
                THIS HERE IS PROFILE SECTION
            </div>

            <div>
                THEY OWN THIS PROJECT - {projectName}
            </div>

            <div>
                {ethAddress}
            </div>

            {
                isUser ?
                <div>
                    YOU OWN THIS PAGE
                </div>
                :
                <></>
            }

        </div>
    )
}

export default Profile;