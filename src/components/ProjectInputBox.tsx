import { FC } from 'react';
import { Dispatch, SetStateAction } from "react";

import { Tooltip } from '@mui/material';
import { Zoom } from '@mui/material';

interface inputInterface {
    inputText: string;
    changeState: Dispatch<SetStateAction<string>>;
    description: string;
}

const ProjectInputBox:FC<inputInterface> = (props) =>    {
    
    return (
        <div className='w-full flex flex-row my-1'>
            <Tooltip title={props.description} placement={'left'} TransitionComponent={Zoom}>
                <div className='w-1/3 p-2 hover:cursor-default'>{props.inputText}</div>
            </Tooltip>
            <input 
                className='w-2/3 bg-black rounded-xl p-2 focus:outline-none'
                type="text"  
                placeholder={props.inputText}
                onChange={(e) => {
                    props.changeState(e.target.value);
                }}
            />
        </div>
    )
}

export default ProjectInputBox