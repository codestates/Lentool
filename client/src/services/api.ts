import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../app/store'

export interface User {
  nickname: string
}

export interface UserResponse {
  user: User
  token: string
}

export interface LoginRequest {
  email: string
  password: string
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
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
        method: 'POST',
        body: credentials,
      })
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    })
  })
})

export const { useLoginMutation, useProtectedMutation } = api