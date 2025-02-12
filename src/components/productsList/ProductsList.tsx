import { FC, useState } from "react";
import { ProductsListProps } from "./ProductsListProps";
import './productListStyles.scss'
import clsx from 'classnames';

export const ProductsList: FC<ProductsListProps> = props => {
    const {productsList, onItemClick} = props;
    const [selectedProduct, setSelectedProduct] = useState(0);

    const productClickHandler = (id: number) => {
        setSelectedProduct(id);
        onItemClick && onItemClick(id);
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
                    {`${product.name} ${product.brand ?? ''} ${product.price}₽`.trim()}
                </div>)
            })}
        </div>
    );
}