import { MouseEventHandler } from "react";
import image from "../../images/undraw_deliveries_2r4y.svg";

export default function Intro1({ trialRef }: any) {
  const onTrialClick = () => {
    console.log(window.onwheel);
    console.log("버튼눌림");
    trialRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="grid lg:grid-cols-2 sm:grid-cols-1">
      <div className="flex-1 -mt-32">
        <p className="text-zinc-700 font-semibold	text-3xl sm:text-3xl md:text-4xl lg:leading-snug lg:text-5xl  text-left">
          안 쓰는 공구,
          <br />
          창고 안 공구들,
          <br />
          비싸게 구매하고
          <br />
          사용하지 않고 있나요?
          <br />
        </p>
        <div className="block md:flex md:justify-between md:mb-8 -mt-6 lg:mt-0 lg:block">
          <p className="text-zinc-500 text-sm sm:text-sm md:text-md lg:text-lg text-left mt-10">
            한번 쓰려고 사기 비싼 공구들
            <br />
            렌툴에서 대여해 보세요!
          </p>
          <button
            className="bg-slate-700 py-2 px-10 scroll-smooth rounded-lg text-gray-300 mt-5 mb-5 hover:bg-slate-500 sm:py-2 md:py-2 md:mt-8 lg:py-3"
            onClick={onTrialClick}
          >
            체험하기
          </button>
        </div>
      </div>
      <div className="flex-2">
        <img src={image} alt="services" />
      </div>
    </div>
  );
}

// 줄 간격
// leading-none	line-height: 1;
// leading-tight	line-height: 1.25;
// leading-snug	line-height: 1.375;
// leading-normal	line-height: 1.5;
// leading-relaxed	line-height: 1.625;
// leading-loose	line-height: 2;
