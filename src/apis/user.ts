import { UserSlice } from '~/redux/features/auth/authSlice';
import axiosClient from './axiosClient'
import { UsersModel } from '~/models/UserModel';


interface ApiResponse<T> {
    status: boolean;
    mes?: string;
    data?: T;
    errors?: Record<string, string>;
}



export const apiUsers = () => axiosClient<ApiResponse<UsersModel[]>>({
    url:'/users/',
    method:'get',
})


    
