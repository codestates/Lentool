/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PUBLIC_URL: string;
    REACT_APP_SERVER_URL: string;
    REACT_APP_KAKAO_MAP: string;
    REACT_APP_KAKAO_REST_API: string;
    REACT_APP_KAKAO_REDIRECT_URI: string;
  }
}
