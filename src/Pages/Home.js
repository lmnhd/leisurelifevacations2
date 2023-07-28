import React, { useRef, useState } from "react";
// import logo from './logo.svg';
// import "../App.css";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
  Popover,
  PopoverHandler,
  PopoverContent,
  Input,
} from "@material-tailwind/react";
import { useLoaderData } from "react-router-dom";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import logo2 from "../llv-logo-june-2023.png";

import Posts from "../Posts";
import { addEmail, addPost, getPosts } from "../Firebase";
// import PostForm from "./PostForm";
// import Post from "./Post";
// import { getFunctions, httpsCallable } from "firebase/functions";
import axios from "axios";
// import { davinci } from "./api/openAI";
// import { vtg } from "./ScrapeTest";
// import { searchCruises , getCruise} from "./searchCruiseAPI/searchv";
import SearchForm from "../searchCruiseAPI/SearchForm";

// const functions = getFunctions();
// const addMessage = httpsCallable(functions, "addMessage");
// const getAIMessage = httpsCallable(functions, "getAIMessage");

async function check() {
  console.log("check");
  //checkAI()
  return;

  try {
    const response = await axios("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Clear-Site-Data": "*",
      },
      body: JSON.stringify({ animal: "bird" }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw (
        data.error || new Error(`Request failed with status ${response.status}`)
      );
    }
    console.log(data.result);
    //setResult(data.result);
    //setAnimalInput("");
  } catch (error) {
    // Consider implementing your own error handling logic here
    console.error(error);
    alert(error.message);
  }
}

export default function Home() {
  const posts = useLoaderData();
  const [openNav, setOpenNav] = React.useState(false);
  const [aiInputVal, setAIInputVal] = useState("");
  const [signUp, setSignUp] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [signUpMessage, setSignUpMessage] = useState(
    "What's your email address address?"
  );
  const aiInput = useRef(null);

  const saveSignup = () => {
    const query = {
      ["incCT"]: "y",
      ["sm"]: 20248,
      ["sd"]: 5,
      ["tm"]: 20249,
      ["td"]: 12,
      ["r"]: 13,
      ["l"]: 0,
      ["n"]: 0,
      ["d"]: 0,
      ["v"]: 0,
      ["rt"]: 1,
      ["s"]: 0,
    };
    //searchCruises(query)
    addEmail(signUp.email);
    setSignUpMessage("Thank you for signing up!");
  };
  function validateEmail() {
    // Regular expression pattern for email validation
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the pattern
    if (pattern.test(signUp.email)) {
      return true; // Valid email
    } else {
      return false; // Invalid email
    }
  }

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

      <section className="relative bg-[url(https://firebasestorage.googleapis.com/v0/b/leisurelifevacations-52ff1.appspot.com/o/MSC20002483.jpg?alt=media&token=ca035123-a647-42f1-ba2e-894925a94ca6)] bg-cover bg-center bg-no-repeat  bg-blend-overlay ">
        <div className="flex flex-row justify-end">
          <img className="h-14" src={logo2} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white to-white/25 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="relative flex flex-col max-w-screen-xl px-4 py-32 mx-auto sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Your first stop
              <strong className="block font-extrabold text-rose-700">
                on a Fantastic Voyage.
              </strong>
            </h1>

            <p className="max-w-lg px-6 mt-4 text-white bg-blue-800 rounded-lg shadow-md opacity-80 sm:text-xl/relaxed">
              Let us make it happen!
            </p>

            <div className="flex flex-row flex-wrap items-center justify-center gap-4 mt-8 text-center">
              <div className="flex flex-row items-center justify-center opacity-90">
                <Popover placement="bottom">
                  <PopoverHandler>
                    <Button className="bg-blue-300">Join Our Group</Button>
                  </PopoverHandler>
                  <PopoverContent className="items-center p-10 w-96">
                    <h5 className="w-full font-bold text-center text-yellow-900 rounded-sm shadow-sm font-body bg-blue-gray-100">
                      {signUpMessage}
                    </h5>
                    <Input
                      value={signUp.email}
                      placeholder="email address"
                      onChange={(val) => {
                        setSignUp({ ...signUp, email: val.target.value });
                        setSignUpMessage("What's your email?");
                      }}
                    />
                    {validateEmail() ? (
                      <Button onClick={saveSignup} className="w-full">
                        Submit
                      </Button>
                    ) : (
                      <h3 className="font-semibold text-center text-red-700">
                        Enter Valid Email
                      </h3>
                    )}
                  </PopoverContent>
                </Popover>
                {/* <a
                  onClick={check}
                  href="#"
                  className="block w-full px-12 py-3 text-lg font-bold text-black bg-orange-100 rounded shadow-lg opacity-75 bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                >
                  Join Our Group
                </a> */}
              </div>
              <hr className="my-10" />
            </div>
          </div>
          <div className="w-full pt-8 text-center align-middle border-white">
            <div className="gap-3 mt-8 rounded-md shadow-md ">
              {/* <i className="fa fa-computer fa-lg" /> */}
              <Typography
                variant="h8"
                className="font-semibold text-red-900 border-t-2 rounded-md opacity-80 "
              >
                AI Travel Agent
              </Typography>
            </div>
            <div className="flex flex-col w-full">
              <Typography className="mb-1 " variant="h5"></Typography>
              <label className="font-bold text-center ">
                Where would you like to go?
              </label>
              <input
                id="ai-input"
                ref={aiInput}
                className="h-12 text-center rounded-lg"
                placeholder="ex: The Caribbean for my anniversary this Fall"
                onChange={handleAIInputChange}
                value={aiInputVal}
              />
              {aiInputVal != "" && (
                <button className="p-4 text-red-700 bg-gray-200 border-t-2 border-black rounded-lg shadow-sm hover:text-black">
                  SEARCH WITH AI -{" "}
                  <span className="text-black font-extralight">
                    {" "}
                    (coming soon!)
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* SEARCH */}
      <div className="z-50">
        <SearchForm />
      </div>

      {/* <Post/> */}
      <section className="-z-10">
        <div className="flex flex-auto p-1 bg-blue-700 ">
          <div className="flex flex-col" >
            <i className="float-left p-2 fa fa-thin fa-ship fa-2x" />
          </div>
          <Typography
            className="w-full text-right border-l-2 border-black"
            variant="p"
          >
            What's Good? |
            <p className="font-sans font-light text-gray-100 capitalize">
              check out these special cruises and great deals!
            </p>
          </Typography>
        </div>
        <Posts posts={posts} />
      </section>
    </>
  );
}
