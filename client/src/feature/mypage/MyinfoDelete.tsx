import { setIsMyinfoDeleteModal } from "feature/modal/modalMyinfoDeleteSlice";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toast } from "react-toastify";
import { useSignoutMutation } from "services/api";
import { store } from "../../app/store";
import { setCredentials } from "feature/login/authSlice";
import { persistStore } from "redux-persist";
import { setLogin } from "feature/login/loginSlice";
// let persistor = persistStore(store);

export default function MyinfoDelete() {
  const { push } = useHistory();

  const myinfo = useAppSelector((state) => state.myinfo.user);

  const dispatch = useAppDispatch();
  const [signout, { data, isLoading, isSuccess }] = useSignoutMutation();
  const outSelect = useRef<any>();
  const handleOutClick = (e: any) => {
    e.preventDefault();
    if (e.target === outSelect.current) dispatch(setIsMyinfoDeleteModal());
  };
  //토큰 초기화
  const reset = {
    data: {
      user: "",
      token: "",
    },
  };
  //회원 탈퇴시 로그아웃도 처리 하려고 만든 함수
  const handleLogout = () => {
    dispatch(setLogin(false));
    dispatch(setCredentials(reset));
    localStorage.removeItem("user");
    localStorage.removeItem("posts");
    // setTimeout(() => persistor.purge(), 200);

    // localStorage.removeItem("persist:root")
    push("/");
  };
  const handleDeleteClick = async () => {
    try {
      console.log(myinfo);
      const user = await signout(myinfo).unwrap();
      dispatch(setIsMyinfoDeleteModal()); //바로 모달창 닫히는 기능
      handleLogout();
      toast.success("성공적으로 회원탈퇴 완료");
      // console.log(user);
      // push("/");
    } catch (err) {
      console.log("error", err);
    }
  };
  return (
    <div
      className="h-screen w-full z-50 absolute bg-black bg-opacity-70 text-center"
      ref={outSelect}
      onClick={handleOutClick}
    >
      <div className="bg-white absolute top-1/4 left-1/3 rounded w-10/12 md:w-1/3">
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-4">
            <span
              className="absolute top-4 right-6 hover:text-indigo-500 cursor-pointer"
              onClick={() => dispatch(setIsMyinfoDeleteModal())}
            >
              &times;
            </span>
            <span>정말 회원 탈퇴 하시겠습니까?</span>
            <br></br>
            <div className="text-center">
              <button
                onClick={handleDeleteClick}
                className="mx-9 bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                회원탈퇴
              </button>

              <button
                onClick={() => dispatch(setIsMyinfoDeleteModal())}
                className="mx-9 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                취소하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
