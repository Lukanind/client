import {FC} from "react";
import { Layout } from "../../components/layouts";
//import { useNavigate } from 'react-router-dom';
//import { RoutesPaths } from '../../constants/commonConstants';
//import { Button } from "../../components";
import './categoryPageStyles.scss';
import { DropDown } from "../../components";

export const CategoriesPage: FC = () => {

    //const navigate = useNavigate();

    // const loginHandler = () => {
        
    //     navigate(RoutesPaths.New)
    // }

    return (
        <Layout >
            <div className="cat-page">
                <div className="cat-page__users-list-container">
                    <DropDown items={[{
                        text: 'Товар 1', value: '1'
                    },{
                        text: 'Товар 2', value: '2'
                    },{
                        text: 'Товар 3', value: '3'
                    }]} label="Категории:" />
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