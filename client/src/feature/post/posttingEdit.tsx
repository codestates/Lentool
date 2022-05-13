import { useState, useEffect, useRef } from "react";
import {
  usePostidQuery,
  useToolsEditMutation,
} from "services/api";
import { useHistory, useParams } from "react-router-dom";
import camera from "../../images/photo_upload.png";
const src = [
  ["망치", "hammer"],
  ["수레", "wagon"],
  ["몽키스패너", "monkey_spanne"],
  ["육각렌치", "hexagon_wrench"],
  ["줄자", "tape_measure"],
  ["니퍼", "nipper"],
  ["톱", "saw"],
  ["드릴", "drill"],
  ["삽", "shovel"],
  ["인두기", "soldering_iron"],
  ["펜치", "long_nose"],
  ["기타", "etc"],
];
export default function PostingEdit() {
  const { push } = useHistory();
  let { post_id }: any = useParams();

  const { data, isLoading, error } = usePostidQuery(post_id, {
    refetchOnMountOrArgChange: true,
  });

  const [photo, setPhoto] = useState([]);
  const [preview1, setPreview1] = useState("");
  const [preview2, setPreview2] = useState("");
  const [preview3, setPreview3] = useState("");
  const [isTag, setIsTag]: any = useState(null);
  const [inputValue, setInputValue] = useState({
    title: ``,
    price: ``,
    description: ``,
  });

  useEffect(() => {
    if (!isLoading) {
      setInputValue({
        title: data.data.post.title,
        price: data.data.post.price,
        description: data.data.post.description,
      });
      const resulttag = src.filter((a) => a[1] === data.data.post.tag);
      setIsTag(resulttag[0], resulttag[1]);

      console.log(data.data.post);
    }
  }, [data]);

  const fileInput: any = useRef(null);
  //요소 필터로 src에서 요소 찾아서 그 배열만 가져오기

  const [toolsEdit] = useToolsEditMutation();
  /* Tag 추가 */
  const handleTag = (e: any) => {
    setIsTag(e);
  };
  /* Tag 삭제 */
  const handleRemoveTag = (e: any) => {
    setIsTag("");
  };
  /* input 상태값 저장 */
  const handleInputValue =
    (key: string) => (e: { target: { value: string } }) => {
      setInputValue({ ...inputValue, [key]: e.target.value });
    };

  /* 프리뷰 이미지 생성 및 사진 상태 저장 */
  const handlePreview = (e: any) => {
    setPhoto(e.target.files);
    if (e.target.files[0]) {
      setPreview1(URL.createObjectURL(e.target.files[0]));
    } else {
      setPreview1("");
    }
    if (e.target.files[1]) {
      setPreview2(URL.createObjectURL(e.target.files[1]));
    } else {
      setPreview2("");
    }
    if (e.target.files[2]) {
      setPreview3(URL.createObjectURL(e.target.files[2]));
    } else {
      setPreview3("");
    }
  };

  /* 포스팅 완료 버튼 */
  const handlePostingEdit = async (e: any) => {
    const formdata: any = new FormData();
    formdata.append("title", inputValue.title);
    formdata.append("price", inputValue.price);
    formdata.append("description", inputValue.description);
    formdata.append("tag", isTag[1]);
    for (let i = 0; i < photo.length; i++) {
      formdata.append("photo", photo[i]);
    }
    await toolsEdit([e, formdata]).unwrap();

    push("/");
  };

  return (
    <div className="bg-[#fbfbfb] py-10">
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white border rounded-lg">
        <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-6">
          <div className="w-full">
            <div>
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                포스트 수정하기 🛠
              </h2>
            </div>
            <form className="mt-8 space-y-6">
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px text-left ">
                <div className="mb-3">
                  <label htmlFor="title" className="text-sm">
                    제목
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    // defaultValue={`data.data.post.title`}

                    value={`${inputValue.title}`}
                    onChange={handleInputValue("title")}
                    /* autoComplete="email" */ required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="제목을 입력해주세요"
                  />
                </div>
                <div>
                  <label htmlFor="price" className="text-sm">
                    가격
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    // defaultValue={`${inputValue.price}`}
                    value={`${inputValue.price}`}
                    onChange={handleInputValue("price")}
                    /* autoComplete="current-password" */ required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="가격을 정해주세요"
                  />
                </div>
              </div>
              <div className="text-left">
                <label className="flex flex-col w-20 px-2 py-2 border-2 rounded-lg mr-1">
                  <input
                    type="file"
                    accept="image/jpg,image/png,image/jpeg,image/gif"
                    multiple
                    onChange={handlePreview}
                    hidden
                    required
                  />
                  <img src={camera} className="w-20 rounded-lg" alt="upload" />
                  <span className="mt-2 text-gray-500 text-xs mx-auto">
                    {photo.length} / 3
                  </span>
                </label>
                <div className="flex">
                  {preview1 && (
                    <img
                      src={preview1}
                      className="rounded-md w-20 h-20 bg-gray-300"
                      alt=""
                    />
                  )}
                  {preview2 && (
                    <img
                      src={preview2}
                      className="rounded-md w-20 h-20 bg-gray-300"
                      alt=""
                    />
                  )}
                  {preview3 && (
                    <img
                      src={preview3}
                      className="rounded-md w-20 h-20 bg-gray-300"
                      alt=""
                    />
                  )}
                </div>
              </div>
              <div className="rounded-md shadow-sm -space-y-px text-left ">
                <div>
                  <label htmlFor="description" className="text-sm">
                    내용
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    // defaultValue={`${inputValue.description}`}
                    value={`${inputValue.description}`}
                    onChange={handleInputValue("description")}
                    /* autoComplete="current-password" */ required
                    className="appearance-none relative block w-full px-3 py-20 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="ex. 크기, 상태 등"
                  />
                </div>
              </div>
              <div className="rounded-md -space-y-px text-left">
                <label htmlFor="tag" className="text-sm text-gray-700">
                  태그
                </label>
                <div className="py-1">
                  {src.map((el, idx) => {
                    return (
                      <button
                        onClick={() => handleTag(el)}
                        type="button"
                        key={idx}
                        className="text-xs inline-block py-1 px-2 rounded-full text-gray-600 bg-gray-200 last:mr-0 mr-1"
                      >
                        {el[0]}
                      </button>
                    );
                  })}
                </div>
                <div className="text-center pt-4">
                  {isTag && (
                    <>
                      <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-indigo-600 bg-indigo-200 last:mr-0 mr-1">
                        {isTag[0]}
                        <button
                          onClick={() => handleRemoveTag(isTag[0])}
                          className="text-gray-500 pl-1 text-xs"
                        >
                          &times;
                        </button>
                      </span>
                    </>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handlePostingEdit(post_id)}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
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
    </div>
  );
}
