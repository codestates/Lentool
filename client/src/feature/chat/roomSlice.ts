import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type roomState = {
  rooms: any[] | null;
};

export const roomSlice = createSlice({
  name: "room",
  initialState: { rooms: [] } as roomState,
  reducers: {
    getroom: (state, { payload: { data } }: PayloadAction<{ data: any }>) => {
      state.rooms = data;
      // console.log(data);
      // console.log('user',state.user)
      // console.log('token',state.token)
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(REHYDRATE, (state) => {
  //     console.log('in rehydrated state')
  //   })
  // }
});

export const { getroom } = roomSlice.actions;
export default roomSlice.reducer;
