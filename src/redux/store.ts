import { configureStore } from '@reduxjs/toolkit';
import authReducer from '~/redux/features/auth/authSlice';
import appReducer from '~/redux/features/app/appSlice';
import profileReducer from '~/redux/features/profile/profileSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app:appReducer,
    profile:profileReducer,
  },
});


export const authSelector = (state:RootState) => state.auth

export const appSelector = (state:RootState) => state.app

export const profileSelector = (state:RootState) => state.profile

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const appDispatch: AppDispatch = store.dispatch;

export default store;
