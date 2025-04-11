import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginRequestDto, LoginResponceDto, RegistrationRequestDto } from "../types/apiTypes";
import { AsyncThunkOptions } from "../types/toolkitTypes";
import { Auth } from "../api";

const NAMESPACE = 'user';

export const signIn = createAsyncThunk<LoginResponceDto, LoginRequestDto, AsyncThunkOptions>(
    `${NAMESPACE}/signIn`,
    async(loginData, {rejectWithValue}) => {
        try {
            return await Auth.signIn(loginData);
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const signUp = createAsyncThunk<LoginResponceDto, RegistrationRequestDto, AsyncThunkOptions>(
    `${NAMESPACE}/signUp`,
    async(registrationData, {rejectWithValue}) => {
        try {
            await Auth.signUp(registrationData);
            return await Auth.signIn({
                login: registrationData.login,
                password: registrationData.password
            });
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
)