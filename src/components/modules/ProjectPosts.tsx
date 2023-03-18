import { FC } from "react";

import Post from "../Post";

const Posts:FC = () => {
    return (
        <div>
            <div className="text-2xl underline text-center w-full">Posts</div>
            <Post Title="Hello World" Content="This is the content of post" />
        </div>
    )
}

export default Posts;