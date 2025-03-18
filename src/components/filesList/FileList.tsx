import { FC} from "react";
import './FilesListStyles.scss'
import { DownloadIcon, TrashIcon } from "../../assets/icons";
import { FilesListProps } from "./FilesListProps";

export const FileList: FC<FilesListProps> = props => {
    const {
        filesList, 
        onFileDowmload,
        onFileDelete
    } = props;

    const downloadHandler = (id: number) => {
        onFileDowmload && onFileDowmload(id);
    }

    const deleteHandler = (id: number) => {
        onFileDelete && onFileDelete(id);
    }

    return (
        <div>
            {filesList.map(file => {
                return (
                <div key={file.id}>
                    <div>
                        {file.displayName}
                    </div>
                    <div >
                        <DownloadIcon width={18} height={18} onClick={() => {downloadHandler(file.id)}}/>
                        <TrashIcon width={18} height={18} onClick={() => {deleteHandler(file.id)}}/>
                    </div>   
                </div>)
            })}
        </div>
    );
}