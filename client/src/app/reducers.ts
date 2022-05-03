import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import login from "feature/login/loginSlice";
import auth from "../feature/login/authSlice";
import myinfo from "../feature/mypage/myinfoSlice";
import posts from "../feature/post/postSlice";
<<<<<<< HEAD
=======
import detailPost from "feature/post/detailPostSlice";
import trial from "../feature/home/trialSlice";
import rooms from "../feature/chat/roomSlice";
>>>>>>> 3ab539747f8780e5000a4e2294c24fa282a96740

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  auth,
  login,
  myinfo,
  posts,
<<<<<<< HEAD
=======
  detailPost,
  trial,
  rooms,
>>>>>>> 3ab539747f8780e5000a4e2294c24fa282a96740
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
