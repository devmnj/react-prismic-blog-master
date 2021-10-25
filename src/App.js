import { BrowserRouter, Route } from "react-router-dom";
import SinglePost from "./components/SinglePost.js";
import AllPosts from "./components/Posts.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import React from "react";
// import Loader from "react-loader-spinner";
function App() {
  console.log('API'+ process.env.REACT_APP_API);
  return (
    <div>
      
      <BrowserRouter>
        <Navbar />
        <Route path="/" component={AllPosts} exact />
        <Route path="/:slug" component={SinglePost} />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
