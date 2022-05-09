/* eslint-disable jsx-a11y/img-redundant-alt */
import { useAppDispatch, useAppSelector } from "app/hooks";
import { getMyinfo } from "feature/mypage/myinfoSlice";
import { setIsMyinfoEditModal } from "feature/modal/modalMyinfoEditSlice";
import { setIsMyinfoDeleteModal } from "feature/modal/modalMyinfoDeleteSlice";
import { useState, useRef } from "react";
import MyinfoEdit from "./MyinfoEdit";
import MyinfoDelete from "./MyinfoDelete";
import { toast } from "react-toastify";
import { useEditdpMutation, useMypageMutation } from "services/api";

export default function Myprofile() {
  const dispatch = useAppDispatch();
  const myinfo = useAppSelector((state) => state.myinfo.user);
  const [editdp, { data, isLoading, isSuccess }] = useEditdpMutation();
  const [mypage] = useMypageMutation();
  const isMyinfoEditModal = useAppSelector(
    (state) => state.myinfoEdit.isMyinfoEditModal
  );
  const isMyinfoDeleteModal = useAppSelector(
    (state) => state.myinfoDelete.isMyinfoDeleteModal
  );

  const handleEditInfo = (e: any) => {
    //회원 정보 수정
    e.preventDefault();
    dispatch(setIsMyinfoEditModal());
  };
  const handleDeleteInfo = (e: any) => {
    // 회원탈퇴
    e.preventDefault();
    dispatch(setIsMyinfoDeleteModal());
  };
  //실제 서버로 보내는 프로필 사진 상태
  const [userPhoto, setUserPhoto] = useState([]);
  //화면에 보여지는 프로필 사진 상태
  const [Image, setImage] = useState(
    `http://localhost:80${myinfo.user_photo}`
  );

  const fileInput: any = useRef(null);

  const handlePosting = async () => {
    const formdata: any = new FormData();
    formdata.append("user_photo", userPhoto);
    await editdp(formdata).unwrap();
    handleGetInfo(); //즉시 데이터 받아와서 업데이트 실제로 업데이트
    // for (let key of formdata.keys()) {
    //   console.log(key, ":", formdata.get(key));
    // }
    toast.success("프로필 사진변경 성공");
  };
  const handleGetInfo = async () => {
    const user = await mypage().unwrap();
    dispatch(getMyinfo(user));
  };
  const handleChoosePhoto = (e: any) => {
    //실질적 서버로 보낼 데이터 변경
    setUserPhoto(e.target.files[0]);
    //아래는 잠시 화면만 즉시 변화하게 하는
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      //업로드 취소할 시 원상복구
      setImage(`http://localhost:80${myinfo.user_photo}`);
      return;
    }
    const reader: any = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // console.log(myinfo.user_photo);

  return (
    <div className="w-11/12 mt-10">
      {isMyinfoEditModal ? <MyinfoEdit /> : null}
      {isMyinfoDeleteModal ? <MyinfoDelete /> : null}
      <div className="flex justify-center">
        {/* 실제프로필 */}
        <img
          src={
            Image === "http://localhost:80empty"
              ? "https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png"
              : Image
          }
          alt="Image not found"
          className="h-20 w-20 xs:h-20 xs:block xs:w-20 lg:h-40 lg:w-40 rounded-full object-cover"
          onClick={() => {
            fileInput.current.click();
          }}
        />
        <div>
          <input
            type="file"
            onChange={handleChoosePhoto}
            style={{ display: "none" }}
            // accept="image/jpg,impge/png,image/jpeg"
            // name="profile_img"
            ref={fileInput}
          />
        </div>

        <div className="ml-10">
          <div className="flex items-center">
            <h2 className="block leading-relaxed font-light text-gray-700 text-3xl">
              {myinfo.nickname}
            </h2>
            <button
              onClick={handleEditInfo}
              className="cursor-pointer h-7 px-3 ml-3 focus:outline-none hover:border-transparent text-center rounded border border-gray-400 hover:bg-blue-500 hover:text-white bg-transparent text-gray-500 font-semibold"
            >
              프로필 수정
            </button>

            <button
              onClick={handlePosting}
              className="flex items-center ml-3 border border-blue-600 hover:bg-blue-600 hover:text-white rounded outline-none focus:outline-none bg-transparent text-blue-600 text-sm py-1 px-2"
            >
              <span className="block">주소 인증 완료</span>
              <svg
                className="block h-5 w-5 pl-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </div>
          <div className="">
            <h1 className="text-right">주소</h1>
            <h1 className="text-right text-sm text-gray-700">
              {myinfo.user_address}
            </h1>
            <h1 className="text-right ">이메일</h1>
            <h1 className="text-right text-sm text-gray-700 mb-4">
              {myinfo.email}
            </h1>
            {/* <h1 className="text-base font-bold font-light">게시물</h1> */}
            <div className="text-right text-sm">
              더 이상 사용하지 않음?{" "}
              <a
                onClick={handleDeleteInfo}
                className="text-xs text-blue-500 mt-2 cursor-pointer"
              >
                회원탈퇴
              </a>
            </div>
            {/* <a className="block text-base text-blue-500 mt-2" target="_blank">https://tailwindcomponents.com/</a> */}
          </div>
        </div>
      </div>
    </div>
  );
}

// <div>
//   {
//     myinfo &&
//     <>
//       <img src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' alt=''
//           className='rounded-full w-20'/>
//       <div>{myinfo.nickname}</div>
//       <div>{myinfo.user_address}</div>
//       <div>{myinfo.email}</div>
//       <button className='bg-sky-500 rounded-full py-1 px-4 text-white'onClick={handleEditInfo}>회원 정보 수정</button>
//       <div className=''>더 이상 사용하지 않음? <span>회원탈퇴</span></div>
//     </>
//   }
// </div>
