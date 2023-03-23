import { FC, useEffect, useState } from "react";

import DiscoverProjectItem from "../DiscoverProjectItem";

const DiscoverProjects:FC = () => {
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState<[{
        projectName: string;
        projectDescription: string;
        ownerAddress: string;
    }] | []>([]);
    
    useEffect(() => {
        setLoading(true)

        const getData = async () => {
            const response = fetch(`/api/discover`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const discoveryData = await (await response).json();
        
            console.log(discoveryData.Projects);
            setProjects(discoveryData.Projects);
        }

        getData();

        setLoading(false);
    }, [])

    return (
        <div>
            {
                projects.map(project => {
                    return (
                        <DiscoverProjectItem 
                            ProjectName={project.projectName}
                            ProjectDescription={project.projectDescription}
                            UserAddress={project.ownerAddress}
                        />
                    )
                })
            }
        </div>
    )
}

export default DiscoverProjects;