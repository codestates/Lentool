import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type loginState = {
  isLogin: boolean
}

export const loginSlice = createSlice({ 
  name: 'login',
  initialState: { isLogin: false } as loginState,
  reducers: {
    setLogin: (
      state, 
      action: PayloadAction<boolean>
    ) => {
      state.isLogin = action.payload
    },
  },
})

export const { setLogin } = loginSlice.actions;
export default loginSlice.reducer;

