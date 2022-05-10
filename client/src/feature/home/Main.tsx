import { useRef, useState } from "react";
import Intro1 from "./Intro1";
import Intro2 from "./Intro2";
import Intro3 from "./Intro3";
import Intro4 from "./Intro4";
import Intro5 from "./Intro5";
import Trial from "./Trial";

export default function Main() {
  const trialRef = useRef<HTMLDivElement>(null)
  const [pageY, setPageY] = useState(0)
  const handleScroll = (e: any) => {
    console.log(e.target)
  }
  
  return (
    <div /* onWheel={handleScroll}  */className="scroll-smooth flex max-w-7xl max-h-full mx-auto px-4 flex-col">
      <section className="h-[1024px] flex mx-auto items-center">
        <Intro1 trialRef={trialRef}/>
      </section>
      <section className="h-[1024px] flex mx-auto items-center">
        <Intro2 />
      </section>
      <section className="h-[1024px] flex mx-auto items-center">
        <Intro3 />
      </section>
      <section className="h-[1024px] flex mx-auto items-center">
        <Intro4 />
      </section>
      <section className="h-[1024px] flex mx-auto items-center" ref={trialRef}>
        <Trial />
      </section>
      <section className="h-[1024px] flex mx-auto items-center">
        <Intro5 />
      </section>
    </div>
  );
}
