import { UserSlice } from '~/redux/features/auth/authSlice';
import axiosClient from './axiosClient'
interface ApiResponse<T> {
    status: boolean;
    mes?: string;
    data?: T;
    errors?: Record<string, string>;
}




export const apiLogin = (data:{ email: string; password: string }) => axiosClient<ApiResponse<UserSlice>>({
    url:'/auth/login',
    method:'post',
    data 
})



export const apiRegister = (data:{fullName: string; email: string; password: string; confirmPassword: string;}) => axiosClient<ApiResponse<UserSlice>>({
    url:'/auth/register',
    method:'post', 
    data
})
    
