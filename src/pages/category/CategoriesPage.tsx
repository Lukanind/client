import {FC} from "react";
import { Layout } from "../../components/layouts";
import { useNavigate } from 'react-router-dom';
import { RoutesPaths } from '../../constants/commonConstants';
import { Button } from "../../components";

export const CategoriesPage: FC = () => {

    const navigate = useNavigate();

    const loginHandler = () => {
        
        navigate(RoutesPaths.New)
    }

    return (
        <Layout footer={<>footer</>}>
            <div>CategoriesPage</div>
            <div className='login-page__actions'>
                    <Button text='В новую страницу' onClick={loginHandler} type="primary"/>
                    
                </div>
        </Layout>
    );
}