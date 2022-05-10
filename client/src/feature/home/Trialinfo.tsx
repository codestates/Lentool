import { useAppSelector } from "app/hooks";
import notFound from "../../images/undraw_traveling_re_weve.svg";

export default function Trialifno() {
  const trialInfo = useAppSelector((state) => state.persistedReducer.trial);
  // console.log(trialInfo)
  console.log(trialInfo.trial.data.posts)

  return (

    <div className="grid grid-cols-2 gap-x-10 gap-y-4">
      { trialInfo.trial.data.posts ? trialInfo.trial.data.posts.map((trial: any) => {
        return (
          <div className="py-2 rounded-2xl max-w-sm text-left">
            <div className="relative rounded-xl xl:aspect-w-7 xl:aspect-h-8">
              <img
                src={`http://localhost:80${trial.photo1}`}
                alt="my-posting"
                className="h-[14rem] w-auto rounded-xl object-center object-cover"
              />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {trial.title}
            </h3>
            <h3 className="text-xs text-gray-700">
              {trial.address}
            </h3>

          </div>
        </div>
      )}
    </div>
  );
}
