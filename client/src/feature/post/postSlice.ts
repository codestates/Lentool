import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type postsState = {
  posts: any;
};

export const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: null } as postsState,
  reducers: {
    getPosts: (state, { payload: { data } }: PayloadAction<{ data: any }>) => {
      state.posts = data;
    },
  },
});

export const { getPosts } = postsSlice.actions;
export default postsSlice.reducer;
