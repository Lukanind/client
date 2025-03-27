import { AccessTokenKey } from "../constants/commonConstants";
import { AddFeatureResponseDto, AddProductResponseDto, UpdateProductResponseDto } from "../types/apiTypes";
import { AxiosInstance } from "./axiosInstance";

const {axiosPost, axiosPut, axiosDelete} = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');

const addProduct = async(addProductData: AddProductResponseDto) =>
    await axiosPost('/Product/product', addProductData) as number;

const editProduct = async(editProductData: UpdateProductResponseDto) =>
    await axiosPut('/Product/product', editProductData) as void;

const deleteProduct = async(id: number | string) =>
    await axiosDelete(`/Product/product?id=${id}`) as void;

const addFeature = async(addFeatureData: AddFeatureResponseDto) =>
    await axiosPost('/Product/feature', addFeatureData) as number;

const deleteFeature = async(id: number | string) =>
    await axiosDelete(`/Product/feature?id=${id}`) as void;

export const ProductApi = {
    addProduct,
    editProduct,
    deleteProduct,
    addFeature,
    deleteFeature
} 
