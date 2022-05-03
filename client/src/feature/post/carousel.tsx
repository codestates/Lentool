import { useEffect, useRef, useState } from "react"

const TOTAL_SLIDER = 2
export default function Carousel() {
  const products = [
    {
      id: 1,
      name: 'Earthen Bottle',
      href: '#',
      price: '$48',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
      id: 2,
      name: 'Nomad Tumbler',
      href: '#',
      price: '$35',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
      id: 3,
      name: 'Focus Paper Refill',
      href: '#',
      price: '$89',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
  ]
  
  const [index, setIndex] = useState(0)
  const slideRef:any = useRef(null)
  const handleNext = () => {
    if (index >= 2) {
      setIndex(0)
    } else {
      setIndex(index + 1)
    }
  }
  const handlePrev = () => {
    if (index === 0) {
      setIndex(TOTAL_SLIDER)
    } else {
      setIndex(index - 1)
    }
  }
  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${index}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 에니메이션을 만듭니다.
  }, [index]);

  return (
    <div className="max-w-2xl px-7 ">
      <div id="default-carousel" className="relative">
        {/* <!-- Carousel wrapper --> */}
        <div className="overflow-hidden relative">
          <div className="flex z-10" ref={slideRef}>
            {/* <span className="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-gray-800"></span> */}
            <img src={products[0].imageSrc} alt='' className='rounded-xl '/>
            <img src={products[1].imageSrc} alt='' className='rounded-xl '/>
            <img src={products[2].imageSrc} alt='' className='rounded-xl '/>
          </div>
        </div>
        {/* <!-- Slider controls --> */}
        <button type="button" onClick={handlePrev}
                className="flex absolute top-0 -left-12 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
          <svg className="w-5 h-5 text-gray-500 sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <button type="button" onClick={handleNext}
                className="flex absolute top-0 -right-12 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next>
          <svg className="w-5 h-5 text-gray-500 sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
    </div>
  )
}