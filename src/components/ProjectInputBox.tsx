import { FC } from 'react';
import { Dispatch, SetStateAction } from "react";

interface inputInterface {
    inputText: string;
    changeState: Dispatch<SetStateAction<string>>;
}

const ProjectInputBox:FC<inputInterface> = (props) =>    {
    
    return (
        <div className='w-full flex flex-row my-1'>
            <div className='w-1/3 p-2 hover:cursor-default'>{props.inputText}</div>
            <input 
                className='w-2/3 bg-black rounded-xl p-2 focus:outline-none'
                type="text"  
                onChange={(e) => {
                    props.changeState(e.target.value);
                }}
            />
        </div>
    )
}

export default ProjectInputBox