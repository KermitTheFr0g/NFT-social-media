import { FC } from 'react';

interface ProjectInterface {
    projectName: string;
    projectDescription: string;

}

const ProjectPage:FC<ProjectInterface> = (props) => {
    return (
        <div>
            <div>
                <div>{props.projectName}</div>
                <div>{props.projectDescription}</div>
            </div>
            

        </div>
    )
}

export default ProjectPage;