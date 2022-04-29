import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { User } from '../../services/api'

type AuthState = {
  user: User | null
  token: string | null
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
export const authSlice = createSlice({ 
  name: 'auth',
  initialState: { user: null, token: null, isLogin: false } as AuthState,
  reducers: {
    setCredentials: (
      state, 
      { payload: { data }}: PayloadAction<{ data:any }>
    ) => {
      state.user = data.userInfo
      state.token = data.accessToken;
      state.isLogin = !state.isLogin
      // console.log('user',state.user)
      // console.log('token',state.token)
      // console.log('isLogin',state.isLogin)
    }
  }
})

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;

