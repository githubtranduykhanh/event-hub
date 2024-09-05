import { configureStore } from '@reduxjs/toolkit';
import authReducer from '~/redux/features/auth/authSlice';
import appReducer from '~/redux/features/app/appSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app:appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
