import { useAppSelector } from "app/hooks";
import imagePlaceHolder from "../../images/image_placeholder.svg"

export default function Mycontents() {
  const myposts: any = useAppSelector((state) => state.myinfo.post);
  console.log(myposts)
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <h1 className="mb-5 ml-2 text-left text-gray-700">내가 쓴 게시글</h1>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {myposts &&
            myposts.map((mypost: any) => (
              <a key={mypost.id} href={mypost.href} className="group">
                <div className="w-full h-80 relative aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={
                      mypost.photo1 !== 'emty' ? `http://localhost:80${mypost.photo1}`
                      : imagePlaceHolder
                    }
                    alt="my-posting"
                    className="w-full h-full object-center object-contain group-hover:opacity-75"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 absolute top-4 right-4 fill-gray-500	 shadow-md rounded-full"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
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
