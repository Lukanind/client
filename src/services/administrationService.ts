import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../types/models";
import { AsyncThunkOptions } from "../types/toolkitTypes";
import { AdministrationApi } from "../api";
import { SetRoleResponseDto } from "../types/apiTypes";

const NAMESPACE = 'administartion';

export const getUsers = createAsyncThunk<Array<User>, undefined, AsyncThunkOptions> (
    `${NAMESPACE}/getUsers`,
    async(_, {rejectWithValue}) => {
        try {
            return await AdministrationApi().getUsers();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const setUserRole = createAsyncThunk<Array<User>, SetRoleResponseDto, AsyncThunkOptions>(
    `${NAMESPACE}/setUserRole`,
    async(setRoleData, {rejectWithValue}) => {
        try {
            await AdministrationApi().setUserRole(setRoleData);
            return await AdministrationApi().getUsers();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
)