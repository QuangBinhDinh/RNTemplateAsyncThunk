import { createSlice } from '@reduxjs/toolkit';
import { User } from '@type/common';
import { userLogin } from './service';

interface Auth {
    userInfo: User | null;
    logged: boolean;
    accessToken: string | null;
    isLogging: boolean;
}

const initialState: Auth = {
    userInfo: null,
    logged: false,
    accessToken: null,

    isLogging: false,
};

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers: builder => {
        builder.addCase(userLogin.pending, state => {
            state.isLogging = true;
        });
        builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            console.log('Handled');
            console.log(payload);
            state.logged = true;
            state.isLogging = false;
            state.accessToken = payload.authenticationToken;
            state.userInfo = payload;
        });
        builder.addCase(userLogin.rejected, state => {
            state.isLogging = false;
        });
    },
});

export default auth;
