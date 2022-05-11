import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useAppSelector } from "app/hooks";
import { useMypageMutation, useDeletePostMutation } from "services/api";
import { useState } from "react";
import imagePlaceHolder from "../../images/image_placeholder.svg";

export default function Mycontents() {
  const [deletePost, { data, isLoading, isSuccess }] = useDeletePostMutation();
  const myposts: any = useAppSelector((state) => state.myinfo.post);
  const [isContents, setIsContents]: any = useState([...myposts]);

  // console.log(myposts);
  // console.log(isContents);

  const handleContents = (e: any) => {
    setIsContents([...isContents, e]);
  };
  const handleRemoveContents = (e: any) => {
    const remove = isContents.filter((el: any) => {
      return el !== e;
    });
    setIsContents(remove);
  };
  const handleEditPost = async (e: any) => {
    try {
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleDeletePost = async (e: any) => {
    try {
      // console.log(myposts);
      console.log(e);
      const result = await deletePost(e).unwrap();

      //   toast.success("성공적으로 게시물 삭제");
      // console.log(result);
    } catch (err) {
      console.log("server error", err);
    }
  };
  // console.log(myposts);
  console.log(myposts);
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <h1 className="mb-5 ml-2 text-left text-gray-700">내가 쓴 게시글</h1>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {isContents &&
            isContents.map((mypost: any) => (
              <a key={mypost.id} href={mypost.href} className="group">
                <div className="w-full h-80 relative aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={
                      mypost.photo1 !== "emty"
                        ? `${process.env.REACT_APP_SERVER_URL}${mypost.photo1}`
                        : imagePlaceHolder
                    }
                    alt="my-posting"
                    className="w-full h-full object-center object-contain group-hover:opacity-75"
                  />
                  <Menu>
                    <Menu.Button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 absolute top-4 right-4 fill-gray-600	 shadow-md rounded-full"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </Menu.Button>
                    <Menu.Items className="focus:outline-none absolute top-4 right-4 mt-10 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            // react-dom5버젼용, 6버젼이면 안먹음.
                            <Link
                              to={{
                                pathname: `/postingEdit/${mypost.id}`,
                                // state: {
                                //   data: mypost,
                                // },
                              }}
                            >
                              <button
                                className={`${
                                  active
                                    ? "bg-blue-500 text-white "
                                    : "text-gray-900"
                                } justify-center group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                수정하기
                              </button>
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                handleDeletePost(mypost.id);
                                handleRemoveContents(mypost);
                              }}
                              className={`${
                                active
                                  ? "bg-blue-500 text-white"
                                  : "text-gray-900"
                              } justify-center group flex w-full items-center rounded-md px-2 py-2 text-sm `}
                            >
                              삭제하기
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Menu>

                  {/* <PostDropdown /> */}
                </div>

                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  {mypost.title}
                </h3>
                <p className="mt-1 text-sm text-gray-700">{mypost.price}</p>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}
