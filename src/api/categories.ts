import { AccessTokenKey } from "../constants/commonConstants";
import { addCategoriesResponseDto, editCategoriesResponseDto } from "../types/apiTypes";
import { Category } from "../types/models";
import { AxiosInstance } from "./axiosInstance";

const {axiosPost, axiosGet, axiosPut, axiosDelete} = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');

const getCategories = async() =>
    await axiosGet('/Categories') as Array<Category>;

const addCategories = async(addCategoriesData: addCategoriesResponseDto) =>
    await axiosPost('/Categories/category', addCategoriesData) as number;

const editCategories = async(editCategoriesData: editCategoriesResponseDto) =>
    await axiosPut('/Categories/category', editCategoriesData) as void;

const deleteCategories = async(id: number | string) =>
    await axiosDelete(`/Categories/category?id=${id}`) as void;

export const CategoriesApi = {
    getCategories,
    addCategories,
    editCategories,
    deleteCategories
}