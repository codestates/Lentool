import { useAppSelector } from "app/hooks";
import { Link } from "react-router-dom";
import { usePosQuery } from "services/api";

export default function PostLogin() {
  const postList = useAppSelector((state) => state.posts.posts);
  const posts = useAppSelector((state) => state.persistedReducer.posts);
  // console.log('postList', postList)
  // console.log('posts', posts)
  const { data, error, isLoading, isFetching } = usePosQuery();
  console.log(data);
  if (isLoading) return <div>loading</div>;
  if (error) return <div>error</div>;

  return (
    <div>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
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
                      src={`http://localhost:4000${post.photo1}`}
                      alt={post.photo1}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-1 text-lg font-medium text-gray-900">
                    {post.title}
                  </h3>
                  <p className=" text-sm text-gray-700">{post.address}</p>
                  <p className=" text-sm text-gray-700">{post.price}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
