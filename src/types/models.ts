export interface Description {
    id: number;
    color?: string;
    size?: string;
    made_in?: string;
    description?: string; 
}

export interface Feature {
    id: number;
    feature?: string; 
}

export interface Product {
    id: number;
    name: string;
    brand?: string;
    price: number;
    description?: Description;
    features?: Array<Feature>;
}

export interface Category {
    id: number;
    name: string;
    products: Array<Product>;
}