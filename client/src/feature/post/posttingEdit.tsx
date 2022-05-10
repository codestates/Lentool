import {
  ReactChild,
  ReactFragment,
  ReactPortal,
  useState,
  useEffect,
} from "react";
import {
  usePostidQuery,
  useToolsEditMutation,
  useToolsMutation,
} from "services/api";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAppSelector } from "app/hooks";
import Beforelogin from "feature/navbar/Beforelogin";
const src = [
  ["망치", "hammer"],
  ["렌치", "wrench"],
  ["몽키스패너", "monkey_spanne"],
  ["육각렌치", "hexagon_wrench"],
  ["줄자", "tape_measure"],
  ["니퍼", "nipper"],
  ["소", "saw"],
  ["플라이어", "pliers"],
  ["쇼벨", "shovel"],
  ["솔더링", "soldering_iron"],
  ["롱노즈", "long_nose"],
  ["기타", "etc"],
];
export default function PostingEdit() {
  const location: any = useLocation();
  const { push } = useHistory();

  const post_id = location.state.data.id;
  //   console.log(post_id);
  const { data, isLoading, error } = usePostidQuery(post_id, {
    refetchOnMountOrArgChange: true,
  });

  // console.log(data);
  // const beforeTag = console.log(data.data.post.tag);

  // console.log(location.state.data.price);
  // const post = useAppSelector(
  //   (state) => state.persistedReducer.posts.posts.posts
  // );
  // console.log(post);
  const [photo, setPhoto] = useState([]);
  const [preview1, setPreview1] = useState("");
  const [preview2, setPreview2] = useState("");
  const [preview3, setPreview3] = useState("");
  const [isTag, setIsTag]: any = useState([]);
  const [inputValue, setInputValue] = useState({
    title: ``,
    price: ``,
    description: ``,
  });
  // const beforeTitle = data.data.post.title;
  // const beforePrice = data.data.post.price;
  // const beforeDescription = data.data.post.description;

  useEffect(() => {
    if (!isLoading) {
      setInputValue({
        title: data.data.post.title,
        price: data.data.post.price,
        description: data.data.post.description,
      });
    }
  }, [data]);

  const [tools] = useToolsMutation();
  const [toolsEdit] = useToolsEditMutation();
  /* Tag 추가 */
  const handleTag = (e: any) => {
    setIsTag([...isTag, e]);
  };
  /* Tag 삭제 */
  const handleRemoveTag = (e: any) => {
    const remove = isTag.filter((el: any) => {
      return el !== e;
    });
    setIsTag(remove);
  };
  /* input 상태값 저장 */
  const handleInputValue =
    (key: string) => (e: { target: { value: string } }) => {
      setInputValue({ ...inputValue, [key]: e.target.value });
    };

  /* 프리뷰 이미지 생성 및 사진 상태 저장 */
  const handlePreview = (e: any) => {
    setPhoto(e.target.files);
    console.log(e.target.files);
    if (e.target.files[0]) setPreview1(URL.createObjectURL(e.target.files[0]));
    if (e.target.files[1]) setPreview2(URL.createObjectURL(e.target.files[1]));
    if (e.target.files[2]) setPreview3(URL.createObjectURL(e.target.files[2]));
  };

  /* 포스팅 완료 버튼 */
  const handlePosting = async (e: any) => {
    const formdata: any = new FormData();
    formdata.append("title", inputValue.title);
    formdata.append("price", inputValue.price);
    formdata.append("description", inputValue.description);
    formdata.append("tag", isTag[0][1]);
    for (let i = 0; i < photo.length; i++) {
      formdata.append("photo", photo[i]);
    }
    await toolsEdit([e, formdata]).unwrap();

    push("/");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-4">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              포스트 수정하기 🛠
            </h2>
          </div>
          {data && (
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
                <input type="file" alt="" multiple onChange={handlePreview} />
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
              {src.map((el) => {
                return (
                  <button
                    onClick={() => handleTag(el)}
                    type="button"
                    className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-gray-200 uppercase last:mr-0 mr-1"
                  >
                    {el[0]}
                  </button>
                );
              })}
              {isTag &&
                isTag.map(
                  (
                    el: (
                      | boolean
                      | ReactChild
                      | ReactFragment
                      | ReactPortal
                      | null
                      | undefined
                    )[]
                  ) => {
                    return (
                      <>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200 uppercase last:mr-0 mr-1">
                          {el[0]}
                        </span>
                        <button
                          onClick={() => handleRemoveTag(el)}
                          className="text-gray-500 pr-1"
                        >
                          &times;
                        </button>
                      </>
                    );
                  }
                )}
              <button
                type="button"
                onClick={() => handlePosting(post_id)}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {/* <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg> */}
                </span>
                완료
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
