import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { User } from '../../services/api'
// import storage from 'redux-persist/lib/storage'

type AuthState = {
  user: any | null
  token: string | null
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
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state, 
      { payload: { data }}: PayloadAction<{ data:any }>
    ) => {
      state.user = data.userInfo
      state.token = data.accessToken;
    },
  }
})
// export const authReducer = persistReducer({
//   key: 'rtk: auth',
//   storage,
//   whitelist: ['accessToken']
// }, authSlice.reducer)
// }
export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;

