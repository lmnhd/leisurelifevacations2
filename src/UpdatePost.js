import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import PostForm, { PostFormData } from "./PostForm";
import Post from "./Post";
import { Button } from "@material-tailwind/react";

function UpdatePost(){
    

const data = useLoaderData();
const [post,setPost] = useState(data)
const [dates,updateDates] = useState(data.dates)
const [sections,updateSections] = useState([...data.sections])
const [extras,updateExtras] = useState(data.extras)
//console.log(data)

// useEffect( () => {
    
    
// }, [])

// setTimeout(() => {
//     if(data){
//         setPost(data[2].post)
//     }
// }, 3000);
//console.log(post)

const submit = () => {
    
      const finalPost =  {...post, dates:dates,sections:sections,extras:extras}
   
   console.log(finalPost)
    

}


return <>
<div className="w-full bg-gray-300"><Button
onClick={submit}
>submit</Button></div>
<div className="grid grid-flow-row lg:md:grid-flow-col  col-span-2">

<div className="lg:max-h-screen lg:overflow-y-auto">
    <PostForm post={post} setPostState={setPost} update={true}
    updateDates={updateDates} updateExtras={updateExtras} updateSections={updateSections}
    />
</div>
<div className="lg:max-h-screen lg:overflow-y-auto">
    <Post post={post} update={true} editdates={dates} editsections={sections} editextras={extras}/>
</div>

</div>
</>
}
export default UpdatePost;