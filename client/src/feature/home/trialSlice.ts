import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type trialState = {
  trial: any;
};

export const trialSlice = createSlice({
  name: "trial",
  initialState: { trial: null } as trialState,
  reducers: {
    getTrial: (state, { payload: { data } }: PayloadAction<any>) => {
      state.trial = data;
      console.log("받은데이터", data);
    },
  },
});

export const { getTrial } = trialSlice.actions;
export default trialSlice.reducer;
