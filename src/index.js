import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App, { load, LoadPosts } from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import reportWebVitals from "./reportWebVitals";
import PostForm from "./PostForm";
import Post, { LoadPost } from "./Post";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Header";
import UpdatePost from "./UpdatePost";
import Footer from "./Footer";
import { AIPlayground } from "./aiplayground";
import EditPosts from "./EditPosts";
import SearchForm from "./searchCruiseAPI/SearchForm";
import ShowResult, { LoadCruiseData } from "./searchCruiseAPI/ShowResult";
import 'semantic-ui-css/semantic.min.css'
import Home from "./Pages/Home";
import HomeVideoImage from "./Components/Layout/HomeVideoImage";

export const appRoutes = [
  {
    path: "/",
    element: <Home />,
    loader: LoadPosts,
  },
  {
    path: "/pg",
    element: <HomeVideoImage />,
    loader: LoadPosts,
  },
  {
    path: "/editPosts",
    element: <EditPosts />,
    loader: LoadPosts,
  },
  {
    path: "/updatepost/:id",
    element: <UpdatePost />,
    loader: LoadPost,
  },
  {
    path: "/addPost",
    element: <PostForm post={null} update={false} />,
  },
  {
    path: "/post/:id",
    element: <Post post={null} update={false} />,
    loader: LoadPost,
  },

  {
    path: "/aipg",
    element: <AIPlayground />,
  },
  {
    path: "/search",
    element: <SearchForm />
  },
  {
    path: "/searchresult/:cruise/:ship",
    element: <ShowResult />,
    loader: LoadCruiseData
  },

];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App/>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
