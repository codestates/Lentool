import { setCredentials, setNewChat } from "./authSlice";
import { setLogin } from "./loginSlice";
import { getMyinfo } from "feature/mypage/myinfoSlice";
import { useMypageMutation, useOauthQuery } from "../../services/api";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useHistory } from "react-router-dom";
import Loading from "feature/indicator/Loading";

export default function KakaoLogin() {
  const { push } = useHistory();
  const url = new URL(window.location.href);
  const authorizationCode = url.searchParams.get("code");
  const dispatch = useAppDispatch();

  const [mypage] = useMypageMutation();
  const { data, isLoading, isSuccess } = useOauthQuery(authorizationCode);

  const handlemypage = async () => {
    dispatch(setNewChat(data.data.userInfo.newchat));
    const user1 = await mypage().unwrap();
    dispatch(getMyinfo(user1));
    dispatch(setLogin(true));
    localStorage.setItem("myinfo", JSON.stringify(user1));

    push("/");
  };

  // const user = await login(inputValue).unwrap();

  // dispatch(setCredentials(user));
  // dispatch(setNewChat(user.data.userInfo.newchat));
  // const user1 = await mypage().unwrap();
  // dispatch(getMyinfo(user1));
  // dispatch(setIsModal());
  // localStorage.setItem("user", JSON.stringify(user));
  // localStorage.setItem("myinfo", JSON.stringify(user1));
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials(data));
      localStorage.setItem("user", JSON.stringify(data));
      if (data.message === "ok") {
        handlemypage();
      } else {
        push("/oauth/signup");
      }
    }
  }, [isSuccess]);

  return <div>{isLoading && <Loading />}</div>;
}
