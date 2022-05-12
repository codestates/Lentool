import { useAppSelector } from "app/hooks"
import { useLocation, useParams } from "react-router-dom";

export default function TitleSearch () {
  let { search_id }: any = useParams();

  const searchValue = useAppSelector(state => state.persistedReducer.search)
  console.log(searchValue.search)

  // const tag = params.get('tag')
  // console.log(tag)
  // console.log(searchValue)
  return (
    <div>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <h1 className="mb-5 ml-2 text-left text-gray-700">최근 게시글</h1>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            { 
            searchValue.search &&
              searchValue.search.map((post: any) => (
                <div key={post.id} className="group">
                  <div className="w-full relative aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={`http://localhost:80/postimage/744f409e878bfebddd8d976b9317b6c5`}
                      alt={post.photo1}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                    
                  </div>
                  <h3 className="mt-1 text-lg font-medium text-gray-900">{post.title}</h3>
                  <p className="text-sm text-gray-700">{post.address}</p>
                  <p className="text-sm text-gray-700">{post.price}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>  )
  }