// src/features/auth/authActions.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetCategories } from "~/apis";
import { ValidationError } from "~/apis/apiInterface";
import { CategoryModel } from "~/models/CategoryModel";



interface ApiResponseError {
    message: string;
    errors?: Record<string, string> | ValidationError[];
}

// Tạo một async thunk để gọi API đăng ký
export const getCategoriesApp = createAsyncThunk<CategoryModel[], void,{ rejectValue: ApiResponseError }>(
    'app/getCategories',
    async (_, thunkAPI) => {
        try {
            const response = await apiGetCategories()
            if (response.data.status) {
                return response.data.data ?? [];
            } else {
                return thunkAPI.rejectWithValue({ message: response.data.mes || 'Get Categories failed' })
            }
        } catch (error:any) {
           // Xử lý lỗi bất kỳ từ axios
            if (error.response && error.response.data) {
                return thunkAPI.rejectWithValue({ message: error.response.data.mes || 'Get Categories failed' })
            } else {
                return thunkAPI.rejectWithValue({ message: 'An unknown error has occurred' })
            }
        }
    }
)


