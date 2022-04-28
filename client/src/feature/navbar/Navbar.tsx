import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { MenuIcon } from '@heroicons/react/outline'
import { Link } from "react-router-dom";
import Login from "../login/login";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setIsModal } from '../modal/modalSlice'
import { useMypageMutation } from "services/api";

export default function Navbar () {
  const isModal = useAppSelector(state => state.modal.isModal)
  const isLogin = useAppSelector(state => state.auth.isLogin)
  const dispatch = useAppDispatch()
  // const {data, isLoading, error} = useMypageQuery('mypage')
  const [mypage, { data, isLoading, error }] = useMypageMutation()
  const handleModal = (e: any) => {
    console.log('모달 ㅡ,ㅡ')
    e.preventDefault();
    dispatch(setIsModal())
  }
  const handleGetInfo = async () => {
    await mypage()
  }
  console.log(data)
  console.log(isLogin)
  return (
    <div>
    <Menu as="div" className="relative bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link to="/">
            <img
              className="h-8 w-auto sm:h-10"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt=""
              />          
          </Link>
        </div>
        <div className="relative text-gray-600">
          <input type="search" name="search" placeholder="Search"
            className="pt-2 pb-2 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md" />
          <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" xmlSpace="preserve" width="512px" height="512px">
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
            </svg>
          </button>     
        </div>
        <div className="-mr-2 -my-2 md:hidden">
          <Menu.Button className="focus:outline-none inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </Menu.Button>
        </div>
        {
          !isLogin ? 
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <a href="#javascript" onClick={handleModal} className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
              로그인
            </a>
          </div>
          : 
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 text-base font-medium text-gray-500"> 
            <div className="pl-4 relative hover:text-gray-900">채팅방
              <span className="bottom-5 animate-ping left-15 absolute  w-3 h-3 bg-rose-400 rounded-full"></span>
              <span className="bottom-5 left-15 absolute round-full w-3 h-3 bg-rose-400 rounded-full"></span>
            </div>
            <div className="pl-4 hover:text-gray-900">공유하기</div>
            <button className="pl-4 hover:text-gray-900" onClick={handleGetInfo}>마이페이지정보줘</button>
            <Link to="/mypage" className="pl-4 hover:">
              <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg className="absolute w-12 h-12 text-gray-400 -left-1 hover:bg-gray-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
              </div>
            </Link>
          </div>
        }

      </div>
    </div>

    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      {
        isLogin ?
        <Menu.Items className="focus:outline-none absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="px-1 py-1 ">
          <Menu.Item>
            {({ active }) => (
              <button
              className={`${
                active ? 'bg-violet-500 text-white ' : 'text-gray-900'
              } justify-center group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              >
                Mypage
              </button>
            )}
          </Menu.Item>
        </div>
        <div className="px-1 py-1 ">
          <Menu.Item>
            {({ active }) => (
              <button
              className={`${
                active ? 'bg-violet-500 text-white' : 'text-gray-900'
              } justify-center group flex w-full items-center rounded-md px-2 py-2 text-sm `}
              >
                로그아웃
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
      : 
      <Menu.Items className="focus:outline-none absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="px-1 py-1 ">
        <Menu.Item>
          {({ active }) => (
            <button
            className={`${
              active ? 'bg-violet-500 text-white ' : 'text-gray-900'
            } justify-center group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              로그인
            </button>
          )}
        </Menu.Item>
      </div>
    </Menu.Items>
  }
  </Transition>
  </Menu>
  {
  isModal ? <Login /> : null
  }
  </div>
)
}
  /*  <div>
      <nav className="border-2 border-dashed border-blue-300">
        <div className="flex">
          <svg className="h-10 w-10 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <Link to="/">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </Link>
          </svg>
          <input className="border-2 border-dashed border-rose-500" type="text" placeholder="search" />
          {
            !isLogin ? <a href="#javascript" onClick={handleModal}>로그인</a>
            : 
            <div className="flex"> 
              <div>
                채팅방
              </div>
              <div>공유하기</div>
              <button onClick={handleGetInfo}>마이페이지정보줘</button>
              <Link to="/mypage" >
              <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
              </div>
              </Link>
            </div>
          }
        </div>
        <div>
          <Headers />
        </div>
      </nav>
      <div>
      {
        isModal ? <Login /> : null
      }
      </div>
    </div> */

