import image from "../../images/undraw_chatting_re_j55r.svg";

export default function Intro4() {
  return (
    <div className="flex">
      <div className="flex-1 text-left my-auto">
        <p className="text-zinc-700 font-semibold	text-3xl sm:text-3xl md:text-4xl lg:leading-snug lg:text-5xl text-left leading-snug">
          위치를 확인하고
          <br />
          채팅을 보내 직접
          <br />
          공유를 실천해보세요!
          <br />
        </p>
        <p className="text-zinc-500 text-sm sm:text-sm md:text-md lg:text-lg text-left mt-10">
          지도로 위치를 편리하게 확인,
          <br />
          1:1 채팅을 통해 약속을 잡을 수 있습니다.
        </p>
      </div>
      <div className="flex-1">
        <img src={image} alt="service" />
      </div>
    </div>
  );
}
