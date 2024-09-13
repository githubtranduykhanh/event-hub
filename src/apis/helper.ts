import { AxiosError, AxiosResponse } from "axios"
import { ValidationError } from "./apiInterface";

interface ServerErrorResponse {
    status:boolean;
    mes?: string; // Error message
    errors?: Record<string, string> | ValidationError[]; // Validation errors
}

interface ErrorServer {
    message: string; // Error message
    errors?: Record<string, string> | ValidationError[]; // Validation errors
}

interface ErrorResponse {
    from:string;
    err:ErrorServer|unknown|any|string;
}

export enum ERROR_FROM {
    SERVER = 'Server is down or has an issue',
    CLIENT = 'Client made a bad request',
    NETWORK = 'Network error, no response received',
    AN_UNKNOWN = 'An unknown error occurred',
}

export class ApiHelper {
    static getMesErrorFromServer = (error: unknown): ErrorResponse => {
        if (error instanceof AxiosError) {
            if (error.response) {
                const statusCode = error.response.status;
    
                if (statusCode >= 500) {
                    // Lỗi từ máy chủ (5xx)
                    return {
                        from:ERROR_FROM.SERVER,
                        err:error.response.data
                    }
                    // Xử lý lỗi máy chủ
                } else if (statusCode >= 400 && statusCode < 500) {
                    const dataServer =  error.response.data as ServerErrorResponse
                    return {
                       from:ERROR_FROM.CLIENT,
                       err:{
                        message: dataServer?.mes || '', // Get message or default to an empty string
                        errors: dataServer?.errors || {} // Get errors or default to an empty object
                       }
                    };
                }
            } else if (error.request) {
                // Lỗi mạng (không nhận được phản hồi từ server)
                return {
                    from:ERROR_FROM.NETWORK,
                    err:error.request
                }
            } else {
                // Lỗi khác
                return {
                    from:ERROR_FROM.AN_UNKNOWN,
                    err:error.message
                }
            }
        } else {
            // Handle cases where error is not an AxiosError
            return {
                from: ERROR_FROM.AN_UNKNOWN,
                err: 'An unexpected error occurred'
            };
        }
        // Ensure function returns a value in all cases
        return {
            from: ERROR_FROM.AN_UNKNOWN,
            err: 'Unknown error'
        };
    };  
}