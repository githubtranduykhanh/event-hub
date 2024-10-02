import { UserSlice } from '~/redux/features/auth/authSlice';
import axiosClient from './axiosClient'
import { IUserProfile, UsersSelectModel } from '~/models/UserModel';
import { EventModel } from '~/models';
import { API_METHOD, ApiResponse, USER_API_ENDPOINT } from './apiInterface';





export const apiUsers = () => axiosClient<ApiResponse<UsersSelectModel[]>>({
    url:'/users/',
    method:'get',
})


export const apiPutFollowersEvents = (idEvent:string) => axiosClient<ApiResponse<string[]>>({
    url: USER_API_ENDPOINT.FOLLOWERS + '/' + idEvent,
    method: API_METHOD.PUT,
})

export const apiGetDataDefaultUser = () => axiosClient<ApiResponse<{
    followedEvents:string[],
    followers:string[],
    following:string[],
}>>({
    url:USER_API_ENDPOINT.DATA_DEFAULT,
    method:API_METHOD.GET, 
})


export const apiPostFollowersUser = (data:{idFollow:string}) => axiosClient<ApiResponse<{
    followUser:string[],
    myFollowingUser:string[],
}>>({
    url:USER_API_ENDPOINT.FOLLOWERS,
    method:API_METHOD.POST, 
    data
})


export const apiPostUnFollowersUser = (data:{idFollow:string}) => axiosClient<ApiResponse<{
    followUser:string[],
    myFollowingUser:string[],
}>>({
    url:USER_API_ENDPOINT.UN_FOLLOWERS,
    method:API_METHOD.POST, 
    data
})




export const apiPostExpoPushToken = (data:{expoPushToken:string}) => axiosClient<ApiResponse<[]>>({
    url: USER_API_ENDPOINT.EXPO_PUSH_TOKEN,
    method: API_METHOD.POST,
    data
})


export const apiGetProfileUser = (idUser:string) => axiosClient<ApiResponse<IUserProfile>>({
    url:USER_API_ENDPOINT.PROFILE + '/' + idUser,
    method:API_METHOD.GET, 
})



export const apiGetFriendUser = () => axiosClient<ApiResponse<IUserProfile[]>>({
    url:USER_API_ENDPOINT.FRIEND,
    method:API_METHOD.GET, 
})

export const apiPutEmailProfileUser = (data:{email:string}) => axiosClient<ApiResponse<[]>>({
    url:USER_API_ENDPOINT.EMAIL_PROFILE,
    method:API_METHOD.PUT, 
    data
})


export const apiPostInviteNotificationUser = (data:{
    messageTitle:string,
    messageBody:string,
    idUsers:string[],
    idEvent:string,
}) => axiosClient<ApiResponse<[]>>({
    url:USER_API_ENDPOINT.SEND_INVITE_NOTIFICATION,
    method:API_METHOD.POST, 
    data
})


export const apiPutInterestProfileUser = (data:{interests:string[]}) => axiosClient<ApiResponse<string[]>>({
    url:USER_API_ENDPOINT.INTEREST_PROFILE,
    method:API_METHOD.PUT, 
    data
})


export const apiPutMyProfileUser = (data:{
    photoUrl:string,
    familyName:string,
    givenName:string,
    fullName:string,
    bio:string,
}) => axiosClient<ApiResponse<[]>>({
    url:USER_API_ENDPOINT.MY_PROFILE,
    method:API_METHOD.PUT, 
    data
})


    
