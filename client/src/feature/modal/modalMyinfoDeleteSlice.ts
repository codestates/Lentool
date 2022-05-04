import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type AuthState = {
//   user: User | null
//   token: string | null
// }
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
