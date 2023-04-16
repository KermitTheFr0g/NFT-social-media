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

        getData();

        setUsername(ethAddress);

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

    // * renders page if the user is not the owner and there is no project
    if(!isUser && !projectPresent){
        return (
            <div>
                <TopNav />
    
                <div>NO PROJECT PRESENT</div>
            </div>
        )
    }
    
    // * renders page if the user is the owner and there is no project
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

            <ProjectPage 
                projectName={projectName}
                projectDescription={projectDescription}
                contractAddress={contractAddress}
                userAddress={address}
            />

            <div className="flex flex-col my-10 w-full justify-center">
                <MintingButton
                    address={address}
                    contractAddress={contractAddress}
                    ethPrice={ethPrice}
                />
            </div>

        </div>
    )
}

export default Profile;