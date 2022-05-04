import { useState } from "react"
import { useToolsMutation } from "services/api";
import { Link, useHistory } from "react-router-dom";
import { getPosts } from 'feature/post/postSlice';
import { useAppSelector } from "app/hooks";

export default function Posting () {
  const { push } = useHistory()
  const post = useAppSelector(state => state.persistedReducer.posts.posts.posts)
  const [photo, setPhoto] = useState([])
  const [preview1, setPreview1] = useState('')
  const [preview2, setPreview2] = useState('')
  const [preview3, setPreview3] = useState('')
  const [inputValue, setInputValue] = useState({
    title: '',
    price: '',
    description: '',
  })
  const [tools] = useToolsMutation()
  // const { data } = usePostidQuery(2)
  /* input 상태값 저장 */
  const handleInputValue = (key: string) => (e: { target: { value: string; }; }) => {
    setInputValue({ ...inputValue, [key]: e.target.value });
  }
  /* 프리뷰 이미지 생성 및 사진 상태 저장 */
  const handlePreview = (e: any) => {
      // const p:any = []
      // for(let i = 0; i < e.target.files.length; i++) {
        //   p.push(e.target.files[i])
        // }
        // setPhoto(p)
        // console.log(...photo)
      
        if (e.target.files[0]) setPreview1(URL.createObjectURL(e.target.files[0]));
        if (e.target.files[1]) setPreview2(URL.createObjectURL(e.target.files[1]));
        if (e.target.files[2]) setPreview3(URL.createObjectURL(e.target.files[2]));
      }
      /* 포스팅 완료 버튼 */
  const handlePosting = async () => {
    const formdata:any = new FormData()
    formdata.append('title', inputValue.title)
    formdata.append('price', inputValue.price)
    formdata.append('description', inputValue.description)
    // formdata.append('photo', ...photo)
    await tools(formdata).unwrap();

    push(`/post/${post.length-1}`)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-4">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">로그인</h2>
          </div>
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px text-left ">
              <div className="mb-3">
                <label htmlFor="title" className="text-sm" >제목</label>
                <input id="title" name="title" type="text" onChange={handleInputValue('title')} /* autoComplete="email" */ required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="제목을 입력해주세요" />
              </div>
              <div>
                <label htmlFor="price" className="text-sm">가격</label>
                <input id="price" name="price" type="number" onChange={handleInputValue('price')} /* autoComplete="current-password" */ required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="가격을 정해주세요" />
              </div>
            </div>
            <div className="text-left">
              <input type="file" alt='' multiple onChange={handlePreview} />
              <div className='flex'>
                {preview1 && <img src={preview1} className='rounded-md w-20 h-20 bg-gray-300' alt=''/>}
                {preview2 && <img src={preview2} className='rounded-md w-20 h-20 bg-gray-300' alt=''/>}
                {preview3 && <img src={preview3} className='rounded-md w-20 h-20 bg-gray-300' alt=''/>}
              </div>
            </div>
            <div className="rounded-md shadow-sm -space-y-px text-left ">
              <label htmlFor="description" className="text-sm">내용</label>
              <textarea id="description" name="description" onChange={handleInputValue('description')} /* autoComplete="current-password" */ required className="appearance-none relative block w-full px-3 py-20 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="ex. 크기, 상태 등" />
            </div>
            <button type="button" onClick={handlePosting} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg> */}
              </span>
              완료
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}