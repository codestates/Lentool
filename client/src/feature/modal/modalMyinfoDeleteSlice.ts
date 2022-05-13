import { createSlice } from "@reduxjs/toolkit";

interface modalMyinfoDeleteState {
  isMyinfoDeleteModal: boolean;
}
const initialState: modalMyinfoDeleteState = {
  isMyinfoDeleteModal: false,
};
export const modalMyinfoDeleteEditSlice = createSlice({
  name: "myinfoDelete",
  initialState,
  reducers: {
    setIsMyinfoDeleteModal: (state) => {
      state.isMyinfoDeleteModal = !state.isMyinfoDeleteModal;
    },
  },
});

export const { setIsMyinfoDeleteModal } = modalMyinfoDeleteEditSlice.actions;

export default modalMyinfoDeleteEditSlice.reducer;
