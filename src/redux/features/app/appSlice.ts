import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Location from 'expo-location';
import { getCategoriesApp } from './appActions';
import { CategoryModel } from '~/models/CategoryModel';
import { ValidationError } from '~/apis/apiInterface';

interface Region extends Location.LocationGeocodedAddress {
    latitude: number;
    longitude: number;
}
interface AppState {
    region: Region;
    categories:CategoryModel[]
    isLoading: boolean,
    errorMessage: string | null;
    errors: Record<string, string> | ValidationError[]; // Thêm để lưu lỗi chi tiết
}

const initialState: AppState = {
    region:{
        latitude: 0,
        longitude: 0,
        city: null,
        country: null,
        district: null,
        isoCountryCode: null,
        name: null,
        postalCode: null,
        region: null,
        street: null,
        streetNumber: null,
        subregion: null,
        timezone: null,
        formattedAddress:null
    },
    categories:[],
    isLoading: false,
    errorMessage: null,
    errors:{}
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        addRegion: (state, action: PayloadAction<Region>) => {
            state.region = action.payload
        },
        resetErrorMessage:(state)=>{
            state.errorMessage = null
        },
        resetErrors:(state)=>{
            state.errors = {}
        },
        resetIsLoading:(state)=>{
            state.isLoading = false
        },
        resetIsLoadingAndErrorMessageAndErrors:(state)=>{
            state.isLoading = false
            state.errors = {}
            state.errorMessage = null
        },
        resetErrorMessageAndErrors:(state)=>{
            state.errors = {}
            state.errorMessage = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriesApp.pending, (state) => {
                state.isLoading = true;  
                state.errorMessage = null;        
            })
            .addCase(getCategoriesApp.fulfilled, (state, action: PayloadAction<CategoryModel[]>) => {
                state.isLoading = false;
                state.categories = action.payload;
                state.errorMessage = null;   
            })
            .addCase(getCategoriesApp.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload?.message || 'Get Categories failed';
                state.errors = action.payload?.errors || {}; // Cập nhật lỗi chi tiết
            });
        
    }
});

export const { 
    addRegion,
    resetErrorMessage,
    resetErrors,
    resetIsLoading,
    resetIsLoadingAndErrorMessageAndErrors,
    resetErrorMessageAndErrors,
 } = appSlice.actions;

export default appSlice.reducer;
