import { FC } from 'react';

import Image from 'next/image';

import NFTPlaceHolder from '../../../public/images/71.png'

interface ProjectInterface {
    projectName: string;
    projectDescription: string;
    contractAddress: string;
    userAddress: string | undefined;
}

const ProjectPage:FC<ProjectInterface> = (props) => {
    return (
        <div className='w-2/3 m-auto'>
            <div className='flex flex-col mt-10'>
                <Image 
                    src={NFTPlaceHolder}
                    width={100}
                    height={100}
                    alt={'nft placeholder'}
                />
                <div className='text-sm'>(Placeholder image)</div>
                <div className='text-4xl'>{props.projectName}</div>
                <div className='text-xl w-3/5 '>{props.projectDescription}</div>
                <div className='text-sm italic'>Contract Address - {props.contractAddress}</div>
                <div className='text-sm italic'>User Address - {props.userAddress}</div>
            </div>
        </div>
    )
}

export default ProjectPage;