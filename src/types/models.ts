export interface Feature {
    id: number;
    feature?: string; 
    description?: string;
}

export interface Product {
    id: number;
    name: string;
    brand?: string;
    price: number;
    description?: string;
    features?: Array<Feature>;
}

export interface Category {
    id: number;
    name: string;
    products: Array<Product>;
}