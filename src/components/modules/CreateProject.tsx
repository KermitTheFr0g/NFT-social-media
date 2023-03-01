import { FC } from "react";

import { useState, useEffect } from "react";

import ProjectInputBox from "../ProjectInputBox"; 

const CreateProjectModule:FC = () => {
    const [projectName, setProjectName] = useState('')
    const [projectAbbreviation, setProjectAbbreviation] = useState('');
    const [maxSupply, setMaxSupply] = useState('');
    const [mintPrice, setMintPrice] = useState('');
    const [maxPerWallet, setMaxPerWallet] = useState('');

    return(
        <div className="m-auto justify-center w-1/2 flex flex-col bg-top-nav rounded-xl p-5">
            <div className="text-2xl ml-10 mb-5">Project Configuration</div>

            <ProjectInputBox inputText={'PROJECT NAME'} changeState={setProjectName} />
            <ProjectInputBox inputText={'PROJECT ABBREVIATION'} changeState={setProjectAbbreviation} />
            <ProjectInputBox inputText={'MAX SUPPLY'} changeState={setMaxSupply} />
            <ProjectInputBox inputText={'MINT PRICE'} changeState={setMintPrice} />
            <ProjectInputBox inputText={'MAX PER WALLET'} changeState={setMaxSupply} />
    
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