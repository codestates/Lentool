import { useRef, useState } from "react";
import Intro1 from "./Intro1";
import Intro2 from "./Intro2";
import Intro3 from "./Intro3";
import Intro4 from "./Intro4";
import Intro5 from "./Intro5";
import Trial from "./Trial";

export default function Main() {
  const trialRef = useRef<HTMLDivElement>(null);
  console.log("메인입니다");

  return (
    <div className="scroll-smooth flex max-w-7xl max-h-full mx-auto px-4 flex-col">
      <section className="pl-12 h-[900px] sm:h-[960px] md:h-[960px] lg:h-[1024px] flex mx-auto items-center">
        <Intro1 trialRef={trialRef} />
      </section>
      <section className="h-[700px] sm:h-[800px] md:h-[800px] lg:h-[700px] flex mx-auto items-center">
        <Intro2 />
      </section>
      <section className="h-[700px] sm:h-[800px] md:h-[960px] lg:h-[1024px] flex mx-auto items-center">
        <Intro3 />
      </section>
      <section className="pl-12 h-[700px] sm:h-[800px] md:h-[960px] lg:h-[1024px] flex mx-auto items-center">
        <Intro4 />
      </section>
      <section
        className="h-[960px] sm:h-[1024px] md:h-[1224px] lg:h-[1024px] flex mx-auto items-center"
        ref={trialRef}
      >
        <Trial />
      </section>
      <section className="h-[900px] sm:h-[960px] md:h-[960px] lg:h-[1024px] lg:mb-32 flex mx-auto items-end">
        <Intro5 />
      </section>
    </div>
  );
}
