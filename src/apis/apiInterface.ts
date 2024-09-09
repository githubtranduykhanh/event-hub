export interface ApiResponse<T> {
    status: boolean;
    mes?: string;
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

