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
      { payload: { user, token }}: PayloadAction<{ user: User, token: string }>
    ) => {
      state.user = user
      state.token = token;
      state.isLogin = !state.isLogin
      console.log(state.user)
      console.log(state.token)
      console.log(state.isLogin)
    }
    // setCredentials: (state) => {
    //   state.token += state
    // }
  }
})

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;

