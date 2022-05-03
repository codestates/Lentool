import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import login from "feature/login/loginSlice";
import auth from "../feature/login/authSlice";
import myinfo from "../feature/mypage/myinfoSlice";
import posts from "../feature/post/postSlice";
import rooms from "../feature/chat/roomSlice";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  auth,
  login,
  myinfo,
  posts,
  rooms,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
