import { createSlice } from "@reduxjs/toolkit";

interface modalMyinfoEditState {
  isMyinfoEditModal: boolean;
}
const initialState: modalMyinfoEditState = {
  isMyinfoEditModal: false,
};
export const modalMyinfoEditSlice = createSlice({
  name: "myinfoEdit",
  initialState,
  reducers: {
    setIsMyinfoEditModal: (state) => {
      state.isMyinfoEditModal = !state.isMyinfoEditModal;
    },
  },
});

export const { setIsMyinfoEditModal } = modalMyinfoEditSlice.actions;

export default modalMyinfoEditSlice.reducer;
