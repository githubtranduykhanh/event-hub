import { UserSlice } from '~/redux/features/auth/authSlice';
import axiosClient from './axiosClient'
import { UsersModel } from '~/models/UserModel';
import { EventModel } from '~/models';
import { ApiResponse } from './apiInterface';





export const apiUsers = () => axiosClient<ApiResponse<UsersModel[]>>({
    url:'/users/',
    method:'get',
})





    
