import React from 'react';
import { LoginPage } from './pages';
import { RegistrationPage } from './pages/registration';
import { Route, Routes } from 'react-router-dom';
import { RoutesPaths } from './constants/commonConstants';
import { CategoriesPage } from './pages/category/CategoriesPage';
import './styles/globalStyles.scss'
import { NewPage } from './pages/newpage/NewPage';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path={RoutesPaths.Login} element={<LoginPage />} />
      <Route path={RoutesPaths.Registration} element={<RegistrationPage />} />
      <Route path={RoutesPaths.Categories} element={<CategoriesPage />} />

      <Route path={RoutesPaths.New} element={<NewPage />} />

      <Route path={'*'} element={<LoginPage />} />
    </Routes>
      
  ); 
}
