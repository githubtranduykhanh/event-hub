export interface ApiResponse<T> {
    status: boolean;
    mes?: string;
    counts?:number;
    data?: T;
    errors?: Record<string, string> | ValidationError[];
}

// Define an interface for individual error objects
export interface ValidationError {
    value: string | undefined; // Can be a string or undefined
    msg: string; // Error message
    param: string; // Field name where the error occurred
    location: string; // Location of the field (body, query, params, etc.)
}




export enum URL_API_ENDPOINT {
    AUTH = '/auth',
    USERS ='/users',
    EVENTS = '/events'
}

export enum EVENT_API_ENDPOINT {
    GET_ALL = URL_API_ENDPOINT.EVENTS,
    ADD_NEW_EVENT = URL_API_ENDPOINT.EVENTS + '/add-new',
    DISTANCE = URL_API_ENDPOINT.EVENTS + '/by-distance',
    FOLLOWERS = URL_API_ENDPOINT.EVENTS + '/followers',
    CATEGORIES = URL_API_ENDPOINT.EVENTS + '/categories',
    GET_BY_ID = URL_API_ENDPOINT.EVENTS + '/',
}



export enum USER_API_ENDPOINT {
    ADD_NEW_EVENT = URL_API_ENDPOINT.EVENTS + '/add-new',
    FOLLOWERS = URL_API_ENDPOINT.USERS + '/followers',
    DATA_DEFAULT = URL_API_ENDPOINT.USERS + '/data-default',
    UN_FOLLOWERS = URL_API_ENDPOINT.USERS + '/unFollowers',
    FOLLOWERS_USER = URL_API_ENDPOINT.USERS + '/followers-user',
    EXPO_PUSH_TOKEN = URL_API_ENDPOINT.USERS + '/expoPushToken',
    PROFILE = URL_API_ENDPOINT.USERS + '/profile',
    EMAIL_PROFILE = URL_API_ENDPOINT.USERS + '/profile-email',
    MY_PROFILE = URL_API_ENDPOINT.USERS + '/my-profile',
    INTEREST_PROFILE = URL_API_ENDPOINT.USERS + '/profile-interest',
    FRIEND = URL_API_ENDPOINT.USERS + '/friend',
    SEND_INVITE_NOTIFICATION = URL_API_ENDPOINT.USERS + '/send-invite-notification',
}



export enum API_METHOD {
    POST = 'post',
    GET = 'get',
    PUT = 'put',
    DELETE = 'delete'
}