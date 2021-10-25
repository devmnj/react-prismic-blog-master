import { configureStore } from "@reduxjs/toolkit";

import postReducer from "./posts";
import articleReducer from "./article";

export default configureStore({
  reducer: { allPostData: postReducer, 
    article: articleReducer },
});
