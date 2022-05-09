import image from '../../images/undraw_deliveries_2r4y.svg'
import share from '../../images/share.png'
import map from '../../images/map.png'
import chat from '../../images/chat.png'

export default function Intro2 () {
  return (
    <div className='flex'>
      <div className='shadow-[0_5px_20px_1px_rgba(0,0,0,0.1)] flex-1 transition ease-in-out delay-150 px-14 rounded-2xl mx-8 hover:-translate-y-4 '>
        <img src={share} alt='service'className='w-64 pb-6 rounded-full'/>
        <span>공구 공유 서비스</span>
        <p className="text-sm text-gray-700 pb-12">쓰지 않는 공구를 서로 공유할 수 있는 서비스</p>
      </div>
      <div className='shadow-[0_5px_20px_1px_rgba(0,0,0,0.1)] flex-1 transition ease-in-out delay-150 px-14 rounded-2xl mx-8 hover:-translate-y-4 '>
        <img src={map} alt='service'className='w-64 pb-6'/>
        <span>위치 기반 공유</span>
        <p className="text-sm text-gray-700 pb-12">주소에 따라~</p>
      </div>
      <div className='shadow-[0_5px_20px_1px_rgba(0,0,0,0.1)] flex-1 transition ease-in-out delay-150 px-14 rounded-2xl mx-8 hover:-translate-y-4 '>
        <img src={chat} alt='service'className='w-64 pb-6'/>
        <span>1:1 채팅</span>
        <p className="text-sm text-gray-700 pb-12">유저간 </p>
      </div>
    </div>
  )
}