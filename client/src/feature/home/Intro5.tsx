import image from '../../images/services.png'

export default function Intro5 () {
  return (
    <div className="flex-col my-auto">
      <p className="text-zinc-700 font-semibold	text-3xl leading-snug">
        지금 당장<br />
        <span className="py-2 px-2 before:block before:absolute before:inset-1 before:skew-y-3 before:bg-yellow-200 relative inline-block">
          <span className="relative text-5xl text-zinc-700">LENTOOL</span>
        </span>
        {""}에서<br />
        필요한 공구들을 <br />
        이웃들과 나눠보세요!
      </p>
      <img src={image} alt="services" className='items-center'/>
    </div>
  )
}