import { AccessTokenKey } from "../constants/commonConstants";
import { DownloadFileResponseDto,UploadFileResponseDto } from "../types/apiTypes";
import { AxiosInstance } from "./axiosInstance";

const {axiosPost, axiosDelete} = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');

const uploadFile = async(uploadFileData: UploadFileResponseDto) =>
    await axiosPost('/Files/upload', uploadFileData) as void;

const downloadFile = async(downloadFileData: DownloadFileResponseDto) =>
    await axiosPost('/Files/download', downloadFileData) as Blob;

const deleteFile = async(id: number | string) =>
    await axiosDelete(`/Files/delete?id=${id}`) as void;

export const CategoriesApi = {
    uploadFile,
    downloadFile,
    deleteFile
}