import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import { usePosQuery, usePostidQuery } from "services/api"
import './carousel.css'
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
  let { post_id }: any = useParams();
  const { data, isLoading, error } = usePostidQuery(post_id);

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
    slideRef.current.style.transform = `translateX(-${index}00%)`; 
  }, [index]);

  return (
    <div className="px-7 max-w-2xl mx-auto">
      <div className="relative ">
        {/* <!-- Carousel wrapper --> */}
        <div className="overflow-hidden">
          <div className="flex items-center justify-center z-10" ref={slideRef}>
            {
              data.data.post &&
                <div id="carousel">
                  <img src={`http://localhost:80${data.data.post.photo1}`} alt='' className='rounded-xl w-full object-contain'/>
                  <img src={`http://localhost:80${data.data.post.photo2}`} alt='' className='rounded-xl'/>
                  <img src={`http://localhost:80${data.data.post.photo3}`} alt='' className='rounded-xl'/>
                </div>
            }
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