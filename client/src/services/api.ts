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
  newchat: boolean;
}

export interface UserResponse {
  userInfo: any;
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
//회원탈퇴
export interface SignoutRequest {
  data: {
    userInfo: User;
  };
}
export interface SignoutResponse {
  message: string;
}
//회원수정
export interface MyinfoEditRequest {
  data: {
    userInfo: User;
  };
  password: string;
  nickname: string;
  user_address: string;
  longitude: string;
  latitude: string;
}
export interface MyinfoEditResponse {
  message: string;
}
//사진수정
export interface EditDpResponse {
  message: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,

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
  refetchOnMountOrArgChange: true,
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
      query: (param) => `post/${param}`,
    }),
    trial: builder.mutation<any, any>({
      query: (geo) => ({
        url: "/",
        credentials: "include",
        method: "POST",
        body: geo,
      }),
    }),
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
    signout: builder.mutation<SignoutResponse, SignoutRequest>({
      query: (SignoutData: any) => ({
        url: "users/signout",
        credentials: "include",
        method: "DELETE",
        body: SignoutData,
      }),
    }),
    edit: builder.mutation<MyinfoEditResponse, MyinfoEditRequest>({
      query: (MyinfoEditData: any) => ({
        url: "users/edit",
        credentials: "include",
        method: "PATCH",
        body: MyinfoEditData,
      }),
    }),
    editdp: builder.mutation<any, void>({
      query: (formdata) => ({
        url: "users/editdp",
        credentials: "include", // true
        method: "PATCH",
        body: formdata,
      }),
    }),
    search: builder.mutation<any, any>({
      query: (title: any) => ({
        url: `posts/search?title=${title}`,
        credentials: "include",
        method: "GET",
      }),
    }),
    searchByTag: builder.mutation<any, any>({
      query: (tag: any) => ({
        url: `posts/search?tag=${tag}`,
        credentials: "include",
        method: "GET",
      }),
    }),

    deletePost: builder.mutation<any, any>({
      query: (params: any) => ({
        url: `tools/${params}`,
        credentials: "include",
        method: "DELETE",
      }),
    }),
    toolsEdit: builder.mutation<any, any>({
      query: (array) => ({
        url: `tools/edit/${array[0]}`,
        credentials: "include", // true
        method: "PATCH",
        body: array[1],
      }),
    }),
    oauthLogin: builder.mutation<any, any>({
      query: (code: any) => ({
        url: `users/oauth?code=${code}`,
        credentials: "include",
        method: "GET",
      }),
    }),
    oauth: builder.query<any, any>({
      query: (code) => `users/oauth?code=${code}`,
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
  useSignoutMutation,
  useEditMutation,
  useEditdpMutation,
  useSearchMutation,
  useDeletePostMutation,
  useSearchByTagMutation,
  useToolsEditMutation,
  useOauthLoginMutation,
  useOauthQuery,
} = api;
