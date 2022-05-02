import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { REHYDRATE } from 'redux-persist'

type postsState = {
  posts: any
}

export const postsSlice = createSlice({ 
  name: 'posts',
  initialState: { posts: null } as postsState,
  reducers: {
    getPosts: (
      state, 
      { payload: { data }}: PayloadAction<{ data:any }>
    ) => {
      state.posts = data
      // console.log('받은데이터',data)
    }
  },

})

export const { getPosts } = postsSlice.actions;
export default postsSlice.reducer;

