import { createSlice, PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { getUsers, setUserRole } from "../../services";
import { User } from "../../types/models";

const NAME = 'administration'; 

interface AdministartionState {
    users: Array<User>;
    loading: boolean;
    adminError?: string | null;
}

const initialState: AdministartionState = {
    users: [],
    loading: false,
    adminError: undefined
}

const isLoading = (action: UnknownAction) => action.type.endsWith('pending');

const isError = (action: UnknownAction) => action.type.endsWith('rejected');

const administrationSlice = createSlice({
    name: NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.adminError = undefined;
                state.loading = false;
            })
            .addCase(setUserRole.fulfilled, (state, action) => {
                state.users = action.payload;
                state.adminError = undefined;
                state.loading = false;
            })
            .addMatcher(isLoading, (state) => {
                state.loading = true;
                state.adminError = undefined;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.adminError = action.payload;
            })
    }
});

export const administrationReducer = administrationSlice.reducer;