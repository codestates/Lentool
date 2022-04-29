import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
// import type { User } from '../../services/api'

// type AuthState = {
//   user: User | null
//   token: string | null
//   isLogin: boolean
// }
type redirectState = {
  accessToken: string | undefined
}
const initialState: redirectState = {
  accessToken: ''
}
export const redirectSlice = createSlice({ 
  name: 'redirect',
  initialState,
  reducers: {
    redirect: (state, action: PayloadAction<string | undefined>) => {
      state.accessToken = action.payload
      console.log(action.payload)
      // console.log(action.payload)
    }
  }
})

export const { redirect } = redirectSlice.actions;
export default redirectSlice.reducer;
