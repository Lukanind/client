import { AccessTokenKey } from "../constants/commonConstants";
import { DownloadFileResponseDto,UploadFileResponseDto } from "../types/apiTypes";
import { AxiosInstance } from "./axiosInstance";

export const FilesApi = () => {
    const {axiosBlob, axiosPost, axiosDelete} = AxiosInstance(sessionStorage.getItem(AccessTokenKey) ?? '');

    const uploadFile = async(uploadFileData: UploadFileResponseDto) =>
        await axiosPost('/Files/upload', uploadFileData) as void;

    const downloadFile = async(downloadFileData: DownloadFileResponseDto) =>
        await axiosBlob('/Files/download', downloadFileData);

    const deleteFile = async(systemName: number | string) =>
        await axiosDelete(`/Files/delete?systemName=${systemName}`) as void;

    return {
        uploadFile,
        downloadFile,
        deleteFile
    }
}

