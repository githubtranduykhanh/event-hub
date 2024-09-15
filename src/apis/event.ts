import { EventModel, EventQueryParams } from "~/models";
import { API_METHOD, ApiResponse, EVENT_API_ENDPOINT, URL_API_ENDPOINT } from "./apiInterface";
import axiosClient from "./axiosClient";


export const apiGetEvents = (params?:EventQueryParams) => axiosClient<ApiResponse<EventModel[]>>({
    url: EVENT_API_ENDPOINT.GET_ALL,
    method: API_METHOD.GET,
    params
})




export const apiAddNewEvent = (eventModel:EventModel) => axiosClient<ApiResponse<[]>>({
    url: EVENT_API_ENDPOINT.ADD_NEW_EVENT,
    method: API_METHOD.POST,
    data:eventModel
})




export const apiByDistance = (params:{lat:number,lng:number,distance:number}) => axiosClient<ApiResponse<EventModel[]>>({
    url: EVENT_API_ENDPOINT.DISTANCE,
    method: API_METHOD.GET,
    params
})
