import {FC, useEffect, useState} from "react";
import { Layout } from "../../components/layouts";
import './categoryPageStyles.scss';
import { Button, Dialog, DropDown, FeaturesList, FilesList, ProductsList, TextField } from "../../components";
import { Category, Product } from "../../types/models";
import { DropDownItem } from "../../components/dropDown/DropDownProps";
import { AddIcon, PencilIcon, TrashIcon, UploadIcon } from "../../assets/icons";
import { Categories } from "../../api";
import { useAppSelector } from "../../hooks/reduxToolkitHooks";
import { useNavigate } from "react-router-dom";
import { RoutesPaths } from "../../constants/commonConstants";

export const CategoriesPage: FC = () => {
const { role, accessToken} = useAppSelector((state) => state.user);

    const {getCategories, deleteCategories} = Categories;

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

    const navigate = useNavigate();

    useEffect(() => {
        if(accessToken) {
            if(role === 'user' || !role) {
                navigate(`/${RoutesPaths.NoPermissions}`);
            } else {
                navigate(`/${RoutesPaths.Login}`);
            }
        }
    }, [accessToken, role, navigate]);

    useEffect(() => {
        getCategories().then(respData => {
            setCategoriesData(respData);
            if(respData.length) {
                setSelectedCategoryId(respData[0].id);
            }
        }).catch(err => {
            setCategoriesData([]);
            console.log(err);
        })
    }, [getCategories]);

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

    const deleteCategoriesHandler = () => {
        if(!window.confirm('Вы действительно хотите удалить данную категорию?')) {
            return;
        }
        if(!selectedCategoryId) {
            return;
        }
        deleteCategories(selectedCategoryId).then(() => {
            setCategoriesData(prev => {
                const filtered = prev.filter(c => c.id !== selectedCategoryId);
                return [...filtered];
            });
        }).catch(err => {
            console.log(err);
        });
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
                    <div>
                        <DropDown 
                            items={categoriesData.map(cc => {
                                return {
                                    text: cc.name,
                                    value: cc.id.toString()
                                } as DropDownItem
                            })} 
                            label="Категории:" 
                            selectedChanged={(val) => categoryChangedHandler(val)}
                        />
                        {role === 'admin' && (<>
                            <AddIcon width={16} height={16} className="cat-page__add-btn" />
                            <PencilIcon />
                            <TrashIcon onClick={deleteCategoriesHandler} />
                            </>
                        )}
                    </div>
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
                            filesList={selectedProduct?.userFiles ?? []} 
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