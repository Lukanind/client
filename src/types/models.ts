export interface Feature {
    id: number;
    featureName?: string; 
    description?: string;
}

export interface Product {
    id: number;
    name: string;
    brand?: string;
    price: number;
    description?: string;
    features?: Array<Feature>;
    userFiles?: Array<UserFiles>;
}

export interface Category {
    id: number;
    name: string;
    products: Array<Product>;
}

export interface User {
    id: number;
    login: string;
    password: string;
    role: 'admin' | 'manager' | 'user';
}

export interface UserFiles {
    id: number;
    systemName: string;
    displayName: string;
}