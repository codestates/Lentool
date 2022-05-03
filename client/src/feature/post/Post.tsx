import { Key, ReactChild, ReactFragment, ReactPortal, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { usePostidQuery } from 'services/api'
import { getDetailPost } from './detailPostSlice'
import Carousel from './carousel'

const product = {
  name: '공구 > 소공구 > 몽키스패너',
  price: '$192',
  href: '#',
  states: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2aq3tfgMZh9tS1mwzPkOCLk6prIbIqy8D_g&usqp=CAU',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/stateValue-page-02-tertiary-stateValue-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/stateValue-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2aq3tfgMZh9tS1mwzPkOCLk6prIbIqy8D_g&usqp=CAU',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}

export default function Post() {
  const dispatch = useAppDispatch()
  let { post_id }:any = useParams()
  const { data, isLoading, error } = usePostidQuery(post_id)

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-2xl lg:px-8">
            {/* {product.breadcrumbs.map((breadcrumb: { id: Key | null | undefined; href: string | undefined; name: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined }) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-4 h-5 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))} */}
            <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        { data && 
        /* Image gallery */
        <div>
          <div className="mt-6 max-w-2xl mx-auto ">
            <div className="sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
              {/* <img
                src={product.images[3].src}
                alt={product.images[3].alt}
                className="w-full h-full object-center object-cover"
              /> */}
              <Carousel />
            </div>
          </div>

          {/* Product info  */}
          <div className="max-w-2xl mx-auto pt-8 pb-16 px-4 sm:px-6 lg:max-w-2xl lg:pb-24 ">
            <div className="lg:mt-0 lg:row-span-3">
              {/* Userinfo  */}
              <div className="">
                <div className="flex items-center ">
                  <div className="flex-none w-14 items-center">
                    사진
                    {/* {data.data.post.user_photo} */}
                  </div>
                  <div className="flex-1 w-32 text-left">
                    <h3>{data.data.post.nickname}</h3>
                    <h3>{data.data.post.address}</h3>
                  </div>
                  <div className='flex-1 text-right text-sm'>
                    <a href='' className='mx-1'>💬</a>
                    <a href='' className='mx-1'>❤️</a>
                  </div>
                </div>
                <div className="border-b-2 border-gray-100 py-3 " />
              </div>
            <form className="">
              <div className="py-4 px-2 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"> 
                <div className="text-left">
                  <h2 className="text-xl my-1 font-medium text-gray-900">{data.data.post.title}</h2>
                    <p className="text-sm text-gray-600">공구 &gt; 소공구</p>
                </div>
                <div className="mt-4 space-y-6">
                  <p className="text-base text-left text-gray-900">{data.data.post.description}</p>
                </div>
              </div>
              <div className="border-b-2 border-gray-100 px-3 " />
              <div className='flex items-center py-6'>
                <p className="text-xl text-left flex-1 pl-2 text-gray-900">{data.data.post.price}원</p>
                <button
                  type="submit"
                  className="flex-9 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                  채팅하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      }
    </div>
  </div>
  )
}
