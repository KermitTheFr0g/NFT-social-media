import { FC } from "react";
import { useState, useEffect } from "react";

import ProjectInputBox from "../ProjectInputBox"; 

const CreateProjectModule:FC = () => {
    const [projectName, setProjectName] = useState('')
    const [projectAbbreviation, setProjectAbbreviation] = useState('');
    const [maxSupply, setMaxSupply] = useState('');
    const [mintPrice, setMintPrice] = useState('');
    const [maxPerWallet, setMaxPerWallet] = useState('');
    const [Ipfs, setIpfs] = useState('');

    const [loading, setLoading] = useState(false);

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
            changeState: setProjectName,
            description: `Set the abbreviation of your NFT project`
        },
        {
            id: 3,
            text: 'MAX SUPPLY',
            changeState: setProjectName,
            description: `Set how many pieces are art can be purchased 
            from your NFT project`
        },
        {
            id: 4,
            text: 'MINT PRICE',
            changeState: setProjectName,
            description: `Set the price to purchase an NFT from your project`
        },
        {
            id: 5,
            text: 'MAX PER WALLET',
            changeState: setProjectName,
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

            <button className="m-auto w-1/3 bg-black p-2 rounded-xl">
                Create Project
            </button>
        </div>
    )
}

export default CreateProjectModule;