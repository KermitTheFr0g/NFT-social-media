import { FC } from "react";
import { useState, useEffect } from "react";

import ProjectInputBox from "../ProjectInputBox"; 

// todo within the generation info have option to download abi and contract

interface ProjectInterface {
    ethAddress: any;
}

const CreateProjectModule:FC<ProjectInterface> = (props) => {
    const [projectName, setProjectName] = useState('')
    const [projectAbbreviation, setProjectAbbreviation] = useState('');
    const [maxSupply, setMaxSupply] = useState('');
    const [mintPrice, setMintPrice] = useState('');
    const [maxPerWallet, setMaxPerWallet] = useState('');
    const [Ipfs, setIpfs] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [contractAddress, setContractAddress] = useState(null);

    const submitConfig = async () => {
        setLoading(true);
        const response = fetch(`/api/contract/generate?ethAddress=${props.ethAddress}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "projectName": projectName,
                "projectAbbreviation": projectAbbreviation,
                "maxSupply": maxSupply,
                "mintPrice": mintPrice,
                "maxPerWallet": maxPerWallet,
                "ipfsAddress": Ipfs
            })
        })

        const data = await (await response).json();
        if(!data.success){
            setError(data.error);
        }

        setContractAddress(data.contractAddress);
        setLoading(false);
    }

    const inputButtons = [
        {
            id: 1,
            text: 'PROJECT NAME',
            changeState: setProjectName,
            description: `Set the name of your NFT project`
        },
        {
            id: 2,
            text: 'PROJECT ABBREVIATION',
            changeState: setProjectAbbreviation,
            description: `Set the abbreviation of your NFT project`
        },
        {
            id: 3,
            text: 'MAX SUPPLY',
            changeState: setMaxSupply,
            description: `Set how many pieces are art can be purchased 
            from your NFT project`
        },
        {
            id: 4,
            text: 'MINT PRICE',
            changeState: setMintPrice,
            description: `Set the price to purchase an NFT from your project`
        },
        {
            id: 5,
            text: 'MAX PER WALLET',
            changeState: setMaxPerWallet,
            description: `Set how many NFTs can be purchased with the use of a 
            single wallet`
        },
        {
            id: 6,
            text: 'IPFS ADDRESS',
            changeState: setIpfs,
            description: `Set IPFS address for where images are stored`
        }
    ]

    return(
        <div className="flex flex-col">
            <div className="m-auto justify-center w-1/2 flex flex-col bg-top-nav rounded-xl p-5">
                <div className="text-2xl ml-10 mb-5">Project Configuration</div>
                {
                    inputButtons.map(element => {
                        return (
                            <ProjectInputBox
                                key={element.id}
                                inputText={element.text}
                                changeState={element.changeState}
                                description={element.description}
                            />
                        )
                    })
                }
                <p className="p-3">
                    Enter in your configuration for the NFT collection you would
                    like to create. Hovering over these various options gives you
                    details about the different configurations possible.
                </p>
                <button className="m-auto w-1/3 bg-black p-2 rounded-xl dark:hover:bg-accent-black" onClick={() => submitConfig()}>
                    Create Project
                </button>
            </div>

            <div className="m-auto justify-center w-1/2 flex flex-col bg-top-nav rounded-xl p-5 my-10">
                <div className="text-xl ml-10 mb-5">
                    Contract Generation Info
                </div>

                {
                    loading ?
                    <div className="text-center p-3">
                        Loading...
                    </div>
                    :
                    <>
                    </>
                }

                { 
                    !contractAddress ?
                    <div>
                        {
                            loading ?
                            <div></div>
                            :
                            <p className="p-3">
                                Generate the project to see your Contract Info.
                            </p>
                        }
                    </div>
                    :
                    <div>
                        <div className="w-full flex flex-row my-1">
                            <div className="w-1/3 p-2">Contract Address</div>
                            <div className="w-2/3 p-2">{contractAddress}</div>
                        </div>

                        <div className="w-full flex flex-row my-1">
                            <div className="w-1/3 p-2">Contract File</div>
                            <a className="w-2/3 p-2" href={`/api/files/contract?ethAddress=${props.ethAddress}`} download>Download Solidity File</a>
                        </div>

                        <div className="w-full flex flex-row my-1">
                            <div className="w-1/3 p-2">ABI File</div>
                            <a className="w-2/3 p-2" href={`/api/files/abi?ethAddress=${props.ethAddress}`} download>Download ABI File</a>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default CreateProjectModule;