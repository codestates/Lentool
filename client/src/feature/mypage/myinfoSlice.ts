import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type myinfoState = {
  user: any | null;
  post: [] | null;
};

export const myinfoSlice = createSlice({
  name: "myinfo",
  initialState: { user: null, post: null } as myinfoState,
  reducers: {
    getMyinfo: (state, { payload: { data } }: PayloadAction<{ data: any }>) => {
      state.user = data.userinfo;
      state.post = data.user_posts;
      console.log("user", state.user);
      // console.log('token',state.token)
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(REHYDRATE, (state) => {
  //     console.log('in rehydrated state')
  //   })
  // }
});

export const { getMyinfo } = myinfoSlice.actions;
export default myinfoSlice.reducer;
