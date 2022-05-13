import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState, useEffect, useRef } from "react";
import {
  useOauthSignupMutation,
  NicknameRequest,
  MyinfoEditRequest,
  KakaoOauthRequest,
  useChecknicknameMutation,
  useMypageMutation,
} from "services/api";
import { setCredentials, setNewChat } from "./authSlice";
import { setLogin } from "./loginSlice";
import { useHistory } from "react-router-dom";
import DaumPostCode from "react-daum-postcode";
import { toast } from "react-toastify";
import logo from "../../images/Kakao_Logo.svg";
import { getMyinfo } from "feature/mypage/myinfoSlice";

export default function KakaoSignup() {
  const outSelect = useRef<any>();
  const { push } = useHistory();
  const dispatch = useAppDispatch();
  const [mypage] = useMypageMutation();

  //회원정보 등록(수정)을 위해 기존의 내 데이터  가져오기(현재 kakao id만 존재)
  const myinfo = useAppSelector((state) => state.myinfo.user);

  //회원정보 등록을 할때 담을 최종 회원정보 데이터 상태들
  const [userUpdate, setUserUpdate] = useState<KakaoOauthRequest>({
    nickname: "",
    user_address: "",
    longitude: "",
    latitude: "",
  });
  //닉네임 중복 확인을 위해 사용하는 트리거/뮤테이션
  const [checknickname, {}] = useChecknicknameMutation();
  // 최종회원정보를 담아서 서버로 보낼 트리거/뮤테이션
  const [oauthSignup] = useOauthSignupMutation();

  //KAKAO 주소 API로 받아서 등록할 상태들
  const [fullAddress, setFullAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  //중복 검사용으로만 서버로 보낼 닉네임데이터 상태
  const [nicknameValue, setNicknameValue] = useState<NicknameRequest>({
    nickname: "",
  });

  //닉네임 중복이 확인 되었는지 아닌지 확인하는 상태
  const [nicknameOverlappingValidity, setNicknameOverlappingValidity] =
    useState(true);
  //KAKAO 회원정보 등록(수정)을 위한 데이터들

  /*************카카오 주소 API  핸들러**********/
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
    handleAddressEditValue(fullAddress);
  };
  //KAKAO 주소 API로 받아온 주소값의 상태를 갱신 할당
  const handleAddressEditValue = (value: string) => {
    setUserUpdate({ ...userUpdate, user_address: value });
  };

  //클릭에 따라 Kakao주소창 열고 닫을 상태를 false로 설정
  const [isAddClicked, setIsAddClicked] = useState(false);
  //클릭에 따라 Kakao 주소창 열고 닫히는 함수를 설정
  const handleOpen = () => {
    setIsAddClicked(true);
  };

  const handleOpenOut = (e: any) => {
    if (isAddClicked === true) {
      setIsAddClicked(false);
    }
  };
  //kakao 주소창 CSS스타일 설정
  const modalStyle = {
    Width: "full",
    zIndex: "100",
    border: "2px solid #000000",
    overflow: "hidden",
  };
  /*-------------------------------------------------------- */

  //KAKAO 주소 API로 유저가 주소 찍으면 바로 그 주소로 KAKAO MAP API를 통햬 위도 경도를 계산후 상태 갱신 할당
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
      setLongitude(result[0].x);
      handleLatLongEditValue(latitude, longitude);
    });
  }, [fullAddress, latitude]);

  /*-------------------------------------------------------- */

  //KAKAO MAP API로 계산된 위도 경도를 상태에 갱신 할당
  const handleLatLongEditValue = (value1: string, value2: string) => {
    setUserUpdate({ ...userUpdate, latitude: value1, longitude: value2 });
  };
  /*-------------------------------------------------------- */

  // 닉네임 타이핑시 상태 갱신해주는 함수
  const handleEditInputValue =
    (key: string) => (e: { target: { value: string } }) => {
      //최종적으로 보낼때 사용되는 상태값
      setUserUpdate({ ...userUpdate, [key]: e.target.value });
      //닉네임 중복확인을 위해서만 사용하는 상태값
      setNicknameValue({ ...nicknameValue, [key]: e.target.value });
    };
  const { nickname, user_address } = userUpdate;

  /*-------------------------------------------------------- */

  /* 닉네임 중복확인을 서버로 보내는 함수 */
  const checkNicknameOverlapping = async () => {
    try {
      const user = await checknickname(nicknameValue).unwrap();
      setNicknameOverlappingValidity(false);
      console.log(user);
      if (user.message === "중복 없음") {
        setNicknameOverlappingValidity(false);
        toast.success("사용가능한 닉네임입니다.");
      } else {
        setNicknameOverlappingValidity(true);
        toast.error("중복된 닉네임입니다.");
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  /*-------------------------------------------------------- */

  /* Validtaion */
  const handleEditMyinfo = () => {
    if (!nickname && !longitude && !user_address && !latitude) {
      return toast.error("항목을 입력해주세요.");
    }

    if (nickname) {
      if (nickname.length === 1 || nickname.length > 15) {
        return toast.error("별명은 2~15자 이내로 입력해 주세요. ");
      } else if (nicknameOverlappingValidity) {
        return toast.error("닉네임 중복여부를 확인해주세요 ");
      }
      // 모든 검증 후 회원가입정보를 서버로 전송요청 함수
    }
    handle2();
  };

  /*-------------------------------------------------------- */
  /*서버로 데이터 보내는 함수 */
  const handle2 = async () => {
    const req = await oauthSignup(userUpdate).unwrap();
    dispatch(setCredentials(req));
    dispatch(setNewChat(req.data.userInfo.newchat));
    const user1 = await mypage().unwrap();
    dispatch(getMyinfo(user1));
    dispatch(setLogin(true));
    push("/");
  };
  //중복확인이나 주소찾기 눌렀을때 새로고침이 없도록 설정
  const handleOutClick = (e: any) => {
    e.preventDefault();
  };
  return (
    <div
      className="bg-gray-200 mx-auto md:h-screen flex flex-col justify-relative items-center px-6 pt-10 pt:mt-0"
      ref={outSelect}
      onClick={(e) => {
        handleOutClick(e);
        handleOpenOut(e);
      }}
    >
      <div className="bg-white shadow rounded-lg md:mt-0 w-50 sm:max-w-screen-sm xl:p-0">
        <div className="p-6 sm:p-8 lg:p-16 space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src={logo} alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              회원정보 등록
            </h2>
          </div>
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px text-left ">
              <div className="mb-3">
                <div>
                  <label className="text-left text-sm font-medium text-gray-900 block mb-2">
                    닉네임
                  </label>
                  <div className="justify-center mt-4 flex">
                    <input
                      type="text"
                      name="nickname"
                      id="nickname"
                      onChange={handleEditInputValue("nickname")}
                      className=" md:w-52  p-2.5  bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block "
                      placeholder="닉네임"
                    />
                    <button
                      className="ml-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      onClick={checkNicknameOverlapping}
                    >
                      중복 체크
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-left font-medium text-gray-900 block mb-2 mt-4">
                    주소 찾기
                  </label>
                  {/* <div className="justify-center mt-4 flex">
                    <button
                      className="bg-white	 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                      onClick={handleOpen}
                    >
                      주소 찾기
                    </button>
                  </div> */}
                  <div className="justify-center mt-4 flex">
                    {isAddClicked ? (
                      <div className="justify-center w-full mt-4 flex">
                        <DaumPostCode
                          onComplete={handleComplete}
                          style={modalStyle}
                        />
                      </div>
                    ) : null}
                  </div>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={fullAddress}
                    onClick={handleOpen}
                    readOnly
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block"
                    placeholder="주소"
                  ></input>
                </div>
              </div>
            </div>
            <div className="justify-center mt-4 flex">
              <button
                onClick={handleEditMyinfo}
                /* disabled={!isValidate}  */ type="submit"
                className="w-full group  relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {/* <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="../images/icons8-google.svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> */}
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
                회원정보 등록
              </button>
            </div>
          </form>
          {/* <button onClick={handle}>바꿔줌</button>
      <button onClick={handle2}>보냄</button> */}
        </div>
      </div>
    </div>
  );
}
