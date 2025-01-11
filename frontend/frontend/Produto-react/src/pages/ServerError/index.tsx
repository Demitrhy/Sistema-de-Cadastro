import React from 'react'
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

const ServerError: React.FC = () => {

  return (
    <Result
    status="500"
    title="500"
    subTitle="Desculpe, serviço indisponivel no momento."
    extra={<Button type="primary"><Link to={`${process.env.REACT_APP_PREFIX}/dashboard`} >Voltar para Dashboard</Link></Button>}
    />
  );
}

export default ServerError;

