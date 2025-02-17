import { FC, useState } from "react";
import { ProductsListProps } from "./ProductsListProps";
import './productListStyles.scss'
import clsx from 'classnames';
import { PencilIcon, TrashIcon } from "../../assets/icons";

export const ProductsList: FC<ProductsListProps> = props => {
    const {
        productsList, 
        onItemClick,
        onItemDelete,
        onItemEdit
    } = props;

    const [selectedProduct, setSelectedProduct] = useState(0);

    const productClickHandler = (id: number) => {
        setSelectedProduct(id);
        onItemClick && onItemClick(id);
    }

    const productEditHandler = (id: number) => {
        onItemEdit && onItemEdit(id);
    }

    const productDeleteHandler = (id: number) => {
        onItemDelete && onItemDelete(id);
    }

    const isSelected = (id: number) => selectedProduct === id;

    return (
        <div className="prod-list">
            {productsList.map(product => {
                return (
                <div key={product.id} 
                    className={clsx('prod-list__item', {'prod-list__item_selected': isSelected(product.id)})}
                    onClick={() => productClickHandler(product.id)}
                >
                    <div className="prod-list__item-fio">
                        {`${product.name} ${product.brand ?? ''} ${product.price}₽`.trim()}
                    </div>
                    <div className="prod-list__item-actions">
                        <PencilIcon width={18} height={18} onClick={() => {productEditHandler(product.id)}}/>
                        <TrashIcon width={18} height={18} onClick={() => {productDeleteHandler(product.id)}}/>
                    </div>   
                </div>)
            })}
        </div>
    );
}