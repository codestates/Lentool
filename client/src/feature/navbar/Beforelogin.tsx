import { useAppDispatch } from "app/hooks";
import { setIsModal } from "feature/modal/modalSlice";

export default function Beforelogin () {
  const dispatch = useAppDispatch()
  const handleModal = (e: any) => {
    e.preventDefault();
    dispatch(setIsModal());
  };
  return (
    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
    <a
      href="#javascript"
      onClick={handleModal}
      className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
    >
      로그인
    </a>
  </div>
  )
}