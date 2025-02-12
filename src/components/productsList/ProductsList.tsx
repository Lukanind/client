import { FC, useState } from "react";
import { ProductsListProps } from "./ProductsListProps";
import './productListStyles.scss'
import clsx from 'classnames';
import { PencilIcon, TrashIcon } from "../../assets/icons";

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
                    <div>
                        {`${product.name} ${product.brand ?? ''} ${product.price}₽`.trim()}
                    </div>
                    <div>
                        <PencilIcon width={18} height={18}/>
                        <TrashIcon width={18} height={18}/>
                    </div>   
                </div>)
            })}
        </div>
    );
}