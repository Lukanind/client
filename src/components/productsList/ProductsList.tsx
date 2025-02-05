import { FC, useState } from "react";
import { ProductsListProps } from "./ProductsListProps";

export const ProductsList: FC<ProductsListProps> = props => {
    const {productsList} = props;
    const [selectedProduct, setSelectedProduct] = useState(0);

    const productClickHandler = (id: number) => {
        setSelectedProduct(id);
    }

    const isSelected = (id: number) => selectedProduct === id;

    return (
        <div>
            {productsList.map(product => {
                return (
                <div key={product.id} onClick={() => productClickHandler(product.id)}>
                    {`${product.name} ${product.brand ?? ''} ${product.price}₽`.trim()}
                </div>)
            })}
        </div>
    );
}