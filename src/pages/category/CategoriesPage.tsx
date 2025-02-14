import {FC} from "react";
import { Layout } from "../../components/layouts";
import './categoryPageStyles.scss';
import { Button, DropDown, ProductsList } from "../../components";

export const CategoriesPage: FC = () => {

    return (
        <Layout >
            <div className="cat-page">
                <div className="cat-page__users-list-container">
                    <DropDown items={[{
                            text: 'Категория 1', value: '1'
                        },{
                            text: 'Категория 2', value: '2'
                        },{
                            text: 'Категория 3', value: '3'
                        }]} 
                        label="Категории:" 
                        selectedChanged={(val) => console.log(val)}
                    />
                    <ProductsList productsList={[
                        {id: 1, name: 'Носки', brand: 'Белорусский трикотаж', price: 200},
                        {id: 2, name: 'Что-то там', brand: 'Бренд', price: 2000},
                        {id: 3, name: 'Очки', price: 666}
                    ]}
                    onItemClick={(id) => console.log(id)}
                    />
                    <Button className="cat-page__add-user-btn" text="Добавить товар" />
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