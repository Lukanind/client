import { FC} from "react";
import './FilesListStyles.scss'
import { DownloadIcon, TrashIcon } from "../../assets/icons";
import { FilesListProps } from "./FilesListProps";

export const FilesList: FC<FilesListProps> = props => {
    const {
        filesList, 
        onFileDowmload,
        onFileDelete
    } = props;

    const downloadHandler = (displayName: string, systemName: string) => {
        onFileDowmload && onFileDowmload(displayName, systemName);
    }

    const deleteHandler = (systemName: string) => {
        onFileDelete && onFileDelete(systemName);
    }

    return (
        <div className="files-list">
            {filesList.map(file => {
                return (
                <div key={file.id} className="files-list__item">
                    <div>
                        {file.displayName}
                    </div>
                    <div className="files-list__item-actions">
                        <DownloadIcon width={16} height={16} onClick={() => {downloadHandler(file.displayName, file.systemName)}}/>
                        <TrashIcon width={16} height={16} onClick={() => {deleteHandler(file.systemName)}}/>
                    </div>   
                </div>)
            })}
        </div>
    );
}