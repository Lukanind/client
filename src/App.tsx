import React from 'react';
import { 
  LoginPage, 
  RegistrationPage, 
  CategoriesPage, 
  AdministrationPage, 
  NoPermissionsPage 
} from './pages';
import { Route, Routes } from 'react-router-dom';
import { RoutesPaths } from './constants/commonConstants';
import './styles/globalStyles.scss'

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path={RoutesPaths.Login} element={<LoginPage />} />
      <Route path={RoutesPaths.Registration} element={<RegistrationPage />} />
      <Route path={RoutesPaths.Categories} element={<CategoriesPage />} />

      <Route path={RoutesPaths.Administration} element={<AdministrationPage />} />
      <Route path={RoutesPaths.NoPermissions} element={<NoPermissionsPage />} />

      <Route path={'*'} element={<LoginPage />} />
    </Routes>
      
  ); 
}
