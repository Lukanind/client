import { UserFiles } from "../../types/models";

export interface FilesListProps {
    filesList: Array<UserFiles>;
    onFileDowmload?: (id: number) => void;
    onFileDelete?: (id: number) => void;
}