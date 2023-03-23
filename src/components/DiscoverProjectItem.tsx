import { FC } from "react";
import Link from 'next/link';

interface DiscoverInterface {
    ProjectName: string;
    ProjectDescription: string;
    UserAddress: string;
}

const DiscoverProjectItem:FC<DiscoverInterface> = (props) => {

    return (
        <Link href={`/user/profile/${props.UserAddress}`}>
            <div>{props.ProjectName}</div>
            <div>{props.ProjectDescription}</div>
            <div>{props.UserAddress}</div>
        </Link>
    )
}

export default DiscoverProjectItem;