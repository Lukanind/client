import { createSlice, PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { Category } from "../../types/models";
import { addCategories, addFeature, addProduct, deleteCategories, deleteFeature, deleteFile, deleteProduct, editCategories, editProduct, getCategories, uploadFile } from "../../services";

const NAME = 'categories';

interface CategoriesState {
    categories: Array<Category>;
    loading: boolean;
    categoriesError?: string | null;
}

const initialState: CategoriesState = {
    categories: [],
    loading: false,
    categoriesError: undefined
}

const isLoading = (action: UnknownAction) => action.type.endsWith('pending');

const isError = (action: UnknownAction) => action.type.endsWith('rejected');

const setState = (state: any, action: any) => {
    state.categories = action.payload;
    state.categoriesError = undefined;
    state.loading = false;
}

const categoriesSlice = createSlice({
    name: NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(addCategories.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(editCategories.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(deleteCategories.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(addFeature.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(deleteFeature.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addCase(deleteFile.fulfilled, (state, action) => {
                setState(state, action);
            })
            .addMatcher(isLoading, (state) => {
                state.loading = true;
                state.categoriesError = undefined;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.categoriesError = action.payload;
            })
    }
});

export const categoriesReducer = categoriesSlice.reducer;