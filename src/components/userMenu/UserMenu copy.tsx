import { FC, useState } from "react";
import {UserIcon} from "../../assets/icons";
import './userMenuStyles.scss';
import { UserMenuProps } from "./UserMenuProps";

export const UserMenu: FC<UserMenuProps> = props => {
    const {items} = props;

    return (
        <div className="user-menu">
            <UserIcon />
            
                    <div className="user-menu__menu">
                        {items.map(item => (<span key={item.id}>{item.label}</span>)) }
                    </div>
        </div>
    );
}