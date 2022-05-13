import { useState, useRef, useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setIsModal } from "../modal/modalSlice";

import {
  useChecknicknameMutation,
  useSignupMutation,
  useCheckemailMutation,
} from "services/api";
import type {
  SignupRequest,
  NicknameRequest,
  EmailRequest,
} from "services/api";

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import DaumPostCode from "react-daum-postcode";
// 사진 import
// import logo from "../../images/lentool(logo+word).png";

declare global {
  interface Window {
    kakao: any;
  }
}
function Signup() {
  const { push } = useHistory();
  const dispatch = useAppDispatch();
  const outSelect = useRef<any>();
  /* api로 던져질 회원가입 정보들 */
  const [inputValue, setInputValue] = useState<SignupRequest>({
    email: "",
    password: "",
    nickname: "",
    user_address: "",
    latitude: "",
    longitude: "",
  });
  /* 중복검사용 이메일 상태 */
  const [emailValue, setEmailValue] = useState<EmailRequest>({
    email: "",
  });
  /* 중복검사용 닉네임상태 */
  const [nicknameValue, setNicknameValue] = useState<NicknameRequest>({
    nickname: "",
  });
  /*실제 api.ts에서 서버로 보내는 트리거'signup'과 {data,isLoading,isSuccess} */
  const [signup, { data, isLoading, isSuccess }] = useSignupMutation();
  const [checkemail, {}] = useCheckemailMutation();
  const [checknickname, {}] = useChecknicknameMutation();

  const { email, password, nickname, user_address } = inputValue;

  //kakao 주소 api
  //주소 상태를 선언
  const [fullAddress, setFullAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new window.kakao.maps.services.Geocoder();
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(`${fullAddress}`, function (result: any) {
      // 정상적으로 검색이 완료됐으면

      /*coords는 맵에 찍기 위한 위도경도 */
      // var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

      /*위도 경도 설정 */
      setLatitude(result[0].y);
      setLongitude(result[0].x);
      handleLatLongInputValue(latitude, longitude);
    });
  }, [fullAddress, latitude]);

  /*************카카오 API  핸들러**********/
  const handleComplete = (data: any) => {
    let fullAddress = data.address; // 주소 할당
    let extraAddress = ""; //빌딩의 경우 추가 주소를 받는다.
    if (data.addressType === "R") {
      // R: 도로명 J:지번명 주소로 받겠다.
      if (data.bname !== "") {
        extraAddress += data.bname; //bname : 법정동/법정리 이름 extraAddress에 합치기
      }
      if (data.buildingName !== "") {
        //buildingName: 빌딩 extraAddress에 명합치기
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : ""; // fullAddress에 extraAddress합치기
    }
    setFullAddress(fullAddress); //최종 주소를 주소상태에 넣어주기
    handleAddressInputValue(fullAddress);
  };
  /********************************************* */

  //클릭에 따라 Kakao주소창 열고 닫을 상태를 false로 설정
  const [isAddClicked, setIsAddClicked] = useState(false);
  //클릭에 따라 Kakao 주소창 열고 닫히는 함수를 설정
  const handleOpen = () => {
    setIsAddClicked(!isAddClicked);
  };
  //밖 클릭시 주소창 무조건 없애기
  const handleOpenOut = () => {
    if (isAddClicked === true) {
      setIsAddClicked(false);
    }
  };
  //kakao 주소창 CSS스타일 설정
  const modalStyle = {
    zIndex: "100",
    border: "2px solid #000000",
    overflow: "hidden",
  };
  /* 모든 조건이 통과될때, signup으로 inputValue(회원정보)를 보내고 user로 받는 함수 */
  const signupreq = async () => {
    // console.log(inputValue);
    try {
      const user = await signup(inputValue).unwrap();
      // dispatch(setCredentials(user));
      dispatch(setIsModal()); //바로 회원가입창이 열린다.
      toast.success("성공적으로 회원가입 완료");
      push("/");
      // console.log(user);
    } catch (err) {
      console.log("error", err);
    }
  };

  /******************유효성 검사(Validity Checking)**********************/
  //이메일 유효성 검사
  const checkEmailValidity = (isVal: string) => {
    let regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //이메일 양식에 맞게 작성
    return regExp.test(isVal);
  };
  /* 이메일 중복검사용 상태 */
  const [emailOverlappingValidity, setEmailOverlappingValidity] =
    useState(true);
  /* 중복검사 확인후 또 바꾸는 경우*/
  const [confirmedEmail, setConfirmedEmail] = useState("");
  /*이메일 중복 검사 */
  const checkEmailOverlapping = async () => {
    try {
      const user = await checkemail(emailValue).unwrap();
      // console.log(user);
      if (user.message === "중복 없음") {
        setEmailOverlappingValidity(false);
        toast.success("사용가능한 이메일입니다.");
        setConfirmedEmail(emailValue.email);
      } else {
        setEmailOverlappingValidity(true);
        toast.error("중복된 이메일입니다.");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  /* 닉네임 중복검사용 */
  const [nicknameOverlappingValidity, setNicknameOverlappingValidity] =
    useState(true);
  //닉네임 중복검사 후 또 바꾸는 경우 확인
  const [confirmedNickname, setConfirmedNickname] = useState("");
  /*닉네임 중복 검사 */
  const checkNicknameOverlapping = async () => {
    try {
      const user = await checknickname(nicknameValue).unwrap();
      setNicknameOverlappingValidity(false);
      console.log(user);
      if (user.message === "중복 없음") {
        setNicknameOverlappingValidity(false);
        setConfirmedNickname(nicknameValue.nickname);
        toast.success("사용가능한 닉네임입니다.");
      } else {
        setNicknameOverlappingValidity(true);
        toast.error("중복된 닉네임입니다.");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  //비밀번호 유효성 검사
  const checkPasswordValidity = (isVal: string) => {
    let regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,30}$/; //최소 8자, 최소 하나의 문자와 숫자
    return regExp.test(isVal);
  };

  //회원가입 버튼을 누를 때 발동되는 handleSignup 함수
  const handleSignup = () => {
    if (!email || !nickname || !password || !password2 || !fullAddress) {
      toast.error("모든 항목을 입력해주세요.");
    } else if (!checkEmailValidity) {
      toast.error("이메일 형식에 맞지 않습니다.");
    } else if (emailOverlappingValidity) {
      toast.error("이메일 중복 여부를 확인해 주시기 바랍니다.");
    } else if (confirmedEmail !== email) {
      toast.error("이메일 중복 여부를 확인해 주시기 바랍니다.");
    } else if (!checkPasswordValidity(password)) {
      toast.error("8자 이상 최소 하나의 숫자와 문자를 포함해야 합니다.");
    } else if (password !== password2) {
      toast.error("두 비밀번호가 같지 않습니다.");
    } else if (nickname.length === 1 || nickname.length > 15) {
      toast.error("별명은 2~15자 이내로 입력해 주세요. ");
    } else if (confirmedNickname !== nickname) {
      toast.error("닉네임 중복여부를 확인해주세요 ");
    } else if (nicknameOverlappingValidity) {
      toast.error("닉네임 중복여부를 확인해주세요 ");
    } else {
      signupreq();
      // 모든 검증 후 회원가입정보를 서버로 전송요청 함수
    }
  };

  // handleInput function :타자 하나하나 칠때마다 상태저장
  const handleInputValue =
    (key: string) => (e: { target: { value: string } }) => {
      setInputValue({ ...inputValue, [key]: e.target.value });
      setEmailValue({ ...emailValue, [key]: e.target.value });
      setNicknameValue({ ...nicknameValue, [key]: e.target.value });
    };
  // // email 중복
  // const handleInputEmailValue =
  //   (key: string) => (e: { target: { value: string } }) => {
  //     setEmailValue({ ...emailValue, [key]: e.target.value });
  //   };
  // // 닉네임 중복
  // const handleInputNicknameValue =
  //   (key: string) => (e: { target: { value: string } }) => {
  //     setNicknameValue({ ...nicknameValue, [key]: e.target.value });
  //   };
  // 주소input function: 타자가 아닌 kakao주소API로 상태를 받아오기 때문에 위와 다르게 만듬
  const handleAddressInputValue = (value: string) => {
    setInputValue({ ...inputValue, user_address: value });
  };
  // 위도 경도 input function : 타자가 아닌 useEffect에 의해 kakaoAPI 받아오기 때문에 따로 만듬
  const handleLatLongInputValue = (value1: string, value2: string) => {
    setInputValue({ ...inputValue, latitude: value1, longitude: value2 });
  };

  /* 비밀번호2 상태 : 서버에 전송하지 않는 임시 데이터이기 때문에 따로 상태 관리 */
  const [inputPassword2, setInputPassword2] = useState({ password2: "" });
  // handlePassword2 function
  const handleInputPasswordValue =
    (key: string) => (e: { target: { value: string } }) => {
      setInputPassword2({ ...inputPassword2, [key]: e.target.value });
    };
  const { password2 } = inputPassword2;

  return (
    <div
      className="bg-gray-200 mx-auto md:h-screen flex flex-col justify-center items-center px-6 pt-8 pt:mt-0"
      onClick={handleOpenOut}
    >
      {/* <a className="text-2xl font-semibold flex justify-center items-center mb-8 lg:mb-10">
        <img src={logo} className="h-10 mr-4" alt="Leentool Logo" />
      </a> */}
      <div className="bg-white shadow rounded-lg md:mt-0 w-50 sm:max-w-screen-sm xl:p-0">
        <div className="p-6 sm:p-8 lg:p-16 space-y-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            회원가입
          </h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 space-y-6"
            action="#"
          >
            <div>
              <label className="text-left text-sm font-medium text-gray-900 block mb-2">
                이메일
              </label>
              <div className="justify-center mt-4 flex">
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleInputValue("email")}
                  className="md:w-52  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block "
                  placeholder="name@company.com"
                />
                <button
                  className="ml-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded "
                  onClick={checkEmailOverlapping}
                >
                  중복 확인
                </button>
              </div>
            </div>
            {!checkEmailValidity(email) && inputValue.email.length > 0 ? (
              <span className="text-red-500">이메일 형식에 맞지 않습니다.</span>
            ) : null}
            <div>
              <label className="text-left text-sm font-medium text-gray-900 block mb-2">
                닉네임
              </label>
              <div className="justify-center mt-4 flex">
                <input
                  type="text"
                  name="nickname"
                  id="nickname"
                  onChange={handleInputValue("nickname")}
                  className=" md:w-52  p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block "
                  placeholder="닉네임"
                />
                <button
                  className="ml-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  onClick={checkNicknameOverlapping}
                >
                  중복 확인
                </button>
              </div>
            </div>
            {!(
              (inputValue.nickname.length > 1 &&
                inputValue.nickname.length < 15) ||
              inputValue.nickname.length === 0
            ) ? (
              <span className="text-red-500">
                닉네임은 2~15자 이내로 입력바랍니다.
              </span>
            ) : null}
            <div>
              <label className="text-left text-sm font-medium text-gray-900 block mb-2">
                비밀번호
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleInputValue("password")}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              />
            </div>
            {!checkPasswordValidity(password) &&
            inputValue.password.length > 0 ? (
              <span className="text-red-500">
                영문,숫자를 포함하여 6자 이상이여야 합니다.
              </span>
            ) : null}
            <div>
              <label className=" text-left text-sm font-medium text-gray-900 block mb-2">
                비밀번호 확인
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                onChange={handleInputPasswordValue("password2")}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              />
            </div>
            {!(password === password2 || password2.length === 0) ? (
              <span className="text-red-500">
                비밀번호가 일치 하지 않습니다.
              </span>
            ) : null}

            <div>
              <label className="text-left text-sm font-medium text-gray-900 block mb-2">
                주소 찾기
              </label>

              {/* <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                onClick={handleOpen}
                hidden
              >
                주소 찾기
              </button> */}
              {isAddClicked ? (
                <div>
                  <DaumPostCode
                    onComplete={handleComplete}
                    style={modalStyle}
                  />
                </div>
              ) : null}
              <input
                type="text"
                name="address"
                id="address"
                onClick={handleOpen}
                value={fullAddress}
                readOnly
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="주소"
              ></input>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  name="remember"
                  type="checkbox"
                  className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded"
                  required
                />
              </div>
              <div className="text-sm ml-3">
                <label className="font-medium text-gray-900">
                  위 이용약관에 동의합니다.{" "}
                  <a href="#fake약관" className="text-teal-500 hover:underline">
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <button
              className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center"
              type="submit"
              onClick={() => handleSignup()}
            >
              계정 생성하기
            </button>
            <div className="text-sm font-medium text-gray-500">
              이미 계정이 있으시다구요?{" "}
              <a href=" " className="text-teal-500 hover:underline">
                로그인 해주세요.
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Signup;
