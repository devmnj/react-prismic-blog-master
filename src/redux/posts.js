import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { PrismicClient, Prismic } from '../prismic-config';

 
export const getPosts= createAsyncThunk('post/getPosts',async ()=>{
  const res = await PrismicClient.query(
    Prismic.Predicates.at('document.type', 'post_type')
  );
  return await res 
})


export const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: Object,
    isWorking: true
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts=action.payload
      console.log('changed state ' + state.posts)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getPosts.fulfilled, (state, { payload }) => {
      state.posts=payload
      })
      .addCase(getPosts.pending, (state, { payload }) => {
        state.pending=true
        })
      
  }
}
)

export const { setPosts } = postSlice.actions
export default postSlice.reducer


