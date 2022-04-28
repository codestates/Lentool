import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../app/store'
// import reactCookies from 'react-cookie'

// export const setCookie = () :any => {
//   return reactCookies.set(name, value)
// }

export interface User {
  createAt: string
  email: string
  id: number
  nickname: string
  updatedAt: string
  user_address: string
  user_photo: string
}

export interface UserResponse {
  user: User
  token: string
}

export interface LoginRequest {
  id: string
  password: string
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/users/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials: any) => ({
        url: 'login',
        credentials: 'include', // true
        method: 'POST',
        body: credentials,
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    })
  })
})

export const { useLoginMutation, useProtectedMutation } = api