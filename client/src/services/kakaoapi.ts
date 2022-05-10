import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import { REHYDRATE } from "redux-persist";

export const kakaoapi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://kauth.kakao.com/",
    credentials: "include",
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth.token;
    //   // console.log("send token in headers");
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    kakaoLogin: builder.mutation<any, any>({
      query: () => ({
        url: `oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`,
        credentials: "include", // true
        method: "GET",
      }),
    }),
  }),
});

export const { useKakaoLoginMutation } = kakaoapi;
