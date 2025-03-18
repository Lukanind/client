import { AccessTokenKey } from "../constants/commonConstants";
import { AxiosInstance } from "./axiosInstance";

const {axiosPost} = AxiosInstance();

interface LoginRequestDto {
    login: string;
    password: string;
}

interface LoginResponceDto {
    access_token: string;
    usename: string;
    role: string;
}

interface RegistrationRequestDto {
    login: string;
    password: string;
}

const signIn = async(loginData: LoginRequestDto) => {
    const data = await axiosPost('/login', loginData) as LoginResponceDto;
    sessionStorage.setItem(AccessTokenKey, data.access_token)
    return data;
}

const signUp = async(registrationData: RegistrationRequestDto) =>
    await axiosPost('/register', registrationData) as void;

export const Auth = {
    signIn,
    signUp
}