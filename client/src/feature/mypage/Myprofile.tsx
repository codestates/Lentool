import { useAppSelector } from "app/hooks"
import { useLoginMutation, useLogoutMutation, useMypageMutation } from "services/api"

export default function Myprofile () {
  const importUser = useAppSelector(state => state.auth.user)
  const [logout, { data, error, isLoading }] = useLogoutMutation()
  // const [mypage, { data, error, isLoading }] = useMypageMutation()
  const { user_photo, nickname, user_address, email }:any = importUser
  // console.log(importUser)
  // const hand = async () => {
  //   const mypageRequest = await mypage().unwrap()
  //   console.log(mypageRequest)
  // }
  const logu = async () => {
    const logoutRequest = await logout().unwrap()
    console.log(logoutRequest)
  }
  console.log(data)
  return (
    <div>
      { importUser && 
      <div>
        <div>{user_photo}</div> 
        <div>{nickname}</div> 
        <div>{user_address}</div>
        <div>{email}</div>
        <button onClick={logu}>헤더보내라</button>
      </div>
      }
    </div>
  )
}