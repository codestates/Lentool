import { useAppSelector } from "app/hooks";
import Loading from "feature/indicator/Loading";
import { useState } from "react";
import { Link } from "react-router-dom";
import { usePosQuery } from "services/api";
import imagePlaceHolder from "../../images/image_placeholder.svg";
export default function PostLogin() {
  // const postList = useAppSelector(state => state.posts.posts)
  // const posts = useAppSelector(state => state.persistedReducer.posts)
  // console.log('postList', postList)
  // console.log('posts', posts)
  const { data, error, isLoading, isFetching } = usePosQuery();
  const [postData, setPostData] = useState("");
  console.log(data);
  // console.log(isLoading)
  // console.log(isFetching)
  if (isLoading) return <Loading />;
  if (error) return <div>error</div>;

  return (
    <div>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <h1 className="mb-5 ml-2 text-left text-gray-700">최근 게시글</h1>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {isFetching ? (
              <>fetching...</>
            ) : (
              data.data.posts &&
              data.data.posts.map((post: any) => (
                <Link
                  to={`/post/${post.id}`}
                  key={post.id}
                  href=""
                  className="group"
                >
                  <div className="w-full h-80 relative aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={
                        post.photo1 !== "emty"
                          ? `${process.env.REACT_APP_SERVER_URL}${post.photo1}`
                          : imagePlaceHolder
                      }
                      alt={post.photo1}
                      className="w-full h-full object-center object-contain group-hover:opacity-75"
                    />
                  </div>

                  <div className="text-left mx-2">
                    <h3 className="mt-1 text-lg font-medium text-gray-900">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-700">{post.address}</p>
                    <p className="text-gray-700">{post.price}원</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
