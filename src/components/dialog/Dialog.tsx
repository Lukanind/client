import { FC } from "react";
import { DialogProps } from "./DialogProps";
import './dialogStyles.scss';
import clsx from 'classnames';
import { Button } from "../button";

export const Dialog: FC<DialogProps> = props => {
const {className, title, children} = props;

    return(
        <div className="dialog">
            <div className={clsx('dialog__paper', className)}>
                <div>
                    {title}
                </div>
                <div>
                    {children}
                </div>
                <div>
                    <Button type="primary" text="Сохранить" />
                    <Button text="Отмена" />
                </div>
            </div>
        </div>
    );
}