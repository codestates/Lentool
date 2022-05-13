import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "../services/api";
import authReducer from "../feature/login/authSlice";
import modalReducer from "../feature/modal/modalSlice";
import myinfoReducer from "../feature/mypage/myinfoSlice";
import mycontentReducer from "../feature/mypage/myinfoSlice";
import loginReducer from "../feature/login/loginSlice";
import postsReducer from "../feature/post/postSlice";
import roomReducer from "../feature/chat/roomSlice";
import myinfoEditReducer from "../feature/modal/modalMyinfoEditSlice";
import myinfoDeleteReducer from "../feature/modal/modalMyinfoDeleteSlice";
import searchReducer from "../feature/navbar/searchSlice";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import persistedReducer from "./reducers";

export const store = configureStore({
  reducer: {
    persistedReducer,
    modal: modalReducer,
    auth: authReducer,
    myinfo: myinfoReducer,
    mycontent: mycontentReducer,
    login: loginReducer,
    posts: postsReducer,
    room: roomReducer,
    myinfoEdit: myinfoEditReducer,
    myinfoDelete: myinfoDeleteReducer,
    search: searchReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
