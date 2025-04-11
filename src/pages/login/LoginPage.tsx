import { FC, useEffect, useState } from 'react';
import { TextField } from '../../components';
import { Button } from '../../components';
import { WidgetLayout } from '../../components/layouts';
import { useNavigate } from 'react-router-dom';
import { RoutesPaths } from '../../constants/commonConstants';
import { Auth } from '../../api';
import './loginPageStyles.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxToolkitHooks';

export const LoginPage: FC = () => {
    const {accessToken, role} = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // const {signIn} = Auth;
    const navigate = useNavigate();

    useEffect(() => {
        if(accessToken) {
            if(role === 'user' || !role) {
                navigate(`/${RoutesPaths.NoPermissions}`);
            } else {
                navigate(`/${RoutesPaths.Categories}`);
            }
        }
    }, [accessToken, role, navigate]);

    const loginChangeHandler = (value: string) => {
        setLogin(value);
    }; 

    const passwordChangeHandler = (value: string) => {
        setPassword(value);
    };

    const loginHandler = () => {
        // signIn({login, password})
        //     .then((respData) => {
        //         if(respData.role === 'user') {
        //             navigate(`/${RoutesPaths.NoPermissions}`);
        //         } else {
        //             navigate(`/${RoutesPaths.Categories}`);
        //         }
        //         console.log(respData);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })
    }

    const toRegistrationHandler = () => {
        navigate(RoutesPaths.Registration)
    };


    return (
        <WidgetLayout>
            <div className="login-page__form">
                <h3 className='login-page__title'>Вход</h3>
                <div className='login-page__fields'>
                    <TextField labelText="Логин:" value={login} type='text' onChange={loginChangeHandler}/>
                    <TextField labelText="Пароль:" value={password} type='password' onChange={passwordChangeHandler}/>
                </div>
                <div className='login-page__actions'>
                    <Button text='Войти' onClick={loginHandler} type="primary"/>
                    <Button text='Зарегистрироваться' onClick={toRegistrationHandler} type="secondary"/>
                </div>
            </div>
        </WidgetLayout>
    )
}