import React, { useRef, useState } from "react";
// import logo from './logo.svg';
import "./App.css";
// import "./Components/Layout/logostyle.css"
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
import {
  useLoaderData,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "./llv-logo-june-2023.png";
import logo2 from "./llv-logo-june-2023.png";
import Footer from "./Footer";
import Posts from "./Posts";
import { addEmail, addPost, getPosts } from "./Firebase";
import PostForm from "./PostForm";
import Post from "./Post";
import { getFunctions, httpsCallable } from "firebase/functions";
import axios from "axios";
import { davinci } from "./api/openAI";
import { vtg } from "./ScrapeTest";
import { searchCruises, getCruise } from "./searchCruiseAPI/searchv";
import SearchForm from "./searchCruiseAPI/SearchForm";
import { appRoutes } from ".";

// const functions = getFunctions();
// const addMessage = httpsCallable(functions, "addMessage");
// const getAIMessage = httpsCallable(functions, "getAIMessage");

export async function LoadPosts() {
  const posts = await getPosts();
  return posts;
}



function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,

      children: appRoutes
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}
export default App;
