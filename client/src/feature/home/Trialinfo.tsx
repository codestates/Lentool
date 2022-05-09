import { useAppSelector } from "app/hooks";
import { ReactChild, ReactFragment, ReactPortal } from "react";


export default function Trialifno () {
  const trialInfo = useAppSelector(state => state.persistedReducer.trial)
  console.log(trialInfo)

  return (
    <div className="flex flex-col h-full">
      { trialInfo && trialInfo.trial.data.posts.map((trial: any) => {
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
    }
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