import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'checking', // 'checking', 'authenticated', 'not-authenticated'
    isLoading: false,
    user: {
        uid:null,
        email:null,
        displayName: null,
        photoURL: null,
    },
    errorMessage: null,
    
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onChecking: (state)=>{
            state.status = 'checking';
        },
        onLoading: (state) => {
            state.isLoading = true;
        },
        onLogin: (state, {payload}) => {
            state.status = 'authenticated';
            state.user.uid = payload.uid;
            state.user.email = payload.email;
            state.user.displayName = payload.displayName;
            state.user.photoURL = payload.photoURL;
            state.errorMessage = payload.errorMessage;
            state.isLoading = false;
        },
        onLogout: (state, {payload}) => {
            state.status = 'not-authenticated';
            state.user.uid = null;
            state.user.email = null;
            state.user.displayName = null;
            state.user.photoURL = null;
            state.errorMessage = payload?.errorMessage;
            state.isLoading = false;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = null;
        }
            
    }
})

export const {  onChecking, onLogin, onLoading, onLogout, clearErrorMessage } = authSlice.actions;

export default authSlice.reducer;