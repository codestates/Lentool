import { createSlice } from '@reduxjs/toolkit'

interface modalState {
  isModal: boolean;
}
const initialState: modalState = {
  isModal: false
}
export const modalSlice = createSlice({ 
  name: 'modal',
  initialState,
  reducers: {
    setIsModal: (state) => {
      state.isModal = !state.isModal
    }
  }
})

export const { setIsModal } = modalSlice.actions;

export default modalSlice.reducer;
