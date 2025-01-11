import React, { Dispatch, ReactNode } from 'react';
import { Button, Tooltip } from 'antd';
import { AntdModal, Info, Header, Title } from './styles';
import { InfoCircleOutlined } from '@ant-design/icons';
interface ModalProps {
  show: boolean;
  cancel: Dispatch<any>;
  title: string;
  tooltip: any; 
  children: ReactNode; 
  validated: boolean;
  loading?: boolean;
  confirm: any;
} 

const Modal: React.FC<ModalProps> = ({ show, cancel, title, tooltip, children, validated, confirm, loading}) => { 


  const confirmation = () => {
    confirm();
      cancel(!true);
    };

    return (
    <> 
      <AntdModal maskClosable={false} forceRender={true} destroyOnClose={true}
        visible={show} 
        title={
          <Header>
            <Title>{title}</Title>
            <Tooltip placement="bottomRight" title={tooltip}>
              <Info>
                <InfoCircleOutlined /> 
              </Info>
            </Tooltip>
            <span  style={{ color: '#df0505' }} hidden={validated}>Contém Pedidos com Situação Aberta.</span>
          </Header>
        }
        onOk={() => console.log("implementar")}
        footer={[
          <Button key="back" onClick={() => cancel(!true)}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary"  disabled={!validated} loading={loading} onClick={() => confirmation()}>
            Confirmar
          </Button>,
        ]}
      >
        {children}
      </AntdModal>
    </>
    );
  }
export default Modal; 