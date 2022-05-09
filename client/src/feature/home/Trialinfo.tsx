import { useAppSelector } from "app/hooks";
import notFound from "../../images/undraw_traveling_re_weve.svg";

export default function Trialifno () {
  const trialInfo = useAppSelector(state => state.persistedReducer.trial)
  // console.log(trialInfo)
  // console.log(trialInfo.trial.data.posts)

  return (
    <div className="flex">
      { trialInfo.trial === [] ? trialInfo.trial.data.posts.map((trial: any) => {
        return (
          <div className="flex-1 border-2">
            <div className="w-full h-50 relative aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
              <img
                src={`http://localhost:80${trial.photo1}`}
                alt="my-posting"
                className="w-full h-full object-center object-cover group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {trial.title}
            </h3>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {trial.address}
            </h3>
          </div>
        )
      })
    : 
      <div className="">
        <div className="w-full h-50 relative aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
          <img
            src={notFound}
            alt="my-posting"
            className="w-full h-full object-center object-cover group-hover:opacity-75"
          />
        </div>
      </div>
    }
    </div>
  );
}
