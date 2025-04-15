import { configureStore } from "@reduxjs/toolkit";
import { userReducer, administrationReducer, categoriesReducer } from "./slices";

export const store = configureStore({
    reducer: {
        administration: administrationReducer,
        categories: categoriesReducer,
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;