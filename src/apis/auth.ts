import { UserSlice } from '~/redux/features/auth/authSlice';
import axiosClient from './axiosClient'
import { API_METHOD, ApiResponse, EVENT_API_ENDPOINT } from './apiInterface';




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


export const apiSentCodeEmail = (data:{ email: string;title?:string }) => axiosClient<IVerificationResponse>({
    url:'/auth/send-code-email',
    method:'post',
    data 
})




export const apiRessetPassword = (data:{ codes:number[], email:string, newPassword:string, confirmPassword:string }) => axiosClient<ApiResponse<UserSlice>>({
    url:'/auth/resset-password',
    method:'put',
    data 
})

export const apiRegister = (data:{fullName: string; email: string; password: string; confirmPassword: string;}) => axiosClient<ApiResponse<UserSlice>>({
    url:'/auth/register',
    method:'post', 
    data
})
    
