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
    FOLLOWERS = URL_API_ENDPOINT.EVENTS + '/followers'
}



export enum API_METHOD {
    POST = 'post',
    GET = 'get',
    PUT = 'put',
    DELETE = 'delete'
}