import React from 'react';
import Menu from './menu/Router';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return <>
    <Menu />
    <ToastContainer position="top-right" autoClose={3000} />
  </>;
};

export default App;
