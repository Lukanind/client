import {FC} from "react";
import { LayoutProps } from "./LayoutProps";
import './layoutStyles.scss'
import { LogoIcon } from "../../../assets/icons/LogoIcon";
import { UserMenu } from "../../userMenu";
import { useNavigate } from "react-router-dom";
import { RoutesPaths } from "../../../constants/commonConstants";

export const Layout: FC<LayoutProps> = props => {
    const {
        footer, headerChild, title, children
    } = props;

    const navigate = useNavigate();
    
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
                    <UserMenu items={[{
                        id: 'go_to_administration',
                        action: () => {navigate(RoutesPaths.Administration)},
                        label: 'Администрирование'
                    }, {
                        id: 'exit',
                        action: () => {},
                        label: 'Выйти'
                    }]} />
                </div>
            </div>
            <div className="layout__body">
                {children}
            </div>
            <div>{footer}</div>
        </div>
    );
}