import {FC, useEffect, useState} from "react";
import { Layout } from "../../components/layouts";
import './categoryPageStyles.scss';
import { Button, Dialog, DropDown, FeaturesList, FilesList, ProductsList, TextField } from "../../components";
import { Category, Product } from "../../types/models";
import { DropDownItem } from "../../components/dropDown/DropDownProps";
import { AddIcon, UploadIcon } from "../../assets/icons";

const fakeProductsData = [
    {id: 1, name: 'Носки', brand: 'Белорусский трикотаж', price: 200, description: 'Описание товара'},
    {id: 2, name: 'Что-то там', brand: 'Бренд', price: 2000,
        features: [{
            id: 1,
            feature: 'GPS',
            description: 'Есть'
        },{
            id: 2,
            feature: 'Порты',
            description: 'USB-C, USB-A'
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

    const [showFeatureDialog, setShowFeatureDialog] = useState(false);

    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [feature, setFeature] = useState('');
    const [featureDescription, setFeatureDescription] = useState('');

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

            setName(product?.name ?? '');
            setBrand(product?.brand ?? '');
            setPrice(String(product?.price) ?? '');
            setDescription(product?.description ?? '');
        }
        //setProductsData(fakeProductsData);
    }, [productsData, prodActionMode, prodToEdit, showProductDialog]);

    const clearProductDialogFields = () => {
        setName('');
        setBrand('');
        setPrice('');
        setDescription('');
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

    const getInfo = () => {
        if(!selectedProduct) {
            return '';
        }
        return `${selectedProduct.name}`.trim();
    }

    const productDialogContentRenderer = () => {
        return (
            <>
                <TextField labelText="Название" value={name} onChange={(val) => setName(val)}/>
                <TextField labelText="Бренд" value={brand} onChange={(val) => setBrand(val)}/>
                <TextField labelText="Цена" value={String(price)} onChange={(val) => setPrice(val)}/>
                <TextField labelText="Описание" value={description} onChange={(val) => setDescription(val)}/>
            </>
        )
    }

    const closeProductDialogHandler = () =>{
        setShowProductDialog(false);
        clearProductDialogFields();
    }

    const featureDialogContentRenderer = () => {
        return (
            <>
                <TextField labelText="Особенность товара (название пункта)" value={feature} onChange={(val) => setFeature(val)}/>
                <TextField labelText="Описание" value={featureDescription} onChange={(val) => setFeatureDescription(val)}/>
            </>
        )
    }

    const clearFeatureDialogFields = () => {
        setFeature('');
        setFeatureDescription('');
    }

    const createFeatureHandler = () => {
        setShowFeatureDialog(true);
    }

    const closeFeatureDialogHandler = () =>{
        setShowFeatureDialog(false);
        clearFeatureDialogFields();
    }

    const categoryChangedHandler = (id?: string) => {
        const _id: number | undefined = !id ? undefined : +id;
        setSelectedCategoryId(_id);
    }

    const uploadFileHandler = () => {
        
    }

    const downloadFileHandler = (id: number) => {
        
    }

    const deleteFileHandler = (id: number) => {
        
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
            <Dialog title="Добавить особенность товару"
                    open={showFeatureDialog}
                    onSave={() => {}}
                    onCancel={closeFeatureDialogHandler}
            >
                {featureDialogContentRenderer()}
            </Dialog>
            <div className="cat-page">
                <div className="cat-page__products-list-container">
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
                    <Button className="cat-page__add-product-btn" text="Добавить товар" onClick={createProductHandler}/>
                </div>
                <div className="cat-page__product-info-container">
                    <div className="cat-page__product-info-header">
                        <div className="cat-page__product-info-user">
                            <div className="cat-page__product-info-fullname">
                                {getInfo()}
                            </div>
                            <div className="cat-page__product-info-data">
                                <div>
                                    <strong>Цена: </strong>
                                    <span>{selectedProduct?.price ?? ' -'}{' ₽'}</span>
                                </div>
                                <div>
                                    <strong>Бренд: </strong>
                                    <span>{selectedProduct?.brand ?? '-'}</span>
                                </div>
                            </div>
                        </div>
                       
                        <div className="cat-page__product-info-actions">
                            <UploadIcon onClick={uploadFileHandler}/>
                        </div>
                    </div>
                    <div className='cat-page__product-add-info'>
                        <div className='cat-page__product-add-info-files'>
                            <span className="cat-page__label">Прикрепленные файлы</span>
                            <FilesList 
                            onFileDowmload={downloadFileHandler}
                            onFileDelete={deleteFileHandler}
                            filesList={[
                                {
                                    id: 1,
                                    systemName: 'qwerty',
                                    displayName: 'my_file.txt'
                                }
                            ]} 
                            />
                        </div>
                        <div className='cat-page__product-add-info-data'>
                            <div className='cat-page__product-add-info-data_cell'>
                                <span className="cat-page__label">Описание: </span>
                                <span>{selectedProduct?.description ?? '-'}</span>
                            </div>
                            <div className='cat-page__product-add-info-data_cell'>
                                <div className="cat-page__list-title">
                                    <span className="cat-page__label">
                                        Особенности товара
                                    </span>
                                    <AddIcon height={20} width={20} onClick={createFeatureHandler}/>
                                </div>
                                
                                <FeaturesList 
                                    featuresList={selectedProduct?.features ?? []} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}