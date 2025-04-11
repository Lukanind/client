import {FC} from "react";
import { LayoutProps } from "./LayoutProps";
import './layoutStyles.scss'
import { LogoIcon } from "../../../assets/icons/LogoIcon";
import { UserMenu } from "../../userMenu";
import { useNavigate } from "react-router-dom";
import { RoutesPaths } from "../../../constants/commonConstants";
import { useAppSelector } from "../../../hooks/reduxToolkitHooks";
import { useDispatch } from "react-redux";
import { logOut } from "../../../store/slices/userSlices";
import { MenuItem } from "../../userMenu/UserMenuProps";

export const Layout: FC<LayoutProps> = props => {
    const {
        footer, headerChild, title, children
    } = props;
    const {role} = useAppSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOutHandler = () => {
        dispatch(logOut());
    }

    const goToAdministartionHandler = () => {
        navigate(`/${RoutesPaths.Administration}`);
    }

    const exitMenuItem: MenuItem = {
        id: 'exit',
        action: logOutHandler,
        label: 'Выйти'
    };

    const administrationMenuItem: MenuItem = {
        id: 'go_to_administration',
        action: goToAdministartionHandler,
        label: 'Администрирование'
    }
    
    return (
        <div className="layout">
            <div className="layout__header">
                <div>
                    <LogoIcon />
                </div>
                <div>
                    <div>{title ?? 'База товаров'}</div>
                    <div>{headerChild}</div>
                </div>
                <div className="layout__user-menu">
                    <UserMenu items={role === 'admin' ? [administrationMenuItem, exitMenuItem] : [exitMenuItem]} />
                </div>
            </div>
            <div className="layout__body">
                {children}
            </div>
            <div>{footer}</div>
        </div>
    );
}