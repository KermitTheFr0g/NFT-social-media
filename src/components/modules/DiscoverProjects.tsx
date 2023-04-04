import { FC, useEffect, useState } from "react";

import DiscoverProjectItem from "../DiscoverProjectItem";

interface DiscoverProjectsInterface {
    projects: [{
        name: string;
        description: string;
        ownerAddress: string;
    }]
}

const DiscoverProjects:FC<DiscoverProjectsInterface> = (props) => {

    if(!props.projects){
        return (
            <div>
                <h1>loading...</h1>
            </div>
        )
    }

    return (
        <div className="flex flex-wrap m-auto w-11/12 mt-20 justify-center">
            {
                props.projects.map(project => {
                    return (
                        <DiscoverProjectItem 
                            ProjectName={project.name}
                            ProjectDescription={project.description}
                            UserAddress={project.ownerAddress}
                        />
                    )
                })
            }
        </div>
    )
}

export default DiscoverProjects;