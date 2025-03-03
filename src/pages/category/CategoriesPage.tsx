import {FC, useEffect, useState} from "react";
import { Layout } from "../../components/layouts";
import './categoryPageStyles.scss';
import { Button, Dialog, DropDown, ProductsList, TextField } from "../../components";
import { Category, Product } from "../../types/models";
import { DropDownItem } from "../../components/dropDown/DropDownProps";

const fakeProductsData = [
    {id: 1, name: 'Носки', brand: 'Белорусский трикотаж', price: 200},
    {id: 2, name: 'Что-то там', brand: 'Бренд', price: 2000,
        description: {
            id: 1,
            made_in: 'Китай',
            descritption: 'Описание товара'
        },
        features: [{
            id: 1,
            feature: 'GPS'
        },{
            id: 2,
            feature: 'USB-C'
        }]
    },
    {id: 3, name: 'Очки', price: 666}
];

const fakeCategoriesData = [
    {id: 1, name: 'Категория 1', products: []},
    {id: 2, name: 'Категория 2', products: fakeProductsData},
    {id: 3, name: 'Категория 3', products: []}
];
export const CategoriesPage: FC = () => {
    const [categoriesData, setCategoriesData] = useState<Array<Category>>([]);
    const [productsData, setProductsData] = useState<Array<Product>>([]);

    const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
    const [selectedProduct, setSelectedProduct] = useState<Product>();

    const [showProductDialog, setShowProductDialog] = useState(false);
    const [prodActionMode, setProdActionMode] = useState<'create' | 'edit'>('create');
    const [prodToEdit, setProdToEdit] = useState(0);

    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setCategoriesData(fakeCategoriesData);
            if(Array.isArray(fakeCategoriesData) && fakeCategoriesData.length) {
                setProductsData(fakeCategoriesData[0].products);
            }
        }, 2000);
    }, []);

    useEffect(() => {
        const selectedCategory = categoriesData.find(c => c.id === selectedCategoryId);
        setProductsData(selectedCategory ? selectedCategory.products : []);
        setSelectedProduct(undefined);
    }, [categoriesData, selectedCategoryId]);

    useEffect(() => {
        console.log('useEffect work');
        clearProductDialogFields();
        if(prodActionMode === 'edit') {
            const product = prodActionMode === 'edit'
            ? productsData.find(p => p.id === prodToEdit)
            : undefined;

            setName(product?.name ?? 'Nothing');
            setBrand(product?.brand ?? 'Nothing');
            setPrice(String(product?.price) ?? 'Nothing');
        }
        setProductsData(fakeProductsData);
    }, [productsData, prodActionMode, prodToEdit, showProductDialog]);

    const clearProductDialogFields = () => {
        setName('');
        setBrand('');
        setPrice('');
    }

    const createProductHandler = () => {
        setProdActionMode('create');
        setShowProductDialog(true);
    }

    const editProductHandler = (id: number) => {
        setProdActionMode('edit');
        setProdToEdit(id)
        setShowProductDialog(true);
    }

    const onProductSelectedHandler = (id: number) => {
        const product = productsData.find(p => p.id === id);
        setSelectedProduct(product);
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

    const categoryChangedHandler = (id?: string) => {
        const _id: number | undefined = !id ? undefined : +id;
        setSelectedCategoryId(_id);
    }

    return (
        <Layout >
            <Dialog title={prodActionMode !== 'edit' ? 'Добавить товар' : 'Изменить товар'}
                open={showProductDialog}
                onSave={() => {}}
                onCancel={closeProductDialogHandler}
            >
                {productDialogContentRenderer()}
            </Dialog>
            <div className="cat-page">
                <div className="cat-page__users-list-container">
                    <DropDown items={categoriesData.map(cc => {
                        return {
                            text: cc.name,
                            value: cc.id.toString()
                        } as DropDownItem
                    })} 
                        label="Категории:" 
                        selectedChanged={(val) => categoryChangedHandler(val)}
                    />
                    <ProductsList productsList={productsData}
                        onItemClick={(id) => onProductSelectedHandler(id)}
                        onItemDelete={(id) => console.log('delete ', id)}
                        onItemEdit={editProductHandler}
                    />
                    <Button className="cat-page__add-user-btn" text="Добавить товар" onClick={createProductHandler}/>
                </div>
                <div>
                    <div>
                        <div>
                            <span>Название</span>
                            <div>*</div>
                        </div>
                        <div>
                            actions
                        </div>
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