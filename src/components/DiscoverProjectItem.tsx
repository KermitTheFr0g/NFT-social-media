import { FC } from "react";

interface DiscoverInterface {
    ProjectName: string;
    ProjectDescription: string;
    UserAddress: string;
}

const DiscoverProjectItem:FC<DiscoverInterface> = (props) => {

    return (
        <div>
            <div>{props.ProjectName}</div>
            <div>{props.ProjectDescription}</div>
            <div>{props.UserAddress}</div>
        </div>
    )
}

export default DiscoverProjectItem;