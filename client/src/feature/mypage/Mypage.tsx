import { useAppSelector } from "app/hooks"
import { useLoginMutation } from "services/api"

export default function Mypage () {
  const importUser = useAppSelector(state => state.auth.user)
  const { user_photo, nickname, user_address, email }:any = importUser
  console.log(importUser)
  const [login, { data, isLoading, isSuccess }] = useLoginMutation()
  console.log(isSuccess)
  return (
    <div>
      { importUser && 
      <div>
        <div>{user_photo}</div> 
        <div>{nickname}</div> 
        <div>{user_address}</div>
        <div>{email}</div> 
      </div>
      }
    </div>
  )
}