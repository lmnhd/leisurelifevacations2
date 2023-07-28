import { Button, Typography } from "@material-tailwind/react";
import { getPosts } from "./Firebase";
import { Link, useLoaderData } from "react-router-dom";

export default function EditPosts(){
    const posts = useLoaderData();

    const renderPosts = () => {
        return posts.map( (container,i) => {
            console.log(container)
            const id = container.id;
            const post = container.post;
            return <li key={id} 
            
            >
                <Link to={`/updatepost/${id}`}
                className="flex flex-row items-center cursor-pointer hover:bg-red-300  p-3 m-3 font-sans rounded-md bg-blue-gray-100 border-black border-b-3"
                >
                    <Typography
                    variant="h5"
                    className="text-sm font-light w-1/2 border-b-2"
                    >{post.heading}</Typography>
                    <div className="w-1/2 flex flex-row-reverse justify-stretch items-end pl-8">
                        <img
                        src={post.featureIMG}
                        className="h-20 w-32 justify-self-end"
                        />
                    </div>
                    {/* <i className="fa fa-star"/> */}
                </Link>
            </li>
        })
    }

    return <>
    <div>
        <ul>
            {renderPosts()}
        </ul>
    </div>
    </>
}