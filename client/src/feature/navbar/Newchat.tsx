import { useAppSelector } from "app/hooks"

export default function NewChat () {
  const noti = useAppSelector((state) => state.persistedReducer.auth.newchat)
  return (
    <>
    {
      noti &&
      <>
        <span className="bottom-5 animate-ping left-15 absolute w-3 h-3 bg-rose-400 rounded-full"></span>
        <span className="bottom-5 left-15 absolute round-full w-3 h-3 bg-rose-400 rounded-full"></span>
      </>
    }
    </>
  )
}