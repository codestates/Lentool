import { useAppDispatch, useAppSelector } from "app/hooks"
import { useState } from "react"

export default function NewChat () {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector((state) => state.login.isLogin)
  const noti = useAppSelector((state) => state.persistedReducer.auth.newchat)
  console.log('로그인된 뉴챗')
  return (
    <>
    {
      noti &&
      <>
        <span className="bottom-5 animate-ping left-15 absolute  w-3 h-3 bg-rose-400 rounded-full"></span>
        <span className="bottom-5 left-15 absolute round-full w-3 h-3 bg-rose-400 rounded-full"></span>
      </>
    }
    </>
  )
}