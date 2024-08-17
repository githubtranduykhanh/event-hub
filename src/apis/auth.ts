import { UserSlice } from '~/redux/features/auth/authSlice';
import axiosClient from './axiosClient'


interface ApiResponse<T> {
    status: boolean;
    mes?: string;
    data?: T;
    errors?: Record<string, string>;
}

interface IVerificationResponse {
    status: boolean;
    mes?: string;
    email?: string;
    numbers?: number[];
}


export const apiLogin = (data:{ email: string; password: string }) => axiosClient<ApiResponse<UserSlice>>({
    url:'/auth/login',
    method:'post',
    data 
})


export const apiVerification = (data:{ email: string; }) => axiosClient<IVerificationResponse>({
    url:'/auth/verification',
    method:'post',
    data 
})



export const apiRegister = (data:{fullName: string; email: string; password: string; confirmPassword: string;}) => axiosClient<ApiResponse<UserSlice>>({
    url:'/auth/register',
    method:'post', 
    data
})
    
