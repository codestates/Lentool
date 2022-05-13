import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setIsModal } from "../modal/modalSlice";
import {
  useLoginMutation,
  usePostsMutation,
  useMypageMutation,
} from "../../services/api";
// import { useKakaoLoginMutation } from "../../services/kakaoapi";
import { setCredentials, setNewChat } from "./authSlice";
import { setLogin } from "./loginSlice";
import { getPosts } from "feature/post/postSlice";
import { getMyinfo } from "feature/mypage/myinfoSlice";
import { Link } from "react-router-dom";
import image from "../../images/kakao_login_medium_wide.png";

function Login() {
  const dispatch = useAppDispatch();
  const outSelect = useRef<any>();
  const [inputValue, setInputValue] = useState({
    id: "",
    password: "",
  });

  const [login, { data, isLoading, isSuccess }] = useLoginMutation();
  // const [kakaoLogin] = useKakaoLoginMutation();
  const [posts] = usePostsMutation();
  const [mypage] = useMypageMutation();
  const { id, password } = inputValue;
  /* 로그인 유효성 검사 */
  const [emailValidate, setEmailValidate] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [isValidate, setIsValidate] = useState(false);

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex = /^[A-Za-z0-9]{6,12}$/;
    setIsEmail(false);
    setIsPassword(false);
    setIsValidate(false);
    if (!id) {
      setErrorMessage("이메일을 입력하세요");
    } else if (!emailRegex.test(id)) {
      setEmailValidate("이메일 형식이 잘못된 유형입니다.");
    } else {
      setEmailValidate("");
      setIsEmail(true);
    }
    if (!password) {
      setErrorMessage("비밀번호를 입력하세요");
    } else if (!passwordRegex.test(password)) {
      setErrorMessage("숫자와 문자를 포함하여 6~12자리여야 합니다");
    } else {
      setErrorMessage("");
      setIsPassword(true);
    }
    if (isEmail === true && isPassword === true) setIsValidate(true);
  };
  /* 로그인 input 값 변경 */
  const handleInputValue =
    (key: string) => (e: { target: { value: string } }) => {
      setInputValue({ ...inputValue, [key]: e.target.value });
    };
  /* 로그인 요청 */
  const handleSubmit = async () => {
    try {
      const user = await login(inputValue).unwrap();
      dispatch(setCredentials(user));
      dispatch(setNewChat(user.data.userInfo.newchat));
      dispatch(setLogin(true));
      dispatch(setIsModal());
      const user1 = await mypage().unwrap();
      dispatch(getMyinfo(user1));
      localStorage.setItem("user", JSON.stringify(user));
      const p = await posts().unwrap();
      // console.log(p)
      // localStorage.setItem("posts", JSON.stringify(p));
      // dispatch(getPosts(p));
    } catch (err) {
      console.log("error", err);
    }
  };
  /* 회원가입버튼 */
  const handleSignup = (e: any) => {
    dispatch(setIsModal());
  };
  /* 모달 바깥 쪽 눌렀을 때 꺼지게 하기 */
  const handleOutClick = (e: any) => {
    e.preventDefault();
    if (e.target === outSelect.current) dispatch(setIsModal());
  };

  return (
    <div
      className="h-full w-full z-50 fixed bg-black bg-opacity-40 text-center"
      ref={outSelect}
      onClick={handleOutClick}
    >
      <div className="max-w-2xl h-[520px] bg-white absolute mx-auto w-96 my-auto inset-0 rounded">
        <div className="flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <span
              className="absolute top-4 right-6 hover:text-indigo-500 cursor-pointer"
              onClick={() => dispatch(setIsModal())}
            >
              &times;
            </span>
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                로그인
              </h2>
            </div>
            <form className="mt-4 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px text-left ">
                <div className="py-3">
                  <label htmlFor="email-address" className="text-sm">
                    이메일
                  </label>
                  <input
                    id="email-address"
                    name="id"
                    type="email"
                    onChange={handleInputValue("id")}
                    onKeyUp={validate}
                    className="appearance-none relative block w-full px-3 py-3 my-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                  <p className="mt-1 text-xs text-red-500">{emailValidate}</p>
                </div>
                <div>
                  <label htmlFor="password" className="text-sm">
                    비밀번호
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleInputValue("password")}
                    onKeyUp={validate}
                    className="appearance-none relative block w-full px-3 py-3 my-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                  <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
                </div>
              </div>
              <div>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-gray-500 group-hover:text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  로그인
                </button>
              </div>
              <div className="text-xs text-gray-700">또는</div>
              <div>
                <button
                  onClick={() =>
                    window.location.assign(
                      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`
                    )
                  }
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#000000 85%] bg-[#FEE500] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      className="h-5 w-5 text-gray-500 group-hover:text-gray-400"
                      viewBox="0 0 42 30"
                    >
                      <path
                        fill-rule="evenodd"
                        fill-opacity="0.902"
                        fill="rgb(0, 0, 0)"
                        d="M17.999,0.969 C8.58,0.969 0.0,7.225 0.0,14.942 C0.0,19.740 3.116,23.973 7.862,26.488 L5.865,33.818 C5.689,34.468 6.426,34.983 6.993,34.608 L15.746,28.802 C16.485,28.874 17.236,28.915 17.999,28.915 C27.941,28.915 35.999,22.659 35.999,14.942 C35.999,7.225 27.941,0.969 17.999,0.969 "
                      />
                    </svg>
                  </span>
                  카카오 로그인
                </button>
              </div>
              <div className="text-sm">
                <span className="mb-2 mx-2 text-xs text-gray-700">
                  아직 회원이 아니십니까?
                </span>
                <Link
                  to="/signup"
                  onClick={handleSignup}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  회원가입하기
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
