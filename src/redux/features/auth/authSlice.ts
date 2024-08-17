import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, registerUser, ressetPasswordUser } from './authActions';


export interface UserSlice {
    id: string;
    email: string;
    role: number;
    fullName: string;
    photoUrl: string;
    accessToken: string;
}

interface AuthState<T> {
    user: T;
    isLoading: boolean,
    errorMessage: string | null;
    errors: Record<string, string>; // Thêm để lưu lỗi chi tiết
}

const initialState: AuthState<UserSlice> = {
    user: {
        id: '',
        email: '',
        role: 2101,
        fullName: '',
        photoUrl: '',
        accessToken: '',
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
    },
});

export const { addAuth,removeAuth,resetAuth,resetErrorMessage,resetErrorMessageAndErrors,resetErrors,resetIsLoading,resetIsLoadingAndErrorMessageAndErrors } = authSlice.actions;

export default authSlice.reducer;
