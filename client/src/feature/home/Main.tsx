import Trial from "./Trial";
import Trialifno from "./Trialinfo";

export default function Main() {
  return (
    <div className="flex mt-6 max-w-2xl mx-auto ">
      <div className="flex-1">
        <Trial />
      </div>
      <div className="flex-1">
        <Trialifno />
      </div>
    </div>
  );
}
