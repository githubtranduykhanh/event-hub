import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Location from 'expo-location';

interface Region extends Location.LocationGeocodedAddress {
    latitude: number;
    longitude: number;
}
interface AppState {
    region: Region;
    isLoading: boolean,
    errorMessage: string | null;
    errors: Record<string, string>; // Thêm để lưu lỗi chi tiết
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
