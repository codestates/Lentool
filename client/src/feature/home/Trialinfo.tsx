import { useAppSelector } from "app/hooks";
import { ReactChild, ReactFragment, ReactPortal } from "react";
import notFound from "../../images/undraw_traveling_re_weve.svg";

export default function Trialifno() {
  const trialInfo = useAppSelector((state) => state.persistedReducer.trial);
  // console.log(trialInfo)

  return (
    // <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

    <div className="grid grid-cols-2 gap-x-10 gap-y-4">
      {trialInfo ? (
        trialInfo.trial.data.posts.map((trial: any) => {
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
              <h3 className="text-xs text-gray-700">{trial.address}</h3>
            </div>
          );
        })
      ) : (
        <div className="">
          <div className="w-full h-50 relative aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img
              src={notFound}
              alt="my-posting"
              className="w-full h-full object-center object-cover group-hover:opacity-75"
            />
          </div>
        </div>
      )}
    </div>
  );
}
// <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
//           {myposts &&
//             myposts.map((mypost: any) => (
//               <a key={mypost.id} href={mypost.href} className="group">
//                 <div className="w-full h-80 relative aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
//                   <img
//                     src={`http://localhost:80${mypost.photo1}`}
//                     alt="my-posting"
//                     className="w-full h-full object-center object-cover group-hover:opacity-75"
//                   />
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 absolute top-4 right-4 fill-gray-500	 shadow-md rounded-full"
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
//                   </svg>
//                 </div>
//                 <h3 className="mt-2 text-lg font-medium text-gray-900">
//                   {mypost.title}
//                 </h3>
//                 <p className="mt-1 text-sm text-gray-700">{mypost.price}</p>
//               </a>
//             ))}
//         </div>
