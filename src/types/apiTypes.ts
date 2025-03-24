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