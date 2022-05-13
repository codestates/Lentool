import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="max-w-7xl mx-auto pt-[50px] h-40">
      <div className="flex text-left text-gray-700 py-5 border-y border-gray-200 mx-4">
        <a
          target="_blank"
          className="flex-1"
          href="https://github.com/codestates/Lentool/"
        >
          Github
        </a>
        <a
          target="_blank"
          className="flex-1"
          href="https://github.com/codestates/wiki/"
        >
          Wiki
        </a>
        <a
          target="_blank"
          className="flex-1"
          href="https://github.com/codestates/Lentool/wiki/%EA%B8%B0%ED%9A%8D#tech-stack-table"
        >
          Stack
        </a>
        <a target="_blank" className="flex-1" href="없음">
          Notion
        </a>
      </div>
      <div className=" flex text-left mx-4 my-4">
        <div className="flex-1">
          <p className="text-gray-600 text-sm">
            서비스명: Lentool
            <br />
            Front-end:{" "}
            <a target="_blank" href="https://github.com/hokikie">
              김남현
            </a>{" "}
            <a target="_blank" href="https://github.com/JKS5">
              이규동
            </a>
            <br />
            Back-end:{" "}
            <a target="_blank" href="https://github.com/kaisiok">
              백현민
            </a>{" "}
            <a target="_blank" href="https://github.com/36chojuno">
              조준오
            </a>
            <br />
          </p>
        </div>
        <div className="flex-1">
          <p className="text-gray-600 text-sm">
            전화: 1111-2222
            <br />
            이메일: support@lentool.co.kr
            <br />
          </p>
        </div>
      </div>
      <p className="text-left text-sm text-gray-500 mx-4 my-4 mb-2">
        Copyright © 2022 Lentool All rights reserved.
      </p>
    </div>
  );
}
