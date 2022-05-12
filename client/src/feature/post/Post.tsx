import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { usePostidQuery } from "services/api";
import Carousel from "./carousel";
import Loading from "feature/indicator/Loading";

const product = {
  name: "공구 > 소공구 > 몽키스패너",
  price: "$192",
  href: "#",
  states: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2aq3tfgMZh9tS1mwzPkOCLk6prIbIqy8D_g&usqp=CAU",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/stateValue-page-02-tertiary-stateValue-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/stateValue-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2aq3tfgMZh9tS1mwzPkOCLk6prIbIqy8D_g&usqp=CAU",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};

export default function Post() {
  let { post_id }: any = useParams();
  const { data, isLoading, error } = usePostidQuery(post_id);
  // console.log(data.data.post.tag)
  const myUserId = useAppSelector(
    (state) => state.persistedReducer.myinfo
  );
  if (isLoading) return <Loading />

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ul className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-2xl lg:px-8">
            <li className="text-sm">
              <p className="font-medium text-gray-500 hover:text-gray-600">
                공구 &gt; { data && data.data.post.tag}
              </p>
            </li>
          </ul>
        </nav>

        {data && (
          /* Image gallery */
          <div>
            <div className="mt-6 ">
              <div className="sm:rounded-lg sm:overflow-hidden">
                <Carousel />
              </div>
            </div>

            {/* Product info  */}
            <div className="max-w-2xl mx-auto pt-8 pb-16 px-4 sm:px-6 lg:max-w-2xl lg:pb-24 ">
              <div className="lg:mt-0 lg:row-span-3">
                {/* Userinfo  */}
                <div className="">
                  <div className="flex items-center ">
                    <div className="flex-none w-14 mr-2 items-center">
                      { 
                        myUserId.user.user_photo !== 'empty' ? 
                          <img src={`${process.env.REACT_APP_SERVER_URL}${myUserId.user.user_photo}`} alt='profile'/>
                        : <img src="https://www.seekpng.com/png/detail/966-9665317_placeholder-image-person-jpg.png" alt='profile' className='rounded-full'/>
                      }
                    </div>
                    <div className="flex-1 w-32 text-left">
                      <h3>{data.data.post.nickname}</h3>
                      <h3>{data.data.post.address}</h3>
                    </div>
                    <div className="flex-1 text-right text-sm">
                      {/* <a href="" className="mx-1">
                        💬
                      </a>
                      <a href="" className="mx-1">
                        ❤️
                      </a> */}
                    </div>
                  </div>
                  <div className="border-b-2 border-gray-100 py-3 " />
                </div>
                <form className="">
                  <div className="py-4 px-2 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <div className="text-left">
                      <h2 className="text-xl my-1 font-medium text-gray-900">
                        {data.data.post.title}
                      </h2>
                      <span className="text-sm px-2 rounded-full text-yellow-600 bg-yellow-200">{data && data.data.post.tag}</span>
                    </div>
                    <div className="mt-4 space-y-6">
                      <p className="text-base text-left text-gray-900">
                        {data.data.post.description}
                      </p>
                    </div>
                  </div>
                  <div className="border-b-2 border-gray-100 px-3 " />
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
