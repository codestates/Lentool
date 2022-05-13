import { Link } from "react-router-dom";

export default function Footer () {
  return (
    <div className="max-w-7xl mx-auto pt-[50px] h-40">
      <div className="flex text-left text-gray-700 py-5 border-y border-gray-200 mx-4">
        <Link to='' className="flex-1">Github</Link>
        <Link to='' className="flex-1">Wiki</Link>
        <Link to='' className="flex-1">Stack</Link>
        <Link to='' className="flex-1">Notion</Link>
      </div>
      <div className="flex flex text-left mx-4 my-4">
        <div className="flex-1">
          <p className="text-gray-600 text-sm">
            서비스명: Lentool<br />
            Front-end: 김남현 이규동<br />
            Back-end: 백현민 조준오<br />
          </p>
        </div>
        <div className="flex-1">
          <p className="text-gray-600 text-sm">
              전화: 1111-2222<br />
              이메일: support@lentool.co.kr<br />
            </p>
        </div>
      </div>
      <p className="text-left text-sm text-gray-500 mx-4 my-4 mb-2">Copyright © 2022 Lentool All rights reserved.</p>
    </div>
  )
}