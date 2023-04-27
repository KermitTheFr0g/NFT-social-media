import { FC } from "react";
import Head from 'next/head';
import { GetServerSideProps } from "next";

import TopNav from "@/components/modules/TopNav";
import DiscoverProjects from "@/components/modules/DiscoverProjects";

interface DiscoverProjectsInterface {
    projects: [{
        name: string;
        description: string;
        ownerAddress: string;
    }]
}

const Discover:FC<DiscoverProjectsInterface> = (props) => {
    return (
        <>
            <Head>
                <title>Discover</title>
            </Head>

            <TopNav />

            <div className="text-center text-4xl mt-10"> 
                Project Discovery Page
            </div>

            <DiscoverProjects projects={props.projects} />

        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const response = await fetch(`http://localhost:3000/api/discover`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    const discoveryData = await response.json();

    const projects = discoveryData.Projects;

    return {
        props: {
            projects,
        }
    }
};

export default Discover