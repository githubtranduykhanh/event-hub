// src/features/auth/authActions.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiPutInterestProfileUser } from "~/apis";
import { ValidationError } from "~/apis/apiInterface";



interface ApiResponseError {
    message: string;
    errors?: Record<string, string> | ValidationError[];
}

// Tạo một async thunk để gọi API đăng ký
export const interestProfileUser = createAsyncThunk<string[], {interests:string[]},{ rejectValue: ApiResponseError }>(
    'auth/interestProfileUser',
    async ({interests}, thunkAPI) => {
        try {
            const response = await apiPutInterestProfileUser({interests})
            if (response.data.status) {
                return response.data.data ?? [];
            } else {
                return thunkAPI.rejectWithValue({ message: response.data.mes || 'Interest Profile User failed' })
            }
        } catch (error:any) {
           // Xử lý lỗi bất kỳ từ axios
            if (error.response && error.response.data) {
                return thunkAPI.rejectWithValue({ message: error.response.data.mes || 'Interest Profile User failed' })
            } else {
                return thunkAPI.rejectWithValue({ message: 'An unknown error has occurred' })
            }
        }
    }
)


