import {FC, useEffect, useState} from "react";
import { Layout } from "../../components/layouts";
import './categoryPageStyles.scss';
import { Button, Dialog, DropDown, ProductsList, TextField } from "../../components";
import { Product } from "../../types/models";

const fakeProductsData = [
    {id: 1, name: 'Носки', brand: 'Белорусский трикотаж', price: 200},
    {id: 2, name: 'Что-то там', brand: 'Бренд', price: 2000},
    {id: 3, name: 'Очки', price: 666}
];

export const CategoriesPage: FC = () => {
    const [productsData, setProductsData] = useState<Array<Product>>([]);
    const [showProductDialog, setShowProductDialog] = useState(false);
    const [prodActionMode, setUserActionMode] = useState<'create' | 'edit'>('create');
    const [prodToEdit, setProdToEdit] = useState(0);

    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        setProductsData(fakeProductsData);
    }, []);

    useEffect(() => {
        clearProductDialogFields();
        if(prodActionMode === 'edit') {
            const product = prodActionMode === 'edit'
            ? productsData.find(p => p.id === prodToEdit)
            : undefined;

            setName(product?.name ?? '');
            setBrand(product?.brand ?? '');
            setPrice(String(product?.price) ?? '');
        }
        setProductsData(fakeProductsData);
    }, []);

    const clearProductDialogFields = () => {
        setName('');
        setBrand('');
        setPrice('');
    }

    const createProductHandler = () => {
        setUserActionMode('create');
        setShowProductDialog(true);
    }

    const editProductHandler = (id: number) => {
        setUserActionMode('edit');
        setProdToEdit(id)
        setShowProductDialog(true);
    }

    const productDialogContentRenderer = () => {
        return (
            <>
                <TextField labelText="Название" value={name} onChange={(val) => setName(val)}/>
                <TextField labelText="Бренд" value={brand} onChange={(val) => setBrand(val)}/>
                <TextField labelText="Цена" value={String(price)} onChange={(val) => setPrice(val)}/>
            </>
        )
    }

    const closeProductDialogHandler = () =>{
        setShowProductDialog(false);
        clearProductDialogFields();
    }

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
                    <ProductsList productsList={productsData}
                        onItemClick={(id) => console.log('select', id)}
                        onItemDelete={(id) => console.log('delete ', id)}
                        onItemEdit={editProductHandler}
                    />
                    <Button className="cat-page__add-user-btn" text="Добавить товар" onClick={createProductHandler}/>
                </div>
                <div>
                    <Dialog title={prodActionMode !== 'edit' ? 'Добавить товар' : 'Изменить товар'}
                        open={showProductDialog}
                        onSave={() => {}}
                        onCancel={() => closeProductDialogHandler()}
                    >
                        {productDialogContentRenderer()}
                    </Dialog>

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