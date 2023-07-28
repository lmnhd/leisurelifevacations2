import { useState, useEffect } from "react";
import { Navigate, useLoaderData } from "react-router-dom";
import PostForm, { PostFormData } from "./PostForm";
import Post from "./Post";
import { Button } from "@material-tailwind/react";
import { deletePost, updatePost } from "./Firebase";
function UpdatePost() {
  const loadedPost = useLoaderData();
  let data = loadedPost.post;
  const id = loadedPost.id;
  console.log(data);

  if (!data.sections) {
    data = PostFormData;
  }
  const [post, setPost] = useState(data);
  const [dates, updateDates] = useState(data.dates);
  const [sections, updateSections] = useState([...data.sections]);
  const [extras, updateExtras] = useState(data.extras);
  const [cruiseLine, setCruiseLine] = useState(data.cruiseLine);
  const [shipName, setShipName] = useState(data.shipName);
  const [destination, setDestination] = useState(data.destination);
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
    let finalPost = {
      ...post,
      dates: dates,
      sections: sections,
      extras: extras,
      shipName: shipName,
      cruiseLine: cruiseLine,
      destination: destination,
    };

    console.log(finalPost);

    const result = updatePost(finalPost, id);
    console.log(result);
  };
  const _deletePost = () => {
    if (window.confirm("Really Delete??") == true) {
      console.log(id);
      //deletePost(id)
    }

    //Navigate({to:`/editPosts`})
  };

  return (
    <>
      <div className="flex flex-row w-full bg-gray-300 sticky">
        <Button color="gray" className="w-1/2" onClick={submit}>Update</Button>
        <Button color="red" className="w-1/2" onClick={_deletePost}>Delete</Button>
      </div>
      
      <div className="grid grid-flow-row lg:md:grid-flow-col  col-span-2">
        <div className="lg:max-h-screen lg:overflow-y-auto">
          <PostForm
            post={post}
            setPostState={setPost}
            update={true}
            updateDates={updateDates}
            updateExtras={updateExtras}
            updateSections={updateSections}
            updateShipName={setShipName}
            updateCruiseLine={setCruiseLine}
            updateDestination={setDestination}
          />
        </div>
        <div className="lg:max-h-screen lg:overflow-y-auto">
          <Post
            post={post}
            update={true}
            editdates={dates}
            editsections={sections}
            editextras={extras}
            shipName={shipName}
            cruiseLine={cruiseLine}
            destination={destination}
          />
        </div>
      </div>
    </>
  );
}
export default UpdatePost;
