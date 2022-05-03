import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "../services/api";
import authReducer from "../feature/login/authSlice";
import modalReducer from "../feature/modal/modalSlice";
import myinfoReducer from "../feature/mypage/myinfoSlice";
import loginReducer from "../feature/login/loginSlice";
import postsReducer from "../feature/post/postSlice";
<<<<<<< HEAD
import myinfoEditReducer from "../feature/modal/modalMyinfoEditSlice";
import myinfoDeleteReducer from "../feature/modal/modalMyinfoDeleteSlice";
=======
import detailPostReducer from "feature/post/detailPostSlice";
import trialReducer from "../feature/home/trialSlice";
import roomReducer from "../feature/chat/roomSlice";
>>>>>>> 3ab539747f8780e5000a4e2294c24fa282a96740

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
    login: loginReducer,
    posts: postsReducer,
<<<<<<< HEAD
    myinfoEdit: myinfoEditReducer,
    myinfoDelete: myinfoDeleteReducer,
=======
    detailPost: detailPostReducer,
    trial: trialReducer,
    room: roomReducer,

>>>>>>> 3ab539747f8780e5000a4e2294c24fa282a96740
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
