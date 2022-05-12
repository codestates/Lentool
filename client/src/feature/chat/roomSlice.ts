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
    },
  },
});

export const { getroom } = roomSlice.actions;
export default roomSlice.reducer;
