import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './menu/Router'; // esse arquivo deve conter as <Routes>
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
};

export default App;
