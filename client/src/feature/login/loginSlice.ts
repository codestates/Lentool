import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {  } from 'redux-persist'

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
      // console.log(state.isLogin)
    },
  },
})

export const { setLogin } = loginSlice.actions;
export default loginSlice.reducer;

