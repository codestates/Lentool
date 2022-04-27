import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../login/login";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setIsModal } from '../modal/modalSlice'

export default function Navbar () {
  const isModal = useAppSelector(state => state.modal.isModal)
  const dispatch = useAppDispatch()
  const handleModal = (e: any) => {
    e.preventDefault();
    dispatch(setIsModal())
  }
  console.log('isModal',isModal)

  return (
    <div>
      <nav className="border-2 border-dashed border-blue-300">
        <div className="flex">
          <svg className="h-10 w-10 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <input className="border-2 border-dashed border-rose-500" type="text" placeholder="search" />
          {/* <Link className="" to="/login">로그인</Link> */}
          <a href="#javascript" onClick={handleModal}>로그인</a>
        </div>
      </nav>
      <div>
      {
        isModal ? <Login /> : null
      }
      </div>
    </div>
  )
}

