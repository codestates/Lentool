import { Menu } from "@headlessui/react";
import { useAppDispatch } from "app/hooks";
import { getroom } from "feature/chat/roomSlice";
import { Link } from "react-router-dom";
import NewChat from "./Newchat";
import {
  useSearchroomMutation,
} from "services/api";
import { setNewChat } from "feature/login/authSlice";

export default function Afterlogin () {
  const dispatch = useAppDispatch()
  const [searchroom] = useSearchroomMutation();

  const getRoomList = async () => {
    const roomlist = await searchroom().unwrap();
    dispatch(getroom(roomlist));
    dispatch(setNewChat(false))
    console.log('ㄹ채팅방들어감')
  };
  return (
    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 text-base font-medium text-gray-500">
    <Link to="/room" onClick={getRoomList}>
      <div className="px-4 relative hover:text-gray-900">
        채팅방
        <NewChat />
      </div>
    </Link>
    <Link className="px-4 hover:text-gray-900" to="/posting">
      공유하기
    </Link>
    <Menu.Button className="focus:outline-none inline-flex justify-center px-2 py-2 text-sm font-medium text-gray-500 hover:bg-opacity-10 hover:text-black hover:bg-gray-700 hover:rounded-full focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <svg
          className="absolute w-12 h-12 text-gray-400 -left-1 hover:bg-gray-700"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </Menu.Button>
  </div>
  )
}