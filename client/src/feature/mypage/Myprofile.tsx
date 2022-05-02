import { useAppSelector } from "app/hooks"
import { setIsModal } from "feature/modal/modalSlice"

export default function Myprofile () {
  const myinfo = useAppSelector(state => state.myinfo.user)

  const handleEditInfo = () => {
    setIsModal()
  }
  return (
    <div className="w-11/12 mt-10">
      <div className="flex justify-center">
      <img src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
          className="h-20 w-20 xs:h-20 xs:block xs:w-20 lg:h-40 lg:w-40 rounded-full object-cover"
          alt="username"/>
      <div className="ml-10">
        <div className="flex items-center">
          <h2 className="block leading-relaxed font-light text-gray-700 text-3xl">{myinfo.nickname}</h2>
          <a className="cursor-pointer h-7 px-3 ml-3 focus:outline-none hover:border-transparent text-center rounded border border-gray-400 hover:bg-blue-500 hover:text-white bg-transparent text-gray-500 font-semibold">프로필 수정</a>
          
          <button className="flex items-center ml-3 border border-blue-600 hover:bg-blue-600 hover:text-white rounded outline-none focus:outline-none bg-transparent text-blue-600 text-sm py-1 px-2">
              <span className="block">동네인증</span>
              <svg className="block h-5 w-5 pl-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
          </button>
        </div>
        <div className="">
            <h1 className="text-right">주소</h1>
            <h1 className="text-right text-sm text-gray-700">{myinfo.user_address}</h1>
            <h1 className='text-right '>이메일</h1>
            <h1 className='text-right text-sm text-gray-700 mb-4'>{myinfo.email}</h1>
            {/* <h1 className="text-base font-bold font-light">게시물</h1> */}
            <div className='text-right text-sm'>더 이상 사용하지 않음? <a className="text-xs text-blue-500 mt-2 cursor-pointer">회원탈퇴</a></div>
            {/* <a className="block text-base text-blue-500 mt-2" target="_blank">https://tailwindcomponents.com/</a> */}
        </div>
      </div>
    </div>
  </div>
  )
}

    // <div>
    //   {
    //     myinfo && 
    //     <>
    //       <img src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' alt='' 
    //           className='rounded-full w-20'/>
    //       <div>{myinfo.nickname}</div>
    //       <div>{myinfo.user_address}</div>
    //       <div>{myinfo.email}</div>
    //       <button className='bg-sky-500 rounded-full py-1 px-4 text-white'onClick={handleEditInfo}>회원 정보 수정</button>
    //       <div className=''>더 이상 사용하지 않음? <span>회원탈퇴</span></div>
    //     </>
    //   }
    // </div>