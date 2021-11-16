import React, { useEffect, useState } from "react";
import { PrismicClient } from "../prismic-config.js";
import { RichText } from "prismic-reactjs";
import { useParams } from "react-router-dom";
import Snippet from "./Snippet";
import { DiscussionEmbed } from "disqus-react";
import Wave from "./loaders/minimalist/Wave.js";
import { getPost } from "../redux/article.js";
import { useDispatch } from "react-redux";
const linkResolver = (doc) => {
  // Pretty URLs for known types
  //console.log('slug->'+doc.slug);
  if (doc.type === "blog") return `/post/${doc.uid}`;
  if (doc.type === "post") return `/${doc.slug}`;
  // Fallback for other types, in case new custom types get created
  return `/doc/${doc.id}`;
};

class Slices extends React.Component {
  render() {
    if (this.props.slices) {
      const pageContent = this.props.slices.map((slice, index) => {
        if (slice.slice_type === "heading_slice") {
          return (
            <div className="font-bold text-2xl ">
              {RichText.render(slice.primary.header_rich_text_field)}
            </div>
          )
        } else if (slice.slice_type === "paragraph_slice") {
          return (
            <div className="text-justify text-2xl">
              {RichText.render(
                slice.primary.paragraph_rich_text_field,
                linkResolver
              )}
            </div>
          )
        } else if (slice.slice_type === "code_slice") {
          return (
            <div className="relative">
              <Snippet code={RichText.asText(slice.primary.cod_text_field)} />
            </div>
          )
        }
        else{
          return null
        }
      })
      return pageContent;
    }
  }
}

export default   function SinglePost() {
  const { slug } = useParams();

  // const { postData11 } = JSON.stringify(useSelector((state) => state.article));
  const dispatch = useDispatch();
   dispatch(getPost(slug))
  
  const [postData, setPost] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const res = await PrismicClient.getByUID("post_type", slug);

      if (res) {
        setPost(res);
      }
    };
    fetch();
  }, []);

  if (!postData)
    return (
      <div className="min-h-screen">
        <Wave />
      </div>
    );
    

  return (
    <div className="bg-purple-100">
      <div className="px-16 py-5 rounded-3    ">
        <div className="mx-16 mt-0  rounded-xl bg-red-300 min-h-screen pb-2 ">
          <div className=" relative">
            <div className="flex justify-around items-center">
              <div className="absolute h-full  flex items-center justify-around px-1">
                <div className="bg-white bg-opacity-75 rounded ">
                  <h1 className="text-3xl lg:text-5xl font-black text-center text-purple-900 px-3  py-3">
                    {RichText.asText(postData.data.title)}
                  </h1>

                  <div className="bg-green-500 flex justify-center text-grey-800">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={postData.data.featured_img_link.url}
                      alt="featured"
                    />
                    <h4 className="flex items-center pl-2 text-2xl">Manoj</h4>
                  </div>
                  <h1 className="text-2xl lg:text-xl italic text-center font-bold text-red-800 mb-3 px-2 mt-2">
                    {RichText.asText(postData.data.post_excerpt)}
                  </h1>
                </div>
              </div>

              <img
                className="w-full object-cover p-4 rounded-3xl p-2"
                style={{ height: "400px" }}
                src={postData.data.featured_img_link.url}
                alt="featured"
              />
            </div>
            <div className="px-9 py-8">
              <Slices language="JavaScript" slices={postData.data.body} />
            </div>

            <div className="m-12 px-9 py-8">
              <DiscussionEmbed
                shortname={process.env.REACT_APP_DSQ}
                config={{
                  url: postData.data.uid,
                  identifier: postData.data.uid,
                  title: postData.data.title,
                  language: "zh_TW", //e.g. for Traditional Chinese (Taiwan)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
