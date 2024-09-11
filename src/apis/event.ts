import { EventModel } from "~/models";
import { API_METHOD, ApiResponse, EVENT_API_ENDPOINT, URL_API_ENDPOINT } from "./apiInterface";
import axiosClient from "./axiosClient";





export const apiAddNewEvent = (eventModel:EventModel) => axiosClient<ApiResponse<[]>>({
    url: EVENT_API_ENDPOINT.ADD_NEW_EVENT,
    method: API_METHOD.POST,
    data:eventModel
})
