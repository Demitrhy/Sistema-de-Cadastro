import React from 'react'
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

const NotFound: React.FC = () => {

  return (
    <Result
    status="404"
    title="404"
    subTitle="Desculpe, a página não foi encontrada."
    extra={<Button type="primary"><Link to={`${process.env.REACT_APP_PREFIX}/dashboard`} >Voltar para Dashboard</Link></Button>}
    />
  );
}

export default NotFound;
