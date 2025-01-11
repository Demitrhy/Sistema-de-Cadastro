import React from 'react';
import { StyleHeader, Img, ListTitle } from './styles';
import AvatarFormat from './Profile/';
import Notification from './Notification/';
import { Row, Typography } from 'antd';
import Logo from './assets/Logo.svg'
import VersaoSistema from './VersaoSistema/index';

const Navbar = () => {

  const { Text } = Typography;

  return ( 
    <>
      <StyleHeader>
          <Row gutter={[4, 4]} justify="space-between">
            <Img  src={Logo}></Img>
            <ListTitle>{"Pedido Direto"}</ListTitle>
            <VersaoSistema />
            {/* <Row gutter={[4, 4]} justify="space-between"> */}
            {/* <Notification /> */}
            <AvatarFormat />
            {/* </Row> */}
          </Row>
      </StyleHeader>
    </>
  );
}

export default Navbar;

