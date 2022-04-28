import { useAppSelector } from "app/hooks"
import { useLoginMutation, useLogoutMutation } from "services/api"

export default function Myprofile () {
  const importUser = useAppSelector(state => state.auth.user)
  const [logout, { data, error, isLoading }] = useLogoutMutation()
  const { user_photo, nickname, user_address, email }:any = importUser
  console.log(importUser)
  const hand = async () => {
    await logout()
  }
  return (
    <div>
      { importUser && 
      <div>
        <div>{user_photo}</div> 
        <div>{nickname}</div> 
        <div>{user_address}</div>
        <div>{email}</div>
        <button onClick={hand}>헤더보내라</button>
      </div>
      }
    </div>
  )
}