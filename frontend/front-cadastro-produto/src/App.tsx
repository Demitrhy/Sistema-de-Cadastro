// App.tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './menu/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChakraProvider } from '@chakra-ui/react';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </ChakraProvider>
  );
};


export default App;
