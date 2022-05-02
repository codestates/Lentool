const rooms = [
    {
      id: 1,
      name: '김남현',
      href: '#',
      address: '광주광역시',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
      id: 2,
      name: '백현민',
      href: '#',
      address: '인천광역시',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
      id: 3,
      name: '이규동',
      href: '#',
      address: '제주광역시',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
      id: 4,
      name: '조준오',
      href: '#',
      address: '독도',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    // More products...
]

export default function Room () {
  return (
    <div>
      <h1>채팅 목록</h1>
      {
        rooms && rooms.map(room => {
          return (
            <div key={room.id} className='border-2'>
              {room.name}
            </div>
          )
        })
      }
    </div>
  )
}