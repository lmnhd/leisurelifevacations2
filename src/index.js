import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App, {load, LoadPosts} from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import reportWebVitals from "./reportWebVitals";
import PostForm from "./PostForm";
import Post, { LoadPost } from "./Post";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Header";
import UpdatePost from "./UpdatePost";
import Footer from "./Footer";
import { AIPlayground } from "./aiplayground";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: LoadPosts
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
    path: "/updatepost",
    element: <UpdatePost />,
    loader: LoadPost,
  },
  {
    path: "/aipg",
    element: <AIPlayground />,
    
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Header />
        <RouterProvider router={router} />
      <Footer />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
