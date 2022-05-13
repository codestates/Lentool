/* eslint-disable jsx-a11y/img-redundant-alt */
import { useAppDispatch, useAppSelector } from "app/hooks";
import { getMyinfo } from "feature/mypage/myinfoSlice";
import { setIsMyinfoEditModal } from "feature/modal/modalMyinfoEditSlice";
import { setIsMyinfoDeleteModal } from "feature/modal/modalMyinfoDeleteSlice";
import { useState, useRef } from "react";
import MyinfoEdit from "./MyinfoEdit";
import MyinfoDelete from "./MyinfoDelete";
import { toast } from "react-toastify";
import { api, useEditdpMutation, useMyinfoQuery } from "services/api";

export default function Myprofile() {
  const dispatch = useAppDispatch();
  const { data, isLoading, isSuccess } = useMyinfoQuery()
  const [ trigger ] = api.endpoints.myinfo.useLazyQuery()  
  const [editdp] = useEditdpMutation();
  const isMyinfoEditModal = useAppSelector(
    (state) => state.myinfoEdit.isMyinfoEditModal
  );
  const isMyinfoDeleteModal = useAppSelector(
    (state) => state.myinfoDelete.isMyinfoDeleteModal
  );
  //실제 서버로 보내는 프로필 사진 상태
  const [userPhoto, setUserPhoto] = useState([]);
  //화면에 보여지는 프로필 사진 상태
  const [image, setImage] = useState('')

  const fileInput: any = useRef(null);

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

  
  const handlePosting = async () => {
    const formdata: any = new FormData();
    formdata.append("user_photo", userPhoto);
    await editdp(formdata).unwrap();
    const triggerData = await trigger()
    dispatch(getMyinfo(triggerData.data));

    toast.success("프로필 사진변경 성공");
  };

  const handleChoosePhoto = (e: any) => {
    //실질적 서버로 보낼 데이터 변경
    setUserPhoto(e.target.files[0]);
    //아래는 잠시 화면만 즉시 변화하게 하는
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    } else {
      //업로드 취소할 시 원상복구
      setImage('');
      return;
    }
  };
  

  return (
    <div className="w-full mt-10 mx-auto">
      {isMyinfoEditModal ? <MyinfoEdit /> : null}
      {isMyinfoDeleteModal ? <MyinfoDelete /> : null}
      <div className="flex justify-center">
        {/* 실제프로필 */}
        <div>
          <img
            src={
              image !== '' ? image :
              data && data.data.userinfo.user_photo === 'empty'
                ? "https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png"
                : `${process.env.REACT_APP_SERVER_URL}${data && data.data.userinfo.user_photo}`
            }
            alt="Image not found"
            className="mx-auto h-20 w-20 xs:h-20 xs:block xs:w-20 md:h-32 md:w-32 lg:h-40 lg:w-40 rounded-full object-cover hover:opacity-50"
            onClick={() => {
              fileInput.current.click();
            }}
          />

          <input
            type="file"
            onChange={handleChoosePhoto}
            style={{ display: "none" }}
            accept="image/jpg,impge/png,image/jpeg"
            name="profile_img"
            ref={fileInput}
          />
          <button
            onClick={handlePosting}
            className="flex mx-auto items-center mt-5 border hover:border-transparent border-gray-500 hover:bg-yellow-300 hover:text-white rounded outline-none focus:outline-none bg-transparent text-gray-600 text-sm py-1 px-2 font-semibold"
          >
            <span className="block">사진 적용</span>
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
                d="M5 13l4 4L20 7"
              />
            </svg>
          </button>
        </div>

        <div className="ml-10 items-center">
          <div className="flex items-center justify-between">
            <h2 className="block leading-relaxed font-medium text-zinc-700 text-3xl">
              {data && data.data.userinfo.nickname}
            </h2>
            <button
              onClick={handleEditInfo}
              className="cursor-pointer py-1 px-3 ml-3 focus:outline-none hover:border-transparent text-center rounded border border-gray-400 hover:bg-yellow-300 hover:text-white bg-transparent text-gray-600 font-semibold"
            >
              프로필 수정
            </button>
          </div>
          <div className="text-left">
            <h1 className="text-zinc-700 font-semibold">주소</h1>
            <h1 className="text-sm text-gray-700">
              {data && data.data.userinfo.user_address}
            </h1>
          </div>
          <div className="text-sm text-right text-zinc-500 py-2">
            더 이상 사용하지 않음?{" "}
            <button onClick={handleDeleteInfo} className="text-xs text-blue-500 hover:opacity-50 mt-2 cursor-pointer">
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function mypage() {
  throw new Error("Function not implemented.");
}

