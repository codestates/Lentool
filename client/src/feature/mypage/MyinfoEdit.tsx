import * as React from 'react';
import { useState, useRef, useEffect } from 'react'
import { useAppDispatch } from "../../app/hooks";
import { setIsModal } from "../modal/modalSlice"

function MyinfoEdit () {
  const dispatch = useAppDispatch()
  const outSelect = useRef<any>()
  const [inputValue, setInputValue] = useState({
    id: '',
    password: '',
  })

  const handleInputValue = (key: string) => (e: { target: { value: string; }; }) => {
    setInputValue({ ...inputValue, [key]: e.target.value });
  }
  const handleSubmit = async () => {
    try {
      dispatch(setIsModal())
    } catch (err) {
      console.log('error', err)
    }
  }
  const handleOutClick = (e: any) => {
    e.preventDefault()
    if(e.target === outSelect.current) dispatch(setIsModal())
  }

  return (
    <div className="h-screen w-full absolute bg-black bg-opacity-70 text-center"
      ref={outSelect} onClick={handleOutClick}>
      <div className="bg-white absolute top-1/4 left-1/3 rounded w-10/12 md:w-1/3">
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-4">
            <span className="absolute top-4 right-6 hover:text-indigo-500 cursor-pointer" onClick={() => dispatch(setIsModal())}>&times;</span>
            <div>
              <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">로그인</h2>
            </div>
            <form className="mt-8 space-y-6">
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px text-left ">
                <div className="mb-3">
                  <label htmlFor="email-address" className="text-sm" >이메일</label>
                  <input id="email-address" name="id" type="email" onChange={handleInputValue('id')} required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                </div>
                <div>
                  <label htmlFor="password" className="text-sm">비밀번호</label>
                  <input id="password" name="password" type="password" onChange={handleInputValue('password')} required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                </div>
              </div>
              <div>
                <button onClick={handleSubmit} /* disabled={!isValidate}  */type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    {/* <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="../images/icons8-google.svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> */}
                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyinfoEdit