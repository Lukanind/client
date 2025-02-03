import {FC} from 'react';

interface IconProps {
    width?: number | string;
    height?: number | string;
    color?: string;
    className?: string;
    onClick?: () => void;
}

export const LogoIcon: FC<IconProps> = props => {
    const {
        className,
        color = '#ffffff',
        height = 28,
        width = 28,
        onClick
    } = props;

    return (
        <svg width={width} height={height}
        className={className}
        onClick={onClick}
        viewBox="0 0 24 24" 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink">

    <g id="Page-1" stroke="none" stroke-width="1" fill={color} fill-rule="evenodd">
        <g id="Bullet-List">
       
            <line x1="10" y1="7" x2="19" y2="7" id="Path" stroke={color} stroke-width="2" stroke-linecap="round"></line>
            <line x1="5" y1="7" x2="5.1" y2="7" id="Path" stroke={color} stroke-width="2" stroke-linecap="round"></line>
            <line x1="10" y1="17" x2="19" y2="17" id="Path" stroke={color} stroke-width="2" stroke-linecap="round"></line>
            <line x1="5" y1="17" x2="5.1" y2="17" id="Path" stroke={color} stroke-width="2" stroke-linecap="round"></line>
            <line x1="10" y1="12" x2="19" y2="12" id="Path" stroke={color} stroke-width="2" stroke-linecap="round"></line>
            <line x1="5" y1="12" x2="5.1" y2="12" id="Path" stroke={color} stroke-width="2" stroke-linecap="round"></line>
        </g>
    </g>
        </svg>
    );
}