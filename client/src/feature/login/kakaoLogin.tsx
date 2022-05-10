import { setCredentials, setNewChat } from "./authSlice";
import { setLogin } from "./loginSlice";
import { setIsModal } from "../modal/modalSlice";
import { getPosts } from "feature/post/postSlice";
import { getMyinfo } from "feature/mypage/myinfoSlice";
import { useOauthLoginMutation, useOauthQuery } from "../../services/api";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export default function KakaoLogin() {
  const url = new URL(window.location.href);
  const authorizationCode = url.searchParams.get("code");
  const dispatch = useAppDispatch();

  // const [oauthLogin, { data, isLoading, isSuccess }] = useOauthLoginMutation();
  const { data, isLoading, isSuccess } = useOauthQuery(authorizationCode)
  if (isSuccess) {
    dispatch(setCredentials(data));
  }
  const [userUpdate, setUserUpdate] = useState({})
  const handle = () => {
    setUserUpdate({
      latitude: 37.333333,
      longitude: 37.333333,
      nickname:'koko',
      user_address:'제주특별시'
    })
  }
  // console.log(data.data.userInfo)
  console.log(userUpdate)

  return (
  <div>
    <button onClick={handle}>바꿔줌</button>
  </div>
  )
}
