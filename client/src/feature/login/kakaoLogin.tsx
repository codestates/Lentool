import { setCredentials, setNewChat } from "./authSlice";
import { setLogin } from "./loginSlice";
import { setIsModal } from "../modal/modalSlice";
import { getPosts } from "feature/post/postSlice";
import { getMyinfo } from "feature/mypage/myinfoSlice";
import { useOauthLoginMutation } from "../../services/api";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";

export default function KakaoLogin() {
  const url = new URL(window.location.href);
  const authorizationCode = url.searchParams.get("code");
  const dispatch = useAppDispatch();

  const [oauthLogin, { data, isLoading, isSuccess }] = useOauthLoginMutation();

  const handleLogin = async () => {
    const user = await oauthLogin(authorizationCode).unwrap();
    console.log(user);
    if (user.message === "ok") {
      console.log("로그인 완료 프로세스");
    } else if (user.message === "회원가입 필요") {
      console.log("추가 정보 입력 창");
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);
  return <div>hello</div>;
}
