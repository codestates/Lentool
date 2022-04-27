import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api'
import authReducer from '../feature/login/authSlice'
import modalReducer from '../feature/modal/modalSlice'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

