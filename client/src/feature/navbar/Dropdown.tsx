import { Menu, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Loading from "feature/indicator/Loading";
import { setCredentials } from "feature/login/authSlice";
import { setLogin } from "feature/login/loginSlice";
import { setIsModal } from "feature/modal/modalSlice";
import { getMyinfo } from "feature/mypage/myinfoSlice";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useLogoutMutation, useMypageMutation } from "services/api";
import { persistor } from "../../index";

export default function Dropdown() {
  const dispatch = useAppDispatch();
  const { push } = useHistory();
  const [logout] = useLogoutMutation();
  const [mypage]: any = useMypageMutation();

  const reset = {
    data: {
      user: "",
      token: "",
    },
  };

  const isLogin = useAppSelector((state) => state.login.isLogin);
  const myinfo = useAppSelector((state) => state.persistedReducer.myinfo);

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
    setTimeout(() => persistor.purge(), 200);
    window.location.replace("/");
    // push("/"); 소셜 로그아웃을 위한 수정
  };
  if (mypage.isLoading) return <Loading />;
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
        <div className="max-w-7xl">
          <Menu.Items className="focus:outline-none absolute right-0 -mt-4 w-48 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <Menu.Item>
              <span className="my-3 bg-white text-gray-900 justify-center group flex w-full items-center rounded-t-md px-2 py-2 text-sm">
                <span className="text-slate-500">
                  {myinfo.user && myinfo.user.nickname}
                </span>
                님, 안녕하세요!
              </span>
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => push("/room")}
                  className={`${
                    active ? "bg-gray-200 text-gray-900" : "text-gray-900"
                  } md:hidden justify-center group flex w-full items-center rounded-t-md px-2 py-3 text-sm`}
                >
                  채팅방
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => push("/posting")}
                  className={`${
                    active ? "bg-gray-200 text-gray-900" : "text-gray-900"
                  } md:hidden justify-center group flex w-full items-center rounded-t-md px-2 py-3 text-sm`}
                >
                  공유하기
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleGetInfo}
                  className={`${
                    active ? "bg-gray-200 text-gray-900" : "text-gray-900"
                  } justify-center group flex w-full items-center rounded-t-md px-2 py-3 text-sm`}
                >
                  마이페이지
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active ? "bg-gray-200 text-gray-900" : "text-gray-900"
                  } justify-center group flex w-full items-center rounded-md px-2 py-3 text-sm `}
                >
                  로그아웃
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </div>
      ) : (
        <div className="max-w-7xl">
          <Menu.Items className="focus:outline-none absolute right-0 -mt-4 w-48 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleModal}
                  className={`${
                    active ? "bg-gray-200 text-gray-900" : "text-gray-900"
                  } justify-center group flex w-full items-center rounded-md px-2 py-3 text-sm `}
                >
                  로그인
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </div>
      )}
    </Transition>
  );
}
