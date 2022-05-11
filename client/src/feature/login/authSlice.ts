import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { User } from "../../services/api";
// import storage from 'redux-persist/lib/storage'

type AuthState = {
  user: any | null;
  token: string | null;
  newchat: boolean | null;
};
// interface authState {
//   user: User;
//   token: string;
// }
// const initialState: authState = {
//   user: null
//   token: null
// }
export const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, newchat: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { data } }: PayloadAction<{ data: any }>
    ) => {
      state.user = data.userInfo;
      state.token = data.accessToken;
    },
    setNewChat: (state, action: PayloadAction<any>) => {
      state.newchat = action.payload;
    },
  },
});

export const { setCredentials, setNewChat } = authSlice.actions;
export default authSlice.reducer;
