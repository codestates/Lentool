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
      // const p = await posts().unwrap();
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

  const handleKakaoLogin = async () => {};

  return (
    <div
      className="h-screen w-full z-50 fixed bg-black bg-opacity-40 text-center"
      ref={outSelect}
      onClick={handleOutClick}
    >
      <div className="max-w-2xl bg-white fixed mx-auto my-40 w-96 inset-0 rounded ">
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-4">
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
            <form className="mt-8 space-y-6">
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
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
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
                  onClick={() => console.log("버튼누름")}
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-gray-500 group-hover:text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.545 12.151a1.91 1.91 0 0 0 1.909 1.909h3.536c-.607 1.972-2.101 3.467-4.26 3.866-3.431.635-6.862-1.865-7.19-5.339a6.034 6.034 0 0 1 8.782-5.941 1.958 1.958 0 0 0 2.286-.368 1.992 1.992 0 0 0-.498-3.179 10.005 10.005 0 0 0-5.692-1.038c-4.583.502-8.31 4.226-8.812 8.809A10.002 10.002 0 0 0 12.545 22c6.368 0 8.972-4.515 9.499-8.398.242-1.78-1.182-3.352-2.978-3.354l-4.61-.006a1.908 1.908 0 0 0-1.911 1.909z"
                      />
                    </svg>
                  </span>
                  Google 계정으로 계속하기
                </button>
              </div>
              <button
                onClick={() =>
                  window.open(
                    `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`
                  )
                }
              >
                <img src={image} />
              </button>
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
