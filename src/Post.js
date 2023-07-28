import { getPost } from "./Firebase";
import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { Typography,
Card,
Fragment } from "@material-tailwind/react";

import { PostFormData } from "./PostForm";

export async function LoadPost({params}){
    // const [posts,setPosts] = useState([])
    
    //id = "-NZ9I7s5d1h1Q1GmJ4jQ"
    console.log(params.id)
    const post = await getPost(params.id);
    console.log(post)
    return {id: params.id, post:post};
    
}
function Post({post, update, editdates,editsections,editextras}) {
var _post = {}
  const data = useLoaderData();
  console.log(data)
  
  const loadedPost = data.post;
  const id = data.id;
  if(update){
    _post = post !== null ? post : PostFormData
  }else{
    //To Do - make this posts an object not array
    _post = loadedPost
  }
  console.log(_post)
  //return;
  var { heading, summary, featureIMG, sections, extras, dates, body } = _post;
  if(update){
    sections = editsections;
    extras = editextras;
    dates = editdates;
  }
  return (
    <>
   

    <Card className="flex flex-auto gap-6 lg:mx-6 items-center" >
    <div className="flex flex-row flex-wrap gap-2">
      <p className="p-2 text-lg text-center font-body">Call Now to Book! </p>
      <Typography
      className="justify-end p-2 text-right shadow-sm "
      variant="h3">(904) 438 - 8121</Typography>
    </div>
      <Typography 
      className="whitespace-pre-wrap text-center font-sans shadow-md font-extralight align-middle w-full lg:w-3/4"
      variant="h1">{heading}</Typography>
      <img className="w-full" src={featureIMG} alt="Post Featured" />
      <Typography variant="lead"
      className="whitespace-pre-wrap lg:w-2/3 text-left"
      >{summary}</Typography>
      <br/>
      <Typography 
      variant="lead"
      className="text-blue-gray-900 font-body lg:w-3/4 font-semibold justify-center lg:ml-10 whitespace-pre-wrap lg:p-6 bg-gray-50"
      >
        <p>{body}</p>

      </Typography>

     <hr/>
      {sections.length > 0 && sections.map((section, index) => (
        <div className="flex flex-col flex-wrap gap-4" key={index}>
          <Typography variant="h3">{section.type}</Typography>
          {section.img && <img
          className="max-w-full p-3 rounded-sm shadow-md"
          src={section.img} alt="Section Image" />}
          <Typography>
            <pre className="text-lg font-semibold whitespace-pre-line">{section.details}</pre>
          </Typography>
        </div>
      ))}

      
    </Card>
    <div
      className="grid grid-flow-row  border-l-4 border-spacing-4 border-black flex-wrap items-start gap-6 p-8 bg-gray-100"
      >
        <i className="fa fa-calendar fa-5x"></i>
        {/* <Typography
        variant="h3"
        className="font-thin"
        >Dates:</Typography> */}
        {dates.map((date, index) => (
          <div key={index}
          className="flex flex-col border-black border-spacing-2 bg-blue-gray-300 align-middle shadow-sm rounded-sm"
          >
            <Typography
            variant="h5"
            className="bg-blue-gray-50"
            >{date.date}</Typography>
            <Typography
            variant="h6"
            className="font-serif font-semibold p-3 text-white"
            >{date.type}</Typography>
            
          </div>
        ))}
      </div>

     <hr/>
      {extras.map((extra, index) => (
        <Card 
        className="flex flex-col gap-6 shadow-md bg-gray-50 "
        key={index}
        >
          <Typography variant="h3" className="font-semibold">{extra.title}</Typography>
          <ul>
            {extra.info && extra.info.map((info, idx) => (
              <li key={idx}><p className="p-3 text-center whitespace-pre-wrap">{info}</p></li>
            ))}
          </ul>
        </Card>
      ))}
      {/* <h1>Post</h1>
      <div><pre 
      className="font-serif text-center w-72"
      >
        {posts.length > 0 && posts[2].post.body}</pre></div> */}
    </>
  );
}
export default Post;
