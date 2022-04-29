import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setIsModal } from "../modal/modalSlice";
import { useSignupMutation } from "services/api";
import type { SignupRequest } from "services/api";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import DaumPostCode from "react-daum-postcode";
declare global {
  interface Window {
    kakao: any;
  }
}
function Signup() {
  const dispatch = useAppDispatch();
  const outSelect = useRef<any>();
  /* api로 던져질 회원가입 정보들 */
  const [inputValue, setInputValue] = useState<SignupRequest>({
    email: "",
    password: "",
    nickname: "",
    user_address: "",
    latitude: 0,
    longtitude: 0,
  });
  /*실제 api.ts에서 서버로 보내는 트리거'signup'과 {data,isLoading,isSuccess} */
  const [signup, { data, isLoading, isSuccess }] = useSignupMutation();
  const { email, password, nickname, user_address } = inputValue;

  //kakao 주소 api
  //주소 상태를 선언
  const [fullAddress, setFullAddress] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longtitude, setLongtitude] = useState(0);

  useEffect(() => {
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new window.kakao.maps.services.Geocoder();
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(`${fullAddress}`, function (result: any) {
      // 정상적으로 검색이 완료됐으면

      /*coords는 맵에 찍기 위한 위도경도 */
      var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

      /*위도 경도 설정 */
      setLatitude(result[0].y);
      setLongtitude(result[0].x);
      handleLatLongInputValue(latitude, longtitude);
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
  //kakao 주소창 CSS스타일 설정
  const modalStyle = {
    zIndex: "100",
    border: "2px solid #000000",
    overflow: "hidden",
  };

  const signupreq = async () => {
    console.log(inputValue);
    try {
      const user = await signup(inputValue).unwrap();
      //   dispatch(setCredentials(user));
      dispatch(setIsModal());
      console.log(user);
    } catch (err) {
      console.log("error", err);
    }
  };

  // 유효성 검사(Validity Checking)
  //이메일 유효성 검사
  const checkEmailValidity = (isVal: string) => {
    let regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //이메일 양식에 맞게 작성
    //   [.-]? : - or _ or . 이 0번 또는 1번 사용 가능하도록 허용
    // 최대 가능한 형식 예시 : Elon_Musk123@aws-lentool.co.kr
    return regExp.test(isVal);
  };
  //비밀번호 유효성 검사
  const checkPasswordValidity = (isVal: string) => {
    let regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/; //최소 8자, 최소 하나의 문자와 숫자
    return regExp.test(isVal);
  };

  //회원가입 버튼을 누를 때 발동되는 handleSignup 함수
  const handleSignup = () => {
    if (!email || !nickname || !password || !password2 || !fullAddress) {
      toast.error("모든 항목을 입력해주세요.");
    } else if (!checkEmailValidity) {
      toast.error("이메일 형식에 맞지 않습니다.");
    } else if (!checkPasswordValidity) {
      toast.error("8자 이상 최소 하나의 숫자와 문자를 포함해야 합니다.");
    } else if (password !== password2) {
      toast.error("두 비밀번호가 같지 않습니다.");
    } else if (nickname.length === 1 || nickname.length > 15) {
      toast.error("별명은 2~15자 이내로 입력바랍니다.");
    } else {
      signupreq();
      // 모든 검증 후 회원가입정보를 서버로 전송요청 함수
    }
  };

  // handleInput function :타자 하나하나 칠때마다 상태저장
  const handleInputValue =
    (key: string) => (e: { target: { value: string } }) => {
      setInputValue({ ...inputValue, [key]: e.target.value });
    };
  // 주소input function: 타자가 아닌 kakao주소API로 상태를 받아오기 때문에 위와 다르게 만듬
  const handleAddressInputValue = (value: string) => {
    setInputValue({ ...inputValue, user_address: value });
  };
  // 위도 경도 input function : 타자가 아닌 useEffect에 의해 kakaoAPI 받아오기 때문에 따로 만듬
  const handleLatLongInputValue = (value1: number, value2: number) => {
    setInputValue({ ...inputValue, latitude: value1, longtitude: value2 });
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
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <p>이메일</p>
        <input
          type="text"
          className=""
          onChange={handleInputValue("email")}
          placeholder="이메일을 입력하세요"
        />
      </div>
      {!checkEmailValidity(email) && inputValue.email.length > 0 ? (
        <span className="text-red-500">이메일 형식에 맞지 않습니다.</span>
      ) : null}
      <div>
        <p>비밀번호</p>
        <input
          type="password"
          className=""
          onChange={handleInputValue("password")}
          placeholder="비밀번호를 입력하세요"
        />
      </div>
      {!checkPasswordValidity(password) && inputValue.password.length > 0 ? (
        <span className="text-red-500">
          비밀번호는 영문,숫자를 포함하여 8자 이상이여야 합니다.
        </span>
      ) : null}

      <div>
        <p>비밀번호 재확인</p>
        <input
          type="password"
          className=""
          onChange={handleInputPasswordValue("password2")}
          placeholder="비밀번호 재입력"
        />
      </div>

      {!(password === password2 || password2.length === 0) ? (
        <span className="text-red-500">비밀번호가 일치 하지 않습니다.</span>
      ) : null}

      <div>
        <p>닉네임</p>
        <input
          type="text"
          className=""
          onChange={handleInputValue("nickname")}
          placeholder="닉네임을 입력해주세요"
        />
        <br />
        {!(
          (inputValue.nickname.length > 1 && inputValue.nickname.length < 15) ||
          inputValue.nickname.length === 0
        ) ? (
          <span className="text-red-500">
            별명은 2~15자 이내로 입력바랍니다.
          </span>
        ) : null}
      </div>
      <div>
        <p>주소</p>
        <button onClick={handleOpen}>주소검색</button>

        {isAddClicked ? (
          <div>
            <DaumPostCode onComplete={handleComplete} style={modalStyle} />
          </div>
        ) : null}
      </div>
      <div>
        <input value={fullAddress} readOnly></input>
      </div>
      <div>
        <button className="" type="submit" onClick={() => handleSignup()}>
          회원가입
        </button>
      </div>
    </form>
  );
}
export default Signup;
