export interface LoginRequestDto {
    login: string;
    password: string;
}

export interface LoginResponceDto {
    access_token: string;
    usename: string;
    role: string;
}

export interface RegistrationRequestDto {
    login: string;
    password: string;
}

export interface addCategoriesResponseDto {
    name: string;   
}

export interface editCategoriesResponseDto {
    id: number;
    name: string;   
}

export interface AddProductResponseDto {
    categoryId: number;
    name: string;
    brand?: string;
    price: number;
    description?: string;
}

export interface UpdateProductResponseDto {
    id: number;
    name: string;
    brand?: string;
    price: number;
    description?: string;
    features?: Array<{
        id: number;
        featureName?: string; 
        description?: string;
    }>;
    userFiles?: Array<{
        id: number;
        systemName: string;
        displayName: string;
    }>;
}

export interface AddFeatureResponseDto {
    productId: number;
    featureName?: string; 
    description?: string;
}

export interface UploadFileResponseDto {
    productId: number;
    fileName: string;
    fileString: string;
}

export interface DownloadFileResponseDto {
    systemName: string;
    displayName: string;
}