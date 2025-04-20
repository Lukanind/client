import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "../types/models";
import { AsyncThunkOptions } from "../types/toolkitTypes";
import { Categories, FilesApi } from "../api";
import { addCategoriesResponseDto, AddFeatureResponseDto, AddProductResponseDto, editCategoriesResponseDto, GenerateDescriptionResponseDto, UpdateProductResponseDto, UploadFileResponseDto } from "../types/apiTypes";
import { ProductApi } from "../api/products";

const NAMESPACE = 'categories';

export const getCategories = createAsyncThunk<Array<Category>, undefined, AsyncThunkOptions>(
    `${NAMESPACE}/getCategories`,
    async(_, {rejectWithValue}) => {
        try {
            return await Categories().getCategories();
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const addCategories = createAsyncThunk<Array<Category>, addCategoriesResponseDto, AsyncThunkOptions>(
    `${NAMESPACE}/addCategory`,
    async(addCategoriesData, {rejectWithValue}) => {
        try {
            await Categories().addCategories(addCategoriesData);
            return await Categories().getCategories();
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const editCategories = createAsyncThunk<Array<Category>, editCategoriesResponseDto, AsyncThunkOptions>(
    `${NAMESPACE}/editCategory`,
    async(editCategoriesData, {rejectWithValue}) => {
        try {
            await Categories().editCategories(editCategoriesData);
            return await Categories().getCategories();
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const deleteCategories = createAsyncThunk<Array<Category>, string | number, AsyncThunkOptions>(
    `${NAMESPACE}/deleteCategory`,
    async(id, {rejectWithValue}) => {
        try {
            await Categories().deleteCategories(id);
            return await Categories().getCategories();
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const addProduct = createAsyncThunk<Array<Category>, AddProductResponseDto, AsyncThunkOptions>(
    `${NAMESPACE}/addProduct`,
    async(addProductData, {rejectWithValue}) => {
        try {
            await ProductApi().addProduct(addProductData);
            return await Categories().getCategories();
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const editProduct = createAsyncThunk<Array<Category>, UpdateProductResponseDto, AsyncThunkOptions>(
    `${NAMESPACE}/editProduct`,
    async(editCategoriesData, {rejectWithValue}) => {
        try {
            await ProductApi().editProduct(editCategoriesData);
            return await Categories().getCategories();
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const deleteProduct = createAsyncThunk<Array<Category>, string | number, AsyncThunkOptions>(
    `${NAMESPACE}/deleteProduct`,
    async(id, {rejectWithValue}) => {
        try {
            await ProductApi().deleteProduct(id);
            return await Categories().getCategories();
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const addFeature = createAsyncThunk<Array<Category>, AddFeatureResponseDto, AsyncThunkOptions>(
    `${NAMESPACE}/addFeature`,
    async(addFeatureData, {rejectWithValue}) => {
        try {
            await ProductApi().addFeature(addFeatureData);
            return await Categories().getCategories();
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const deleteFeature = createAsyncThunk<Array<Category>, string | number, AsyncThunkOptions>(
    `${NAMESPACE}/deleteFeature`,
    async(id, {rejectWithValue}) => {
        try {
            await ProductApi().deleteFeature(id);
            return await Categories().getCategories();
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const uploadFile = createAsyncThunk<Array<Category>, UploadFileResponseDto, AsyncThunkOptions>(
    `${NAMESPACE}/uploadFile`,
    async(uploadFileData, {rejectWithValue}) => {
        try {
            await FilesApi().uploadFile(uploadFileData);
            return await Categories().getCategories();
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const deleteFile = createAsyncThunk<Array<Category>, string | number, AsyncThunkOptions>(
    `${NAMESPACE}/deleteFile`,
    async(systemName, {rejectWithValue}) => {
        try {
            await FilesApi().deleteFile(systemName);
            return await Categories().getCategories();
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const generateDescription = createAsyncThunk<string, GenerateDescriptionResponseDto, AsyncThunkOptions>(
    `${NAMESPACE}/generateDescription`,
    async(prompt, {rejectWithValue}) => {
        try {
            return await ProductApi().generateDescription(prompt);
        } catch(error) {
            return rejectWithValue((error as Error).message);
        }
    }
);