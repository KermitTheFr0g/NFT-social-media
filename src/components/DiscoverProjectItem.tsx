import { FC } from "react";
import Link from 'next/link';
import Image from 'next/image';



interface DiscoverInterface {
    ProjectName: string;
    ProjectDescription: string;
    UserAddress: string;
}

const DiscoverProjectItem:FC<DiscoverInterface> = (props) => {

    return (
        <Link 
            className="bg-top-nav m-2 p-3 rounded-xl w-1/3"
            href={`/user/profile/${props.UserAddress}`}
        >
            <div className="text-center">{props.ProjectName}</div>
            <div>{props.ProjectDescription}</div>

            <div className="text-[10px]">{props.UserAddress}</div>
        </Link>
    )
}

export default DiscoverProjectItem;