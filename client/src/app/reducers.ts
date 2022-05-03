import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import login from "feature/login/loginSlice";
import auth from "../feature/login/authSlice";
import myinfo from "../feature/mypage/myinfoSlice"
import posts from '../feature/post/postSlice'
import detailPost from 'feature/post/detailPostSlice';
import trial from '../feature/home/trialSlice';

const persistConfig = {
  key: 'root',
  storage
}
const rootReducer = combineReducers({
  auth,
  login,
  myinfo,
  posts,
  detailPost,
  trial,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
