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
  }, [isSuccess]);

  return <div>{isLoading && <Loading />}</div>;
}
