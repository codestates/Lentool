export default function Footer() {
  return (
    <div className="max-w-7xl mx-auto pt-[50px] h-40">
      <div className="flex text-left text-gray-700 py-5 border-y border-gray-200 mx-4">
        <a
          target="_blank"
          className="flex-1"
          href="https://github.com/codestates/Lentool/" rel="noreferrer"
        >
          Github
        </a>
        <a
          target="_blank"
          className="flex-1"
          href="https://github.com/codestates/Lentool/wiki" rel="noreferrer"
        >
          Wiki
        </a>
        <a
          target="_blank"
          className="flex-1"
          href="https://github.com/codestates/Lentool/wiki/%EA%B8%B0%ED%9A%8D#tech-stack-table" rel="noreferrer"
        >
          Stack
        </a>
        <a target="_blank" className="flex-1" href="https://www.notion.so/12-KBLC-LENTOOL-7a11cebf1d764d98b814ed0db9f8e3fd" rel="noreferrer">
          Notion
        </a>
      </div>
      <div className=" flex text-left mx-4 my-4">
        <div className="flex-1">
          <p className="text-gray-600 text-sm">
            서비스명: LENTOOL
            <br />
            Front-end:{" "}
            <a target="_blank" href="https://github.com/hokikie" rel="noreferrer">
              김남현
            </a>{" "}
            <a target="_blank" href="https://github.com/JKS5" rel="noreferrer">
              이규동
            </a>
            <br />
            Back-end:{" "}
            <a target="_blank" href="https://github.com/kaisiok" rel="noreferrer">
              백현민
            </a>{" "}
            <a target="_blank" href="https://github.com/36chojuno" rel="noreferrer">
              조준오
            </a>
            <br />
          </p>
        </div>
        <div className="flex-1">
          <p className="text-gray-600 text-sm">
            전화: 010-3364-9075
            <br />
            이메일: nhpunch@gmail.com
            <br />
          </p>
        </div>
      </div>
      <p className="text-left text-sm text-gray-500 mx-4 my-4 pb-4">
        Copyright © 2022 Lentool All rights reserved.
      </p>
    </div>
  );
}