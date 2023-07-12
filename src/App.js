import React, { useRef, useState } from "react";
// import logo from './logo.svg';
import "./App.css";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useLoaderData } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "./llv-logo-june-2023.png";
import Footer from "./Footer";
import Posts from "./Posts";
import { addPost, getPosts } from "./Firebase";
import PostForm from "./PostForm";
import Post from "./Post";
import { getFunctions, httpsCallable } from "firebase/functions";
import axios from "axios";
import { davinci } from "./api/openAI";

// const functions = getFunctions();
// const addMessage = httpsCallable(functions, "addMessage");
// const getAIMessage = httpsCallable(functions, "getAIMessage");

export async function LoadPosts() {
  const posts = await getPosts();
  return posts;
}

async function check(){
  console.log('check')
  //checkAI()
  return
  
  try {
    const response = await axios("/api/generate", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         "Clear-Site-Data": "*"
      },
      body: JSON.stringify({ animal: "bird" }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw data.error || new Error(`Request failed with status ${response.status}`);
    }
    console.log(data.result)
    //setResult(data.result);
    //setAnimalInput("");
  } catch(error) {
    // Consider implementing your own error handling logic here
    console.error(error);
    alert(error.message);
  }
}

function App() {
  const posts = useLoaderData();
  const [openNav, setOpenNav] = React.useState(false);
  const [aiInputVal, setAIInputVal] = useState("");
  const aiInput = useRef(null);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const handleAIInputChange = (e) => {
    //console.log(aiInput.current)
    console.log(e.target.value);
    setAIInputVal(e.target.value);
  };
  

  return (
    <>
      {/* <!-- component --> */}

      {/*
  Heads up! 👋 ✈  

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/}

      <section className="relative bg-[url(https://images.unsplash.com/photo-1554254648-2d58a1bc3fd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80)] bg-cover bg-center bg-no-repeat  bg-blend-overlay ">
        <div className="absolute inset-0 bg-gradient-to-r from-white to-white/25 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="relative max-w-screen-xl px-4 py-32 mx-auto sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Your first stop
              <strong className="block font-extrabold text-rose-700">
                on a Fantastic Voyage.
              </strong>
            </h1>

            <p className="max-w-lg mt-4 text-white bg-yellow-900 rounded-lg shadow-md sm:text-xl/relaxed">
              Let us make it happen!
            </p>

            <div className="flex flex-row flex-wrap items-center justify-center gap-4 mt-8 text-center">
              <div className="flex flex-row items-center justify-center opacity-80">
                <a
                  onClick={check}
                  href="#"
                  className="block w-full px-12 py-3 text-sm font-medium text-black bg-orange-100 rounded shadow-lg opacity-75 bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                >
                  Join Our Group
                </a>
                <a
                  onClick={getPosts}
                  href="#"
                  className="block w-full px-12 py-3 text-sm font-medium bg-gray-200 rounded shadow text-rose-600 hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                >
                  Contact Us
                </a>
              </div>

              <div className="flex flex-row flex-wrap items-center w-full gap-6 mt-8 shadow-sm justify-evenly">
                <i className="fa fa-computer fa-lg" />
                <Typography
                  variant="h8"
                  className="p-5 font-light text-red-900 border-t-2 shadow-lg "
                >
                  Try out the AI Travel Agent
                </Typography>
              </div>

              <div className="flex flex-col w-full">
                <Typography className="mb-3 " variant="h5"></Typography>
                <label className="mb-4 font-bold">
                  Where would you like to go?
                </label>
                <input
                  id="ai-input"
                  ref={aiInput}
                  className="h-12 rounded-lg"
                  placeholder="ex: The Caribbean for my anniversary this Fall"
                  onChange={handleAIInputChange}
                  value={aiInputVal}
                />
                {aiInputVal != "" && (
                  <button className="p-4 text-red-700 bg-gray-200 border-t-2 border-black rounded-lg shadow-sm hover:text-black">
                    SEARCH WITH AI
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Post/> */}
      <section>
        <div className="flex flex-auto p-3 bg-gray-700">
          <i className="p-6 fa fa-thin fa-ship fa-3x" />
          <Typography
            className="w-full text-right border-l-2 border-black"
            variant="h4"
          >
            What's Good? |
            <p className="font-sans font-light text-gray-100">
              check out these special cruises and great deals!
            </p>
          </Typography>
        </div>
        <Posts posts={posts} />
      </section>
    </>
  );
}

export default App;
