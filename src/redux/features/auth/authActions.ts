// src/features/auth/authActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiLogin,apiRegister, apiRessetPassword } from '~/apis';
import { UserSlice } from './authSlice'; // Đường dẫn đến file slice của bạn

import { saveToStorage } from '~/utils/storage';


interface LoginError {
    message: string;
    errors?: Record<string, string>;
}
// Tạo một async thunk để gọi API đăng nhập
export const loginUser = createAsyncThunk<UserSlice, { email: string; password: string,isRemember:boolean },{ rejectValue: LoginError }>(
    'auth/loginUser',
    async ({ email, password,isRemember }, thunkAPI) => {
        try {
            const response = await apiLogin({ email, password })
            console.log('loginUser',response)
            if (response.data.status) {
                const userData = response.data.data as UserSlice;    
                // Lưu vào AsyncStorage
                await saveToStorage('isRemember', isRemember);
                await saveToStorage('auth', userData);
                return userData;
            } else {
                return thunkAPI.rejectWithValue({ message: response.data.mes || 'Login failed' , errors:response?.data?.errors || {}})
            }
        } catch (error:any) {
            console.log('loginUser error',error)
           // Xử lý lỗi bất kỳ từ axios
            if (error.response && error.response.data) {
                return thunkAPI.rejectWithValue({ message: error.response.data.mes || 'Login failed' , errors: error?.response?.data?.errors || {}})
            } else {
                return thunkAPI.rejectWithValue({ message: 'An unknown error has occurred' })
            }
        }
    }
)


// Tạo một async thunk để gọi API đăng ký
export const registerUser = createAsyncThunk<UserSlice, {fullName: string; email: string; password: string; confirmPassword: string;},{ rejectValue: LoginError }>(
    'auth/registerUser',
    async ({fullName, email, password, confirmPassword}, thunkAPI) => {
        try {
            const response = await apiRegister({fullName, email, password, confirmPassword})
            if (response.data.status) {
                const userData = response.data.data as UserSlice;    
                // Lưu vào AsyncStorage
                await saveToStorage('auth', userData);
                return userData;
            } else {
                return thunkAPI.rejectWithValue({ message: response.data.mes || 'Registration failed' })
            }
        } catch (error:any) {
           // Xử lý lỗi bất kỳ từ axios
            if (error.response && error.response.data) {
                return thunkAPI.rejectWithValue({ message: error.response.data.mes || 'Registration failed' })
            } else {
                return thunkAPI.rejectWithValue({ message: 'An unknown error has occurred' })
            }
        }
    }
)



// Tạo một async thunk để gọi API đặt lại mật khẩu
export const ressetPasswordUser = createAsyncThunk<UserSlice, {codes:number[], email:string, newPassword:string, confirmPassword:string},{ rejectValue: LoginError }>(
    'auth/ressetPasswordUser',
    async ({codes, email, newPassword, confirmPassword}, thunkAPI) => {
        try {
            const response = await apiRessetPassword({codes,email,newPassword,confirmPassword})
            if (response.data.status) {
                const userData = response.data.data as UserSlice;    
                // Lưu vào AsyncStorage
                await saveToStorage('auth', userData);
                return userData;
            } else {
                return thunkAPI.rejectWithValue({ message: response.data.mes || 'Resset Password failed' })
            }
        } catch (error:any) {
           // Xử lý lỗi bất kỳ từ axios
            if (error.response && error.response.data) {
                return thunkAPI.rejectWithValue({ message: error.response.data.mes || 'Resset Password failed' })
            } else {
                return thunkAPI.rejectWithValue({ message: 'An unknown error has occurred' })
            }
        }
    }
)

