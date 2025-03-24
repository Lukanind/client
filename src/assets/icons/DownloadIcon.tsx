import {FC} from 'react';
import {IconProps} from '../../types/commonTypes';

export const DownloadIcon: FC<IconProps> = props => {
    const {
        className,
        color = '#313131',
        height = 24,
        width = 24,
        onClick
    } = props;

    return (
        <svg fill='none' width={width} height={height} 
        onClick={onClick}
        className={className}
        viewBox="0 0 24 24" id="download-3" 
        data-name="Flat Line" 
        xmlns="http://www.w3.org/2000/svg">
        <polyline 
            id="primary" points="15 18 12 21 9 18" 
            stroke={color} stroke-width="2" stroke-linecap="round"></polyline>
        <line id="primary-2" data-name="primary" x1="12" y1="21" x2="12" y2="7" 
            stroke={color} stroke-width="2" stroke-linecap="round"></line>
        <path id="primary-3" data-name="primary" d="M8,14H5a1,1,0,0,1-1-1V4A1,1,0,0,1,5,3H19a1,1,0,0,1,1,1v9a1,1,0,0,1-1,1H16" 
            stroke={color} stroke-width="2" stroke-linecap="round"></path></svg>
    );
}