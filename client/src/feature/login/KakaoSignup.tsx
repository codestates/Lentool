import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState } from "react"
import { useOauthSignupMutation } from "services/api"
import { setCredentials, setNewChat } from "./authSlice";
import { setLogin } from "./loginSlice";
import { useHistory } from "react-router-dom";

export default function KakaoSignup () {
  const { push } = useHistory()
  const dispatch = useAppDispatch()
  const [userUpdate, setUserUpdate] = useState({})
  const [oauth] = useOauthSignupMutation();

  const handle = () => {

    setUserUpdate({
      latitude: 37.333333,
      longitude: 37.333333,
      nickname:'koko',
      user_address:'제주특별시'
    })
  }
  const handle2 = async () => {
    const req = await oauth(userUpdate).unwrap()
    dispatch(setCredentials(req));
    dispatch(setNewChat(req.data.userInfo.newchat));
    dispatch(setLogin(true));
    push('/')
  }
  
  return (
    <div>
      <button onClick={handle}>바꿔줌</button>
      <button onClick={handle2}>보냄</button>
    </div>
  )
}