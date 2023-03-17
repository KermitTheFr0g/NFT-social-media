import { FC } from "react";
import Head from 'next/head';
import Router, { useRouter } from 'next/router';

import { useState, useEffect } from "react";

import { ethers } from 'ethers'
import { useAccount, useContractWrite, usePrepareContractWrite, useContractRead } from "wagmi";

import TopNav from "@/components/modules/TopNav";
import ProjectPage from "@/components/modules/ProjectPage";
import MintingButton from "@/components/MintingButton";
import ToggleMintButton from "@/components/ToggleMintButton";

import { GetServerSideProps } from 'next'
// change this to a general abi for all contracts
import contractABI from '../../../../user_contracts_abi/contract_0x516923E55e9eD4Bcf08CFA4A477a11805b0CD72C_abi.json'

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
    const { address } = useAccount();
    const router = useRouter();
    const { ethAddress } = router.query;

    const [projectPresent, setProjectPresent] = useState(false);
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [ethPrice, setethPrice] = useState('');
    const [contractAddress, setContractAddress] = useState('');

    const [loading, setLoading] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [username, setUsername] = useState<any | null>(null);
    const [edit, setEdit] = useState(false);

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

            const contractData = await (await response).json();
            if(!contractData.project){
                return 
            }

            setProjectPresent(true);
            setProjectName(contractData.project.projectName);
            setProjectDescription(contractData.project.projectDescription)
            setContractAddress(contractData.project.contractAddress);
            setethPrice(contractData.project.ethPrice)

            console.log(contractData.project);
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

    //todo render different page if the owner owns the page but there is no project
    if(isUser && !projectPresent){
        return (
            <div>
                <TopNav />
    
                <div>NO PROJECT PRESENT</div>
                <div>BUT YOU OWN THIS PAGE</div>
            </div>
        )
    }

    //todo different render if the project is present
    // within this there will be a button only the owner can see
    // this allows them to toggle mine

    return (
        <div>
            <Head>
                <title>{username}</title>
            </Head>
            <TopNav />

            <ProjectPage 
                projectName={projectName}
                projectDescription={projectDescription} 
            />

            <div>
                <MintingButton 
                    address={address}
                    contractAddress={contractAddress}
                    ethPrice={ethPrice}
                />
            </div>

            {
                isUser ?
                <div>
                    <ToggleMintButton 
                        address={address}
                        contractAddress={contractAddress}
                    />
                </div>
                :
                <></>
            }

        </div>
    )
}

export default Profile;