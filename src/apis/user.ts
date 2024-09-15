import { UserSlice } from '~/redux/features/auth/authSlice';
import axiosClient from './axiosClient'
import { UsersModel } from '~/models/UserModel';
import { EventModel } from '~/models';
import { API_METHOD, ApiResponse, USER_API_ENDPOINT } from './apiInterface';





export const apiUsers = () => axiosClient<ApiResponse<UsersModel[]>>({
    url:'/users/',
    method:'get',
})


export const apiPutFollowersEvents = (idEvent:string) => axiosClient<ApiResponse<string[]>>({
    url: USER_API_ENDPOINT.FOLLOWERS + '/' + idEvent,
    method: API_METHOD.PUT,
})

export const apiGetFollowersUser = () => axiosClient<ApiResponse<string[]>>({
    url:USER_API_ENDPOINT.FOLLOWERS_USER,
    method:API_METHOD.GET, 
})


    
