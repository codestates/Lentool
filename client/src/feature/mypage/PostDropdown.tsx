import { Menu, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { getMyinfo } from "feature/mypage/myinfoSlice";
import { Fragment } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useMypageMutation, useDeletePostMutation } from "services/api";
/* 포스팅 삭제,수정하는 메뉴창 */
export default function PostDropdown() {
  const dispatch = useAppDispatch();
  const { push } = useHistory();
  const myposts: any = useAppSelector((state) => state.myinfo.post);
  const postid = myposts.id;
  // console.log(myposts);
  // console.log(myposts[0].id);
  // let { post_id }: any = useParams();

  const [deletePost, { data, isLoading, isSuccess }] = useDeletePostMutation();
  const [mypage] = useMypageMutation();

  const handleEditPost = async () => {
    //something Edit post
  };
  const handleDeletePost = async (e: any) => {
    try {
      console.log(e);
      const result = await deletePost(e).unwrap();

      //   toast.success("성공적으로 게시물 삭제");
      console.log(result);
    } catch {
      console.log("server error");
    }
  };
  // const handleGetInfo = async () => {
  //   const user = await mypage().unwrap();
  //   dispatch(getMyinfo(user));
  // };
  return (
    <Menu.Items className="focus:outline-none absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
      <div className="px-1 py-1 ">
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={handleEditPost}
              className={`${
                active ? "bg-violet-500 text-white " : "text-gray-900"
              } justify-center group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              수정하기
            </button>
          )}
        </Menu.Item>
      </div>
      <div className="px-1 py-1 ">
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => handleDeletePost(postid)}
              className={`${
                active ? "bg-violet-500 text-white" : "text-gray-900"
              } justify-center group flex w-full items-center rounded-md px-2 py-2 text-sm `}
            >
              삭제하기
            </button>
          )}
        </Menu.Item>
      </div>
    </Menu.Items>
  );
}
