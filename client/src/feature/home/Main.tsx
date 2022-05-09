import Intro1 from "./Intro1";
import Intro2 from "./Intro2";
import Intro3 from "./Intro3";
import Intro4 from "./Intro4";
import Intro5 from "./Intro5";
import Trial from "./Trial";
import Trialifno from "./Trialinfo";

export default function Main() {
  return (
    <div className="flex max-w-7xl max-h-full mx-auto px-4 flex-col">
      <div className="my-24 first:mt-32">
        <Intro1 />
      </div>
      <div className="my-40 mx-auto">
        <Intro2 />
      </div>
      <div className="my-32">
        <Intro3 />
      </div>
      <div className="my-32">
        <Intro4 />
      </div>
      <div className="my-32 mx-auto">
        <Trial />
      </div>
      <div className="my-24 last:mb-0 mx-auto">
        <Intro5 />
      </div>
    </div>
  );
}
