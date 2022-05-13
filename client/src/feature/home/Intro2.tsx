import share from '../../images/tool-box.png'
import map from '../../images/map.png'
import chat from '../../images/chat.png'

export default function Intro2 () {
  return (
    <div className='grid gap-12 lg:grid-cols-3 md:grid-cols-3 md:gap-2 sm:grid-cols-1 sm:gap-12'>
      <div className='shadow-[0_5px_20px_1px_rgba(0,0,0,0.1)]  transition ease-in-out delay-150 px-4 py-8 rounded-2xl mx-8 hover:-translate-y-4 '>
        <img src={share} alt='service' className='mx-auto w-32 h-auto pb-4'/>
          <span className='text-xl text-gray-700 font-semibold'>공구 공유</span>
          <p className="text-sm text-gray-700 mt-4">렌툴은 사용하지 않는 공구를<br /> 동네 사람들과 공유를 돕는 플랫폼입니다</p>
      </div>
      <div className='shadow-[0_5px_20px_1px_rgba(0,0,0,0.1)]  transition ease-in-out delay-150 px-4 py-8 rounded-2xl mx-8 hover:-translate-y-4 '>
        <img src={map} alt='service' className='mx-auto w-32 h-auto pb-4'/>
        <span className='text-xl text-gray-700 font-semibold'>위치 기반 플랫폼</span>
        <p className="text-sm text-gray-700 mt-4">사용자의 위치를 기반으로<br /> 동네 사람들과 공유가 가능합니다</p>
      </div>
      <div className='shadow-[0_5px_20px_1px_#0e0c0c19]  transition ease-in-out delay-150 px-4 py-8 rounded-2xl mx-8 hover:-translate-y-4 '>
        <img src={chat} alt='service' className='mx-auto w-32 h-auto pb-4'/>
        <span className='text-xl text-gray-700 font-semibold'>1:1 채팅</span>
        <p className="text-sm text-gray-700 mt-4">약속을 잡기 위한<br />실시간 채팅을 지원합니다</p>
      </div>
    </div>
  )
}