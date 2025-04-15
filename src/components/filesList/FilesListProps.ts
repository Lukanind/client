import { UserFiles } from "../../types/models";

export interface FilesListProps {
    filesList: Array<UserFiles>;
    onFileDowmload?: (displayName: string, systemName: string) => void;
    onFileDelete?: (systemName: string) => void;
}