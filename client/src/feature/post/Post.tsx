import { useParams, Link } from "react-router-dom";
import { useAppSelector } from "app/hooks";
import { usePostidQuery } from "services/api";
import Carousel from "./carousel";
import Loading from "feature/indicator/Loading";
import PostMap from "./PostMap";

export default function Post() {
  let { post_id }: any = useParams();
  const { data, isLoading, error } = usePostidQuery(post_id);
  const myUserId = useAppSelector((state) => state.persistedReducer.myinfo);
  if (isLoading) return <Loading />;

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ul className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-2xl lg:px-8">
            <li className="text-sm">
              <p className="font-medium text-gray-500 hover:text-gray-600">
                공구 &gt; {data && data.data.post.tag}
              </p>
            </li>
          </ul>
        </nav>

        {data && (
          <div>
            <div className="mt-6 ">
              <div className="sm:rounded-lg sm:overflow-hidden">
                <Carousel />
              </div>
            </div>
            <div className="max-w-2xl mx-auto pt-8 pb-16 px-4 sm:px-6 lg:max-w-2xl lg:pb-24 ">
              <div className="lg:mt-0 lg:row-span-3">
                <div className="">
                  <div className="flex items-center ">
                    <div className="flex-none w-12 h-12 mr-2 items-center">
                      {data.data.post.user_photo !== "empty" ? (
                        <img
                          src={`${process.env.REACT_APP_SERVER_URL}${data.data.post.user_photo}`}
                          alt="profile"
                          className="rounded-full w-full h-full"
                        />
                      ) : (
                        <img
                          src="https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png"
                          alt="profile"
                          className="rounded-full"
                        />
                      )}
                    </div>
                    <div className="flex-1 w-32 text-left">
                      <h3>{data.data.post.nickname}</h3>
                      <h3>{data.data.post.address}</h3>
                    </div>
                    {/* <div className="flex-1 text-right text-sm"> */}
                      {/* <a href="" className="mx-1">
                        💬
                      </a>
                      <a href="" className="mx-1">
                        ❤️
                      </a> */}
                    {/* </div> */}
                  </div>
                  <div className="border-b-2 border-gray-100 py-3 " />
                </div>
                <form className="">
                  <div className="py-4 px-2">
                    <div className="text-left">
                      <h2 className="text-xl my-1 font-medium text-gray-900">
                        {data.data.post.title}
                      </h2>
                      <span className="text-sm px-2 rounded-full text-yellow-600 bg-yellow-200">
                        {data && data.data.post.tag}
                      </span>
                    </div>
                    <div className="my-4 space-y-6">
                      <p className="text-base text-left text-gray-900">
                        {data.data.post.description}
                      </p>
                    </div>
                  </div>
                  <div className="mb-8">
                    <PostMap address={data.data.post.address} />
                  </div>
                  <div className="border-b-2 border-gray-100 px-3" />
                  <div className="flex items-center py-6">
                    <p className="text-xl text-left flex-1 pl-2 text-gray-900">
                      {data.data.post.price}원
                    </p>
                    {data.data.post.id === myUserId.user.id ? null : (
                      <Link
                        to={{
                          pathname: "/chatting",
                          state: {
                            user_id2: data.data.post.id,
                            post_id: data.data.post.post_id,
                            title: data.data.post.title,
                            islend: data.data.post.islend,
                            nickname: data.data.post.nickname,
                            photo: data.data.post.user_photo,
                          },
                        }}
                      >
                        <button
                          type="submit"
                          className="flex-9 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          채팅하기
                        </button>
                      </Link>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
