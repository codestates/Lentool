import { useAppDispatch, useAppSelector } from "app/hooks";
import { setIsModal } from "feature/modal/modalSlice";
import { useState } from "react";
import { useSearchMutation } from "services/api";
import { getSearch } from "./searchSlice";
import SearchTag from "./SearchTag";

export default function Searchbar() {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("");
  const isLogin = useAppSelector((state) => state.login.isLogin);

  const [result] = useSearchMutation();

  const handleSearchDisabled = (e: any) => {
    e.preventDefault();
    dispatch(setIsModal());
  };
  const searchPost = async () => {
    const title = await result(inputValue);
    dispatch(getSearch(title));
    setInputValue("");
  };
  return (
    <div className="my-auto mx-4">
      {isLogin ? (
        <SearchTag />
      ) : (
        <div className="relative text-gray-600 w-80">
          <input
            type="search"
            name="search"
            placeholder="Search"
            onMouseDown={handleSearchDisabled}
            className="pt-2 pb-2 border focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md"
          />
          <button
            type="submit"
            onClick={searchPost}
            className="absolute right-0 top-0 mt-3 mr-4"
          >
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              xmlSpace="preserve"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
