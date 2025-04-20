import {FC, useEffect, useRef, useState} from "react";
import { Layout } from "../../components/layouts";
import './categoryPageStyles.scss';
import { Button, Dialog, DropDown, FeaturesList, FilesList, ProductsList, TextField } from "../../components";
import { Category, Product } from "../../types/models";
import { DropDownItem } from "../../components/dropDown/DropDownProps";
import { AddIcon, BrainIcon, LoadingIcon, PencilIcon, TrashIcon, UploadIcon } from "../../assets/icons";
//import { Categories } from "../../api";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxToolkitHooks";
import { useNavigate } from "react-router-dom";
import { RoutesPaths } from "../../constants/commonConstants";
import { addCategories, addFeature, addProduct, deleteCategories, deleteFeature, deleteFile, deleteProduct, editCategories, editProduct, generateDescription, getCategories, uploadFile } from "../../services";
import { FilesApi } from "../../api";

export const CategoriesPage: FC = () => {
    const { role, accessToken} = useAppSelector((state) => state.user);
    const {categories} = useAppSelector((state) => state.categories)
    const dispatch = useAppDispatch();

    //const {getCategories, deleteCategories} = Categories;

    const [categoriesData, setCategoriesData] = useState<Array<Category>>([]);
    const [productsData, setProductsData] = useState<Array<Product>>([]);

    const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
    const [selectedProduct, setSelectedProduct] = useState<Product>();

    const [showProductDialog, setShowProductDialog] = useState(false);
    const [prodActionMode, setProdActionMode] = useState<'create' | 'edit'>('create');
    const [prodToEdit, setProdToEdit] = useState(0);

    const [showCategoryDialog, setShowCategoryDialog] = useState(false);
    const [categoryActionMode, setCategoryActionMode] = useState<'create' | 'edit'>('create');

    const [showFeatureDialog, setShowFeatureDialog] = useState(false);

    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [feature, setFeature] = useState('');
    const [featureDescription, setFeatureDescription] = useState('');

    const [categoryName, setCategoryName] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(accessToken) {
            if(role === 'user' || !role) {
                navigate(`/${RoutesPaths.NoPermissions}`);
            } else {
                dispatch(getCategories());
            }
        } else {
            navigate(`${RoutesPaths.Login}`);
        }
    }, [accessToken, role, navigate]);

    // useEffect(() => {
    //     getCategories().then(respData => {
    //         setCategoriesData(respData);
    //         if(respData.length) {
    //             setSelectedCategoryId(respData[0].id);
    //         }
    //     }).catch(err => {
    //         setCategoriesData([]);
    //         console.log(err);
    //     })
    // }, [getCategories]);

    useEffect(() => {
        const selectedCategory = selectedCategoryId
            ? categories.find(c => c.id === selectedCategoryId)
            : categories[0];
        setSelectedCategoryId(selectedCategory?.id);

        if (categoryActionMode === 'edit') {
            setCategoryName(selectedCategory?.name || '');
        }
        
        setProductsData(selectedCategory ? selectedCategory.products : []);
        // if (selectedCategory) {
        //     setSelectedProduct(selectedCategory.products[0]);
        // } else 
        setSelectedProduct(undefined);
    }, [categories, selectedCategoryId, showCategoryDialog]);

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

    // useEffect(() => {
    //     console.log('category field useEffect');
    //     setCategoryName('');
    //     if (categoryActionMode === 'edit') {
    //         if (!(selectedCategoryId === undefined || selectedCategoryId === null)){
    //             const category = categoryActionMode === 'edit'
    //             ? categoriesData.find(c => c.id === selectedCategoryId)
    //             : undefined;

    //             setCategoryName(category?.name ?? '');
    //         }
    //     }
    // }, [showCategoryDialog, categoryActionMode])

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

    const deleteProductHandler = (id: number) => {
        setProdToEdit(id);
        if(window.confirm('Вы действительно хотите удалить данного пользователя?')) {
            dispatch(deleteProduct(id));
        }
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

    const closeProductDialogHandler = () =>{
        setShowProductDialog(false);
        clearProductDialogFields();
    }

    const saveProductDialogHandler = () => {
        console.log('Save handler called');
        if (selectedCategoryId === undefined || selectedCategoryId === null) {
            console.log('2. No category selected');
            return;
        }
        const savingProduct = {
            categoryId: selectedCategoryId,
            name: name,
            brand: brand,
            price: Number(price),
            description: description
        };
        if (prodActionMode === 'create') {
            console.log('3. Dispatching action');
            dispatch(addProduct(savingProduct));
        }
        if (prodActionMode === 'edit' && selectedProduct) {
            dispatch(editProduct({
                ...savingProduct,
                id: selectedProduct.id,
                features: selectedProduct.features,
                userFiles: selectedProduct.userFiles
            }))
        }
        closeProductDialogHandler();
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

    const createCategoryHandler = () => {
        setCategoryActionMode('create');
        setShowCategoryDialog(true);
    }

    const editCategoryHandler = () => {
        setCategoryActionMode('edit');
        setShowCategoryDialog(true);
    }

    const closeCategoryDialogHandler = () => {
        setShowCategoryDialog(false);
        setCategoryName('');
        setCategoryActionMode('create');
    }

    const saveCategoryHandler = () => {
        if (categoryActionMode === 'create') {
            dispatch(addCategories({name: categoryName}))
            closeCategoryDialogHandler();
            return;
        }
        if (selectedCategoryId === undefined || selectedCategoryId === null) {
            closeCategoryDialogHandler();
            return;
        }
        if (categoryActionMode === 'edit') {
            dispatch(editCategories({
                id: selectedCategoryId,
                name: categoryName
            }));
        }
        closeCategoryDialogHandler();
    }

    const deleteCategoryHandler = () => {
        if (selectedCategoryId && window.confirm('Вы действительно хотите удалить данный отдел?')) {
            dispatch(deleteCategories(selectedCategoryId));
            setSelectedCategoryId(undefined);
        }
    }

    const fileToBase64 = (file: any, callback: (base64string: string) => void) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader?.result && typeof reader.result === 'string') {
                const base64string = reader.result.split(',')[1];
                callback(base64string);
            } else {
                callback('');
            }
        }
    }

    const uploadFileHandler = () => {
        fileInputRef.current?.click();
    }

    const fileSelectHandler = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            fileToBase64(file, (base64String: string) => {
                dispatch(uploadFile({
                    productId: selectedProduct!.id,
                    fileName: file.name,
                    fileString: base64String
                }))
            })
        }
    }

    const downloadFileHandler = (displayName: string, systemName: string) => {
        FilesApi().downloadFile({
            displayName,
            systemName
        }).then(data => {
            const blob = new Blob([data], {'type': 'application/octet-stream'});
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = displayName;
            link.click();
        });
    }

    const deleteFileHandler = (systemName: string) => {
        dispatch(deleteFile(systemName));
        //FilesApi().deleteFile(systemName);
    }

    const generateDescriptionHandler = () => {
        if (selectedProduct) {
            setIsLoading(true);
            
            const productToUpdate = {
                id: selectedProduct.id,
                name: selectedProduct.name,
                brand: selectedProduct.brand,
                price: Number(selectedProduct.price),
                description: selectedProduct.description,
                features: selectedProduct.features,
                userFiles: selectedProduct.userFiles
            };

            setProdActionMode('edit');
            const featuresText = (selectedProduct.features ?? [])
                .map(f => `${f.featureName}: ${f.description}`)
                .join(', ');
            const prompt = `Сгенерируй краткое красочное описание для товара с критериями: 
                Название: ${selectedProduct.name}, 
                Бренд: ${selectedProduct.brand} 
                Особенности: ${featuresText}. 
                Описание:`;
            dispatch(generateDescription({
                prompt: prompt
            })).then(data => {
                if (data.meta.requestStatus === 'fulfilled' && data.payload) {
                    console.log('Description generated:', data.payload);

                    const newDescription = data.payload;
                    setDescription(newDescription);
                    
                    productToUpdate.description = newDescription;

                    dispatch(editProduct(
                        productToUpdate
                    ))
                } else {
                    alert('Не удалось сгенерировать описание');
                }
            })
            .finally(() => 
                setIsLoading(false)
            );
        }
    }

    return (
        <Layout >
            {role === 'admin' && (
                <Dialog title={categoryActionMode !== 'edit' ? 'Добавить категорию' : 'Изменить категорию'}
                    open={showCategoryDialog}
                    onSave={saveCategoryHandler}
                    onCancel={closeCategoryDialogHandler}
                >
                <TextField labelText="Наименование" value={categoryName} onChange={(val) => setCategoryName(val)}/>
            </Dialog>
            )}
                <Dialog title={prodActionMode !== 'edit' ? 'Добавить товар' : 'Изменить товар'}
                    open={showProductDialog}
                    onSave={saveProductDialogHandler}
                    onCancel={closeProductDialogHandler}
                >
                    <TextField labelText="Название" value={name} onChange={(val) => setName(val)}/>
                    <TextField labelText="Бренд" value={brand} onChange={(val) => setBrand(val)}/>
                    <TextField labelText="Цена" value={String(price)} onChange={(val) => setPrice(val)}/>
                    <TextField labelText="Описание" value={description} onChange={(val) => setDescription(val)}/>
                </Dialog>
            
            <Dialog title="Добавить особенность товару"
                open={showFeatureDialog}
                onSave={() => {
                    dispatch(addFeature({
                        productId: selectedProduct!.id,
                        featureName: feature,
                        description: featureDescription
                    }));
                    setShowFeatureDialog(false);
                    setFeature('');
                    setFeatureDescription('');
                }}
                onCancel={() => {
                    setShowFeatureDialog(false);
                    clearFeatureDialogFields();
                }}
            >
                <TextField labelText="Особенность товара (название пункта)" value={feature} onChange={(val) => setFeature(val)}/>
                <TextField labelText="Описание" value={featureDescription} onChange={(val) => setFeatureDescription(val)}/>
            </Dialog>
            <input type='file' onChange={fileSelectHandler} style={{display: 'none'}} ref={fileInputRef}/>
            <div className="cat-page">
                <div className="cat-page__products-list-container">
                    <div className="cat-page__category-header">
                        <div className="cat-page__category-dropdown">
                        <DropDown 
                            items={categories.map(cc => {
                                return {
                                    text: cc.name,
                                    value: cc.id.toString()
                                } as DropDownItem
                            }) ?? []
                            } 
                            label="Категории:" 
                            lblWeight = 'strong'
                            selectedChanged={(val) => categoryChangedHandler(val)}
                        />
                        </div>
                        <div className="cat-page__product-info-actions">
                            {role === 'admin' && (<>
                                <AddIcon width={20} height={20} className="cat-page__add-btn" onClick={createCategoryHandler}/>
                                <PencilIcon onClick={editCategoryHandler}/>
                                <TrashIcon onClick={deleteCategoryHandler} />
                            </>
                            )}
                        </div>
                    </div>
                    
                    <ProductsList productsList={productsData}
                        onItemClick={(id) => onProductSelectedHandler(id)}
                        onItemDelete={deleteProductHandler}
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
                            {selectedProduct && (<UploadIcon onClick={uploadFileHandler}/>)}
                        </div>
                    </div>
                    <div className='cat-page__product-add-info'>
                        <div className='cat-page__product-add-info-files'>
                            <span className="cat-page__label">
                                Прикрепленные файлы
                            </span>
                            <FilesList 
                                onFileDowmload={downloadFileHandler}
                                onFileDelete={deleteFileHandler}
                                filesList={selectedProduct?.userFiles ?? []} 
                            />
                        </div>
                        <div className='cat-page__product-add-info-data'>
                            <div className='cat-page__product-add-info-data_cell'>
                                <div className="cat-page__list-title">
                                     <span className="cat-page__label">
                                        Описание: 
                                    </span>
                                    {!!selectedProduct && (
                                        isLoading ? (
                                            <LoadingIcon height={24} width={24} className="cat-page__add-btn_loading" />
                                        ) : (
                                            <BrainIcon 
                                                height={24} 
                                                width={24} 
                                                className="cat-page__add-btn" 
                                                onClick={generateDescriptionHandler} 
                                            />
                                        )
                                    )}
                                </div>
                                <div className="cat-page__description-box">
                                    <span>{selectedProduct?.description ?? '-'}</span>
                                </div>
                                
                            </div>
                            <div className='cat-page__product-add-info-data_cell'>
                                <div className="cat-page__list-title">
                                    <span className="cat-page__label">
                                        Особенности товара
                                    </span>
                                    {!!selectedProduct && (
                                        <AddIcon height={20} width={20} className="cat-page__add-btn" onClick={() => setShowFeatureDialog(true)}/>
                                    )}
                                </div>
                                <div className="cat-page__features-box">
                                    <FeaturesList 
                                        featuresList={selectedProduct?.features ?? []}
                                        onDelete={(id) => {
                                            if (window.confirm('Вы точно хотите удалить данную запись об особенности товара?')) {
                                                dispatch(deleteFeature(id));
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}