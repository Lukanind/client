import {FC} from 'react';
import { ButtonProps } from './ButtonProps';
import './buttonStyles.scss'
import clsx from 'classnames';

export const Button: FC<ButtonProps> = props => {
    const {
        onClick,
        text,
        type
    } = props;

    return (
        <div className={clsx('button', {
            'button__primary': type === 'primary',
            'button__secondary': type === 'secondary',
        })} onClick={onClick}>
            {text}
        </div>
    );
}

