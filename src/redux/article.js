import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { PrismicClient, Prismic } from '../prismic-config';

export const getPost= createAsyncThunk('post/getPost',async (slug)=>{
  const res = await PrismicClient.getByUID("post_type", slug);
  console.log(res);
  return  await res 
})
 


export const articleSlice = createSlice({
  name: "article",
  initialState: {
    article:{},
    isWorking: true
  },
   
  extraReducers: builder => {
    builder
      .addCase(getPost.pending, (state, { payload }) => {
        state.pending=true
        })
        .addCase(getPost.fulfilled, (state, { payload }) => {
          state.article=payload
          })    
  }
}
)

export default articleSlice.reducer


