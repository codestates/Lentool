import { Menu, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setCredentials } from "feature/login/authSlice";
import { setLogin } from "feature/login/loginSlice";
import { setIsModal } from "feature/modal/modalSlice";
import { getMyinfo } from "feature/mypage/myinfoSlice";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import {
  useLoginMutation,
  useLogoutMutation,
  useMypageMutation,
} from "services/api";
export default function Dropdown () {
  const dispatch = useAppDispatch()
  const { push } = useHistory();
  const [logout] = useLogoutMutation();
  const [mypage] = useMypageMutation();

  const reset = {
    data: {
      user: "",
      token: "",
    },
  };

  const isLogin = useAppSelector((state) => state.login.isLogin);

  const handleGetInfo = async () => {
    const user = await mypage().unwrap();
    dispatch(getMyinfo(user));
    push("/mypage");
  };
  const handleModal = (e: any) => {
    e.preventDefault();
    dispatch(setIsModal());
  };
  const handleLogout = async () => {
    await logout().unwrap();
    dispatch(setLogin(false));
    dispatch(setCredentials(reset));
    localStorage.removeItem("user");
    localStorage.removeItem("posts");

    push("/");
  };
  return (
    <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {isLogin ? (
          <Menu.Items className="focus:outline-none absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleGetInfo}
                    className={`${
                      active ? "bg-violet-500 text-white " : "text-gray-900"
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
                    onClick={handleLogout}
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } justify-center group flex w-full items-center rounded-md px-2 py-2 text-sm `}
                  >
                    로그아웃
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        ) : (
          <Menu.Items className="focus:outline-none absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleModal}
                    className={`${
                      active ? "bg-violet-500 text-white " : "text-gray-900"
                    } justify-center group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    로그인
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        )}
      </Transition>
  )
}