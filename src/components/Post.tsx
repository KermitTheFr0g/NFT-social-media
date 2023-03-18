import { FC } from "react";

interface PostInterface {
    Title: string;
    Content: string;
}

const Post:FC<PostInterface> = (props) => {
    return (
        <div className="bg-top-nav rounded-2xl p-5 m-2 w-full">
            <div className="text-xl">{props.Title}</div>
            <p>
                {props.Content}
            </p>
        </div>
    )
}

export default Post;