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
    return post;
    
}
function Post({post, update, editdates,editsections,editextras}) {
var _post = {}
  const loadedPost = useLoaderData();
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
   

    <Card className="flex flex-auto gap-6 mx-6">
    <div className="flex flex-row flex-wrap gap-2">
      <p className="p-2 text-lg text-center font-body">Call Now For More Information! </p>
      <Typography
      className="justify-end p-2 text-right shadow-sm "
      variant="h3">(904) 438 - 8121</Typography>
    </div>
      <Typography variant="h1">{heading}</Typography>
      <img className="w-full" src={featureIMG} alt="Post Featured" />
      <Typography variant="lead"
      className="text-center"
      >{summary}</Typography>
      <br/>
      <Typography 
      variant="lead"
      className="text-yellow-900 font-body bg-gray-50"
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

      <div
      className="flex flex-row flex-wrap items-stretch gap-8 p-8 bg-gray-100"
      >
        <i className="fa fa-calendar fa-5x"></i>
        {/* <Typography
        variant="h3"
        className="font-thin"
        >Dates:</Typography> */}
        {dates.map((date, index) => (
          <div key={index}>
            <Typography
            variant="h4"
            className="font-serif font-semibold"
            >{date.type}</Typography>
            <Typography
            variant="h6"
            >{date.date}</Typography>
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
    </Card>
      {/* <h1>Post</h1>
      <div><pre 
      className="font-serif text-center w-72"
      >
        {posts.length > 0 && posts[2].post.body}</pre></div> */}
    </>
  );
}
export default Post;
