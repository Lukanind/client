import { AccessTokenKey } from "../constants/commonConstants";
import { AddFeatureResponseDto, AddProductResponseDto, UpdateProductResponseDto } from "../types/apiTypes";
import { AxiosInstance } from "./axiosInstance";

export const ProductApi = () => {
    const token = sessionStorage.getItem(AccessTokenKey) ?? '';

    const {axiosPost, axiosPut, axiosDelete} = AxiosInstance(token);

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

return {
    addProduct,
    editProduct,
    deleteProduct,
    addFeature,
    deleteFeature
} 
}


