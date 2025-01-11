import React from 'react'
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

const AccessDenied: React.FC = () => {

  return (
    <Result
    status="403"
    title="403"
    subTitle="Desculpe, você não tem permissão para acessar essa funcionalidade."
    extra={<Button type="primary"><Link to={`${process.env.REACT_APP_PREFIX}/dashboard`} >Voltar para Dashboard</Link></Button>}
    />
  );
}

export default AccessDenied;
