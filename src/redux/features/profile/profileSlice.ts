import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ValidationError } from '~/apis/apiInterface';
import { EventModel } from '~/models';
import { IUserProfile, userProfileData } from '~/models/UserModel';




interface ProfileState<T> {
    userProfile: T;
    isLoading: boolean,
    errorMessage: string | null;
    errors: Record<string, string> | ValidationError[]; // Thêm để lưu lỗi chi tiết
}

const initialState: ProfileState<IUserProfile> = {
    userProfile: userProfileData,
    isLoading: false,
    errorMessage: null,
    errors:{}
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addProfile: (state, action: PayloadAction<Partial<IUserProfile>>) => {
            state.userProfile = {
                ...state.userProfile,
                ...action.payload,
            }
        },
        removeProfile:(state)=>{
            state.userProfile = initialState.userProfile
        },
        resetProfile:(state)=>{
            state = initialState
        },
        resetErrorMessageProfile:(state)=>{
            state.errorMessage = null
        },
        resetErrorsProfile:(state)=>{
            state.errors = {}
        },
        resetIsLoadingProfile:(state)=>{
            state.isLoading = false
        },
        resetIsLoadingAndErrorMessageAndErrorsProfile:(state)=>{
            state.isLoading = false
            state.errors = {}
            state.errorMessage = null
        },
        resetErrorMessageAndErrorsProfile:(state)=>{
            state.errors = {}
            state.errorMessage = null
        },
    },
});

export const {addProfile,removeProfile,resetProfile,resetErrorMessageProfile,resetErrorMessageAndErrorsProfile,resetErrorsProfile,resetIsLoadingProfile,resetIsLoadingAndErrorMessageAndErrorsProfile } = profileSlice.actions;

export default profileSlice.reducer;
