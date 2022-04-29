import { useAppSelector } from "app/hooks"
import { setIsModal } from "feature/modal/modalSlice"
import { useLoginMutation, useLogoutMutation, useMypageMutation } from "services/api"
import MyinfoEdit from "./MyinfoEdit"

export default function Myprofile () {
  // const importUser = useAppSelector(state => state.auth.user)
  const myinfo = useAppSelector(state => state.myinfo.user)
  // const [logout, { data, error, isLoading }] = useLogoutMutation()
  // const [mypage, { data, error, isLoading }] = useMypageMutation()
  // const { user_photo, nickname, user_address, email }:any = myinfo
  // const { data, error, isLoading }:any = useMyQuery()
  // console.log(data, error, isLoading)
  // console.log(data.data.userinfo)
  // const setData = data.data.userinfo
  const handleEditInfo = () => {
    setIsModal()
    // const logoutRequest = await logout().unwrap()
    // console.log(logoutRequest)
  }
  return (
    <div>
      {/* { error ? (
        <>error</>
      ) : isLoading ? (
        <>loading</>
      ) : data ? (
        <>
          <div>
            <div>{data.data.userinfo.user_photo}</div> 
            <div>{data.data.userinfo.nickname}</div> 
            <div>{data.data.userinfo.user_address}</div>
            <div>{data.data.userinfo.email}</div>
            <button className='bg-sky-500 rounded-full py-1 px-4 text-white'onClick={logu}>회원 정보 수정</button>
            <div className=''>더 이상 사용하지 않음? <span>회원탈퇴</span></div>
          </div>
        </>
      ): null} */}
      {
        myinfo && 
        <>
          <div>{myinfo.nickname}</div>
          <div>{myinfo.user_photo}</div>
          <div>{myinfo.user_address}</div>
          <div>{myinfo.email}</div>
          <button className='bg-sky-500 rounded-full py-1 px-4 text-white'onClick={handleEditInfo}>회원 정보 수정</button>
          <div className=''>더 이상 사용하지 않음? <span>회원탈퇴</span></div>
          {/* {
            isModal ? <MyinfoEdit /> : null;
          } */}
        </>
        
      }
    </div>
  )
}