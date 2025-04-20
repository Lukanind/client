import { FC, useState } from "react";
import { UsersListProps } from "./UsersListProps";
import './usersListStyles.scss'
import { PencilIcon, TrashIcon } from "../../assets/icons";
import { Button } from "../button";

export const UsersList: FC<UsersListProps> = props => {
    const {
        usersList,
        onSetAdminRole,
        onSetManagerRole,
        onResetPermissions
    } = props;

    return (
        <div className="users-list">
            {usersList.map(user => {
                return (
                    <div key={user.id} 
                        className="users-list__item"
                    >
                        <div className="users-list__item-fio">
                            <span>
                                <strong>Логин: </strong>
                                <span>{user.login}</span>
                            </span>
                            <span>
                                <strong>Пароль: </strong>
                                <span>{user.password}</span>
                            </span>
                            <span>
                                <strong>Роль: </strong>
                                <span>{user.role}</span>
                            </span>
                        </div>
                        <div className="users-list__item-actions">
                            <Button text="Сделать администратором"
                                type="primary"
                                onClick={() => onSetAdminRole(user.id)} 
                            />
                            <Button text="Сделать менеджером"
                                type="primary"
                                onClick={() => onSetManagerRole(user.id)} 
                            />
                            <Button text="Отобрать права"
                                type="secondary"
                                onClick={() => onResetPermissions(user.id)} 
                            />
                        </div>   
                    </div>
                );
            })}
        </div>
    );
}