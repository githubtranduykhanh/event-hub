import axiosClient from './axiosClient'
interface ApiResponse<T> {
    status: boolean;
    mes?: string;
    data?: T;
    errors?: Record<string, string>;
}

export const apiLogin = () => axiosClient({
    url:'/auth/login',
    method:'get', 
})



export const apiRegister = (data:any) => axiosClient<ApiResponse<any>>({
    url:'/auth/register',
    method:'post', 
    data
})
    
