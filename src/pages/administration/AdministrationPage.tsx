import {FC, useEffect, useState} from "react";
import { Layout, WidgetLayout } from "../../components/layouts";
import { useNavigate } from 'react-router-dom';
import { RoutesPaths } from '../../constants/commonConstants';
import { Button } from "../../components";
import { User } from "../../types/models";
import { UsersList } from "../../components/usersList";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxToolkitHooks";
import { getUsers, setUserRole } from "../../services";

export const AdministrationPage: FC = () => {
    const {users} = useAppSelector((state) => state.administration);
    const {accessToken, role} = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if(accessToken) {
            if(role === 'user' || role === 'manager' || !role) {
                navigate(`${RoutesPaths.NoPermissions}`);
            } else {
                dispatch(getUsers());
            }
        } else {
            navigate(`${RoutesPaths.Login}`)
        }
    }, [accessToken, role, navigate, dispatch]);

    const setAdminRoleHandler = (id: number) => {
        dispatch(setUserRole({userId: id, role: 'admin'}));
    }

    const setManagerRoleHandler = (id: number) => {
        dispatch(setUserRole({userId: id, role: 'manager'}));
    }

    const resetPermissionHandler = (id: number) => {
        dispatch(setUserRole({userId: id, role: 'user'}));
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