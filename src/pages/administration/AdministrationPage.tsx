import {FC, useEffect, useState} from "react";
import { Layout, WidgetLayout } from "../../components/layouts";
import { useNavigate } from 'react-router-dom';
import { RoutesPaths } from '../../constants/commonConstants';
import { Button } from "../../components";
import { User } from "../../types/models";
import { UsersList } from "../../components/usersList";

const fakeUsersListData: Array<User> = [{
    id: 1,
    login: 'user1',
    password: '1234',
    role: 'user'
},{
    id: 2,
    login: 'user2',
    password: '1234',
    role: 'manager'
}, {
    id: 3,
    login: 'user3',
    password: 'qwerty',
    role: 'manager'
}]

export const AdministrationPage: FC = () => {
    const [users, setUsers] = useState<Array<User>>([]);

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setUsers(fakeUsersListData);
        }, 500);
    }, []);

    const setAdminRoleHandler = (id: number) => {
        setUsers(prev => {
            const cloneArray = [...prev];
            const currentUser = cloneArray.find(u => u.id === id);
            if (currentUser) {
                currentUser.role = 'admin';
            }
            return cloneArray;
        });
    }

    const setManagerRoleHandler = (id: number) => {
        setUsers(prev => {
            const cloneArray = [...prev];
            const currentUser = cloneArray.find(u => u.id === id);
            if (currentUser) {
                currentUser.role = 'manager';
            }
            return cloneArray;
        });
    }

    const resetPermissionHandler = (id: number) => {
        setUsers(prev => {
            const cloneArray = [...prev];
            const currentUser = cloneArray.find(u => u.id === id);
            if (currentUser) {
                currentUser.role = 'user';
            }
            return cloneArray;
        });
    }

    return (
        <Layout title="Администрирование">
            <Button text="На главную"
                onClick={() => navigate(`/${RoutesPaths.Categories}`)}
                className="navigate-btn"
                type="primary" 
            />
            <UsersList onSetAdminRole={setAdminRoleHandler}
            onSetManagerRole={setManagerRoleHandler}
            onResetPermissions={resetPermissionHandler}
            usersList={users} />
        </Layout>
            
        
    );
}