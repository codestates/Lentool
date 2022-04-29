import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { User } from '../../services/api'
// import storage from 'redux-persist/lib/storage'
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

type loginState = {
  isLogin: boolean
}
// interface authState {
//   user: User;
//   token: string;
// }
// const initialState: authState = {
//   user: null
//   token: null
// }
export const loginSlice = createSlice({ 
  name: 'login',
  initialState: { isLogin: false } as loginState,
  reducers: {
    setLogin: (
      state, 
      action: PayloadAction<boolean>
    ) => {
      state.isLogin = action.payload
      console.log(state.isLogin)
      // console.log('user',state.user)
      // console.log('token',state.token)
      // console.log('isLogin',state.isLogin)
    },
  }
})
// export const loginReducer = persistReducer({
//   key: 'rtk: login',
//   storage,
//   whitelist: ['accessToken']
// }, loginSlice.reducer)
// }
export const { setLogin } = loginSlice.actions;
export default loginSlice.reducer;

