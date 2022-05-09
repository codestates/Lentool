import image from '../../images/undraw_my_location_re_r52x.svg'

export default function Intro3 () {
  return (
    <div className="flex">
      <div className="flex-1">
        <img src={image} />
      </div>
      <div className='flex-1 text-left my-auto'>
        <p className="text-zinc-700 font-semibold	text-5xl text-left leading-snug">
          우리 지역에 필요한,<br />
          공구가 있는지 살펴보세요.<br />
        </p>
        <p className="text-zinc-500 text-md text-left mt-10">
          집 근처에서 다양한 공구들을<br />
          살펴볼 수 있습니다.
        </p>
      </div>
    </div>
  )
}