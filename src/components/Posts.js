import React, { useState, useEffect } from 'react';
import { PrismicClient, Prismic } from '../prismic-config';
import {  RichText } from 'prismic-reactjs'
import Dots from './loaders/minimalist/Dots';
import { useSelector, useDispatch } from 'react-redux'
import {getPosts} from "../redux/posts"

export default function AllPosts() {
  const dispatch = useDispatch();
  const {posts} = useSelector(state =>state.allPostData);
  dispatch(getPosts())

  if (!posts) return (<div className="min-h-screen">
    <Dots />
  </div>);
  // console.log(allPostData);
  // console.log(posts.results.filter((p)=>p.uid===slug));

  return (
    <div className="bg-blue-100 min-h-screen p-12">
      <div className="container mx-auto">
        <h2 className="text-5xl flex justify-center pb-4 font-bold text-purple-700">Latest Posts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.results && posts.results.map((post, index) => (
            <a href={"/" + post.uid}>
              <span className="border-l-8 border-purple-500 block bg-white border-l-8  h-64 relative rounded shadow leading-snug " key={index}>
                <img className="rounded-3 object-cover w-full h-full absolute" src={post.data.featured_img_link.url} alt="featured" />
                <span className="block  relative h-full flex justify-end items-end pr-2 pb-4">
                  <h1 className="text-2xl font-bold px-3 py-4 bg-green-700 bg-opacity-75 rounded text-red-100">
                    {RichText.asText(post.data.title)}
                  </h1>
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div >
  );
}
