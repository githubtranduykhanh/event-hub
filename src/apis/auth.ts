import axiosClient from './axiosClient'
interface ApiResponse<T> {
    status: boolean;
    mes?: string;
    data?: T;
    errors?: Record<string, string>;
}

interface ApiResponseLogin<T> {
    status: boolean;
    mes?: string;
    data?: T;
    accessToken?:string;
    user?:T
    errors?: Record<string, string>;
}

export const apiLogin = (data:any) => axiosClient<ApiResponseLogin<any>>({
    url:'/auth/login',
    method:'post',
    data 
})



export const apiRegister = (data:any) => axiosClient<ApiResponse<any>>({
    url:'/auth/register',
    method:'post', 
    data
})
    
