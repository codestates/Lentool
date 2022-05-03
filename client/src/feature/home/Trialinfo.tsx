import { useAppSelector } from "app/hooks"

export default function Trialifno () {
  const trialInfo = useAppSelector(state => state.persistedReducer.trial)
  console.log(trialInfo.trial.data.posts)

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 border-2'>
        컨텐츠
      </div>
      <div className='flex-1 border-2'>
        컨텐츠
      </div>
    </div>
  )
}