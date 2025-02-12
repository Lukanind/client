import { Product } from "../../types/models";

export interface ProductsListProps {
    productsList: Array<Product>;
    onItemClick?: (id: number) => void;
}