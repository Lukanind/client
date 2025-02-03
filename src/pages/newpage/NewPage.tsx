import {FC} from "react";
import { Layout, WidgetLayout } from "../../components/layouts";
import { useNavigate } from 'react-router-dom';
import { RoutesPaths } from '../../constants/commonConstants';
import { Button } from "../../components";

export const NewPage: FC = () => {

    const navigate = useNavigate();

    const loginHandler = () => {
        
        navigate(RoutesPaths.Categories)
    }

    return (
        <WidgetLayout>

            <div>
                <h3 className='login-page__title'>Новая страница</h3>
            <div>

            </div>
            
            </div>
            <div className='login-page__actions'>
                    <Button text='Кнопка' onClick={loginHandler} type="primary"/>
                    
                </div>
        </WidgetLayout>
            
        
    );
}