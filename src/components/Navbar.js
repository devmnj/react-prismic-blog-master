import React from "react";
import { NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="">
      <div className="flex flex-cols-2 ">
        <h1 className=" pl-6  py-4 text-green-600 text-3xl font-black">
          React Blog
        </h1>
        <div className="font-bold text-green-600 absolute top-0 right-0 text-xl pr-3 py-6">
          <NavLink className=" hover:text-red-400 p-2 " to="/">
            Home
          </NavLink>
          <a
            className="hover:text-red-400 p-2  pl-2"
            href="https://codehat.vercel.app"
          >
            Vue Blog
          </a>
          <a
            className="hover:text-red-400 p-2  pl-2"
            href="https://javascriptsu.wordpress.com"
          >
           JSU
          </a>
        </div>
      </div>
    </nav>
  );
}
