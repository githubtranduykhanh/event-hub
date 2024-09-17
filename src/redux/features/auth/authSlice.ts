import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFollowedEventUser, loginUser, registerUser, ressetPasswordUser } from './authActions';
import { ValidationError } from '~/apis/apiInterface';


export interface UserSlice {
    _id: string;
    email: string;
    role: number;
    fullName: string;
    photoUrl: string;
    expoPushToken:string;
    followedEvents:string[];
    accessToken: string;
}

interface AuthState<T> {
    user: T;
    isLoading: boolean,
    errorMessage: string | null;
    errors: Record<string, string> | ValidationError[]; // Thêm để lưu lỗi chi tiết
}

const initialState: AuthState<UserSlice> = {
    user: {
        _id: '',
        email: '',
        role: 2101,
        fullName: '',
        photoUrl: '',
        accessToken: '',
        expoPushToken:'',
        followedEvents:[]
    },
    isLoading: false,
    errorMessage: null,
    errors:{}
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addAuth: (state, action: PayloadAction<Partial<UserSlice>>) => {
            state.user = {
                ...state.user,
                ...action.payload,
            }
        },
        updateUserFollowedEvents: (state, action: PayloadAction<string[]>) => {
            state.user.followedEvents = action.payload
        },
        removeAuth:(state)=>{
            state.user = initialState.user
        },
        resetAuth:(state)=>{
            state = initialState
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
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;  
                state.errorMessage = null;        
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserSlice>) => {
                state.isLoading = false;
                state.user = action.payload;
                state.errorMessage = null;   
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload?.message || 'Login failed';
                state.errors = action.payload?.errors || {}; // Cập nhật lỗi chi tiết
            });
        builder.addCase(registerUser.pending, (state) => {
                state.isLoading = true;   
                state.errorMessage = null;          
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<UserSlice>) => {
                state.isLoading = false;
                state.user = action.payload;    
                state.errorMessage = null;   
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload?.message || 'Registration failed';
                state.errors = action.payload?.errors || {}; // Cập nhật lỗi chi tiết
            });
        builder.addCase(ressetPasswordUser.pending, (state) => {
                state.isLoading = true;   
                state.errorMessage = null;          
            })
            .addCase(ressetPasswordUser.fulfilled, (state, action: PayloadAction<UserSlice>) => {
                state.isLoading = false;
                state.user = action.payload;    
                state.errorMessage = null;   
            })
            .addCase(ressetPasswordUser.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload?.message || 'Resset Password failed';
                state.errors = action.payload?.errors || {}; // Cập nhật lỗi chi tiết
            });  
        builder.addCase(getFollowedEventUser.pending, (state) => {
                state.isLoading = true;   
                state.errorMessage = null;          
            })
            .addCase(getFollowedEventUser.fulfilled, (state, action: PayloadAction<string[]>) => {
                state.isLoading = false;
                state.user.followedEvents = action.payload;    
                state.errorMessage = null;   
            })
            .addCase(getFollowedEventUser.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload?.message || 'Get followers user failed';
                state.errors = action.payload?.errors || {}; // Cập nhật lỗi chi tiết
            });       
    },
});

export const {updateUserFollowedEvents,addAuth,removeAuth,resetAuth,resetErrorMessage,resetErrorMessageAndErrors,resetErrors,resetIsLoading,resetIsLoadingAndErrorMessageAndErrors } = authSlice.actions;

export default authSlice.reducer;
