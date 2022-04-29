import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { User } from '../../services/api'

type myinfoState = {
  user: User | null
  post: [] | null
}

export const myinfoSlice = createSlice({ 
  name: 'myinfo',
  initialState: { user: null, post: null} as myinfoState,
  reducers: {
    getMyinfo: (
      state, 
      { payload: { data }}: PayloadAction<{ data:any }>
    ) => {
      state.user = data.userinfo
      state.post = data.user_posts;
      // console.log('user',state.user)
      // console.log('token',state.token)
    }
  }
})

export const { getMyinfo } = myinfoSlice.actions;
export default myinfoSlice.reducer;

