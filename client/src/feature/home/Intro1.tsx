import image from '../../images/undraw_deliveries_2r4y.svg'

export default function Intro1 () {
  return (
    <div className="flex">
      <div className='flex-1 my-auto'>
        <p className="text-zinc-700 font-semibold	text-5xl text-left leading-snug">
          안 쓰는 공구,<br />
          창고 안 공구들,<br />
          비싸게 구매하고<br />
          사용하지 않으신가요?<br />
        </p>
        <p className="text-zinc-500 text-md text-left mt-10">
          한번 쓰기에 사기 비싼 공구들<br />
          LENTOOL에서 대여를 통해 사용해 보세요!
        </p>
        <button className="border-2 bg-slate-700 py-3 px-10 rounded-lg text-gray-300 mt-5">체험하기</button>
      </div>
      <div className="flex-1">
        <img src={image} alt='services'/>
      </div>
    </div>
  )
}

// 줄 간격
// leading-none	line-height: 1;
// leading-tight	line-height: 1.25;
// leading-snug	line-height: 1.375;
// leading-normal	line-height: 1.5;
// leading-relaxed	line-height: 1.625;
// leading-loose	line-height: 2;