import { FC } from 'react';

interface ProjectInterface {
    projectName: string;
    projectDescription: string;

}

const ProjectPage:FC<ProjectInterface> = (props) => {
    return (
        <div className='w-2/3 m-auto'>
            <div className='flex flex-col mt-20'>
                <div>Image here</div>
                <div className='text-4xl'>{props.projectName}</div>
                <div className='text-xl w-3/5 '>{props.projectDescription}</div>
            </div>
            
            <div>

            </div>

        </div>
    )
}

export default ProjectPage;