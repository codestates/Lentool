import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { User } from '../../services/api'

type AuthState = {
  user: User | null
  token: string | null
}

export const authSlice = createSlice({ 
  name: 'auth',
  initialState: { user: null, token: null} as AuthState,
  reducers: {
    setCredentials: (
      state, 
      { payload: { user, token }}: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = user;
      state.token = token;
    }
  }
})

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
