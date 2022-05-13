import { setCredentials, setNewChat } from "./authSlice";
import { setLogin } from "./loginSlice";
import { setIsModal } from "../modal/modalSlice";
import { getPosts } from "feature/post/postSlice";
import { getMyinfo } from "feature/mypage/myinfoSlice";
import {
  useMypageMutation,
  useOauthLoginMutation,
  useOauthQuery,
  useOauthSignupMutation,
} from "../../services/api";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useHistory } from "react-router-dom";
import Loading from "feature/indicator/Loading";

export default function KakaoLogin() {
  const { push } = useHistory();
  const url = new URL(window.location.href);
  const authorizationCode = url.searchParams.get("code");
  const dispatch = useAppDispatch();

  // const [oauthLogin, { data, isLoading, isSuccess }] = useOauthLoginMutation();
  const [mypage] = useMypageMutation();
  const { data, isLoading, isSuccess } = useOauthQuery(authorizationCode);

  console.log(data);
  // console.log(data.message)
  const handlemypage = async () => {
    dispatch(setNewChat(data.data.userInfo.newchat));
    const user1 = await mypage().unwrap();
    dispatch(getMyinfo(user1));
    dispatch(setLogin(true));
    push("/");
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials(data));
      if (data.message === "ok") {
        handlemypage();
      } else {
        push("/oauth/signup");
      }
    }
  });

  return <div>{isLoading && <Loading />}</div>;
}
