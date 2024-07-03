import { combineReducers } from '@reduxjs/toolkit';
import auth from '../module/auth/reducer';

export const rootReducer = combineReducers({
    auth: auth.reducer,
});
