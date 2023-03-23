import { FC, useEffect, useState } from "react";

const DiscoverProjects:FC = () => {
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    
    useEffect(() => {
        setLoading(true)

        const getData = async () => {
            const response = fetch(`/api/discover`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const discoveryData = await (await response).json();
        
        
            console.log(discoveryData);
        }

        getData();

        setLoading(false);
    }, [])

    return (
        <div>
            


        </div>
    )
}

export default DiscoverProjects;