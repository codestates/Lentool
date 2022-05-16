import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

type myinfoState = {
  user: any | null;
  post: any | null;
};
const initialState: myinfoState = {
  user: null,
  post: null, 
}

export const myinfoSlice = createSlice({
  name: "myinfo",
  initialState,
  reducers: {
    getMyinfo: (state, { payload: { data } }: PayloadAction<{ data: any }>) => {
      state.user = data.userinfo;
      state.post = data.user_posts;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState)
  }
});

export const { getMyinfo } = myinfoSlice.actions;
export default myinfoSlice.reducer;
