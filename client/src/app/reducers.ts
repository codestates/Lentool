import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import login from "feature/login/loginSlice";
import auth from "../feature/login/authSlice";
import myinfo from "../feature/mypage/myinfoSlice";
import posts from "../feature/post/postSlice";
import rooms from "../feature/chat/roomSlice";
import search from "../feature/navbar/searchSlice";
import { api } from "services/api";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [api.reducerPath]
};
const rootReducer = combineReducers({
  auth,
  login,
  myinfo,
  posts,
  rooms,
  search,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
