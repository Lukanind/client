import {FC} from "react";
import { Layout } from "../../components/layouts";
//import { useNavigate } from 'react-router-dom';
//import { RoutesPaths } from '../../constants/commonConstants';
//import { Button } from "../../components";

export const CategoriesPage: FC = () => {

    //const navigate = useNavigate();

    // const loginHandler = () => {
        
    //     navigate(RoutesPaths.New)
    // }

    return (
        <Layout >
            <div>
                <div>
                    <select></select>
                    <div>
                        Список товаров
                    </div>
                </div>
                <div>
                    <div>
                        <span>Название</span>
                        <div>*</div>
                    </div>
                    <div>
                        <div>Пункт 1</div>
                        <div>Пункт 2</div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}