export interface Description {
    id: number;
    color?: string;
    size?: string;
    made_in?: string;
    description?: string; 
}

export interface Feature {
    id: number;
    title: string;
    description?: string; 
}

export interface Product {
    id: number;
    name: string;
    brand?: string;
    price: number;
    description?: Description;
    feature?: Feature;
}

export interface Category {
    id: number;
    name: string;
    products: Array<Product>;
}