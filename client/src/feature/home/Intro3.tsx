import image from "../../images/undraw_my_location_re_r52x.svg";

export default function Intro3() {
  return (
    <div className="flex">
      <div className="flex-1">
        <img src={image} alt="service" />
      </div>
      <div className="flex-1 text-left my-auto">
        <p className="text-zinc-700 font-semibold	text-3xl sm:text-3xl md:text-4xl lg:leading-snug lg:text-5xl text-left leading-snug">
          우리 지역에,
          <br />
          나에게 필요한 공구가<br /> 
          있는지 살펴보세요.
        </p>
        <p className="text-zinc-500 text-sm sm:text-sm md:text-md lg:text-lg text-left mt-10">
          집 근처에서 다양한
          <br />
          공구들을 살펴볼 수 있습니다.
        </p>
      </div>
    </div>
  );
}
