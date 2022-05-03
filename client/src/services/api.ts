import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";
import { REHYDRATE } from "redux-persist";

export interface User {
  createAt: string;
  email: string;
  id: number;
  nickname: string;
  updatedAt: string;
  user_address: string;
  user_photo: string;
}

export interface UserResponse {
  data: {
    accessToken: string;
    userInfo: User;
  };
  message: string;
}

export interface LoginRequest {
  id: string;
  password: string;
}

export interface MypageResponse {
  messgae: string;
  data: {
    user_posts: [object];
    userInfo: User;
  };
}
// 회원가입 타입
export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
  user_address: string;
  latitude: string;
  longitude: string;
}
export interface SignupResponse {
  message: string;
}
//이메일 중복 체크 타입
export interface EmailRequest {
  email: string;
}
export interface EmailResponse {
  message: string;
}
// 닉네임 중복 체크 타입
export interface NicknameRequest {
  nickname: string;
}
export interface NicknameResponse {
  message: string;
}
export interface ChatLogResponse {
  user_id1: string;
  user_id2: string;
  post_id: number;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      // console.log("send token in headers");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials: any) => ({
        url: "users/login",
        credentials: "include", // true
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<{ message?: any }, void>({
      query: () => ({
        url: "users/logout",
        credentials: "include", // true
        method: "POST",
      }),
    }),
    mypage: builder.mutation<any, void>({
      query: () => ({
        url: "users/mypage",
        credentials: "include", // true
        method: "GET",
      }),
    }),
    tools: builder.mutation<any, void>({
      query: (formdata) => ({
        url: "tools",
        credentials: "include", // true
        method: "POST",
        body: formdata,
      }),
    }),
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (setSignupData: any) => ({
        url: "users/signup",
        credentials: "include",
        method: "POST",
        body: setSignupData,
      }),
    }),
    pos: builder.query<any, void>({
      query: () => "posts",
    }),
    posts: builder.mutation<any, void>({
      query: () => ({
        url: "posts",
        credentials: "include", // true
        method: "GET",
      }),
    }),
    checkemail: builder.mutation<EmailResponse, EmailRequest>({
      query: (emailValidityData: any) => ({
        url: "users/checkemail",
        credentials: "include",
        method: "POST",
        body: emailValidityData,
      }),
    }),
    checknickname: builder.mutation<NicknameResponse, NicknameRequest>({
      query: (nicknameValidityData: any) => ({
        url: "users/checknickname",
        credentials: "include",
        method: "POST",
        body: nicknameValidityData,
      }),
    }),
    postid: builder.query<any, number>({
      query: (param) => `post/${param}`
    }),
    trial: builder.mutation<any, any>({
      query: (geo) => ({
        url: '/',
        credentials: 'include',
        method: 'POST',
        body: geo,
      })
    createroom: builder.mutation<any, ChatLogResponse>({
      query: (chatValidityData: any) => ({
        url: "chat/create",
        credentials: "include",
        method: "POST",
        body: chatValidityData,
      }),
    }),
    searchroom: builder.mutation<any, void>({
      query: () => ({
        url: "chat/",
        credentials: "include",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useCheckemailMutation,
  useChecknicknameMutation,
  useLogoutMutation,
  useMypageMutation,
  useToolsMutation,
  usePosQuery,
  usePostsMutation,
  usePostidQuery,
  useTrialMutation,
  useCreateroomMutation,
  useSearchroomMutation,
} = api;
