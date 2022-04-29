import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from '../services/api'
import authReducer from '../feature/login/authSlice'
import modalReducer from '../feature/modal/modalSlice'
import myinfoReducer from '../feature/mypage/myinfoSlice'
import loginReducer from '../feature/login/loginSlice'
// import redirectReducer from 'feature/login/redirectSlice';
export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    myinfo: myinfoReducer,
    login: loginReducer,
    // redirect: redirectReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch)
