import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ValidationError } from '~/apis/apiInterface';
import { EventModel } from '~/models';
import { IUserProfile, userProfileData } from '~/models/UserModel';
import { interestProfileUser } from './profileActions';




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
    extraReducers: (builder) => {
        builder
            .addCase(interestProfileUser.pending, (state) => {
                state.isLoading = true;  
                state.errorMessage = null;        
            })
            .addCase(interestProfileUser.fulfilled, (state, action: PayloadAction<string[]>) => {
                state.isLoading = false;
                state.userProfile.interests = action.payload;
                state.errorMessage = null;   
            })
            .addCase(interestProfileUser.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload?.message || 'Interest Profile User failed';
                state.errors = action.payload?.errors || {}; // Cập nhật lỗi chi tiết
            });
        
    }
});

export const {addProfile,removeProfile,resetProfile,resetErrorMessageProfile,resetErrorMessageAndErrorsProfile,resetErrorsProfile,resetIsLoadingProfile,resetIsLoadingAndErrorMessageAndErrorsProfile } = profileSlice.actions;

export default profileSlice.reducer;
