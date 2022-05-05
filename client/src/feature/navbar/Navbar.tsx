import { Menu, Transition } from "@headlessui/react";
import { MenuIcon } from "@heroicons/react/outline";
import { Link, useHistory } from "react-router-dom";
import Login from "../login/login";
import { useAppSelector } from "../../app/hooks";

import Searchbar from "./Searchbar";
import Beforelogin from "./Beforelogin";
import Afterlogin from "./Afterlogin";
import Dropdown from "./Dropdown";

export default function Navbar() {
  const isModal = useAppSelector((state) => state.modal.isModal);
  const isLogin = useAppSelector((state) => state.login.isLogin);

  return (
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
          <Searchbar />
          <div className="-mr-2 -my-2 md:hidden flex-3 ">
            <Menu.Button className="focus:outline-none inline-flex w-full justify-center px-2 py-2 text-sm font-medium text-gray-500 hover:bg-opacity-10 hover:text-black hover:bg-gray-700 hover:rounded-full focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Menu.Button>
          </div>
          {!isLogin ? (
            <Beforelogin />
          ) : (
            <Afterlogin />
          )}
        </div>
      </div>

      <Dropdown />
      {isModal ? <Login /> : null}
    </Menu>
  );
}
