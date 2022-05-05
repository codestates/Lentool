import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type searchState = {
  search: any | null;
};

export const searchSlice = createSlice({
  name: "search",
  initialState: { search: [] } as searchState,
  reducers: {
    getSearch: (state, action: PayloadAction<any>) => {
      state.search = action.payload.data.data.posts;
      console.log(state.search)
    },
  },
});

export const { getSearch } = searchSlice.actions;
export default searchSlice.reducer;
