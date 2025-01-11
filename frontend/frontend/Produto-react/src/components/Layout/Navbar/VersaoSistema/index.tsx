import React, { useState, useEffect } from 'react';
import { Popover, Tooltip } from 'antd';
import config from '../../../../../package.json';
 import { getVersaoSistema } from "../../../../services/apiservices";
import { StyledInfoCircleOutlined } from './style';


const VersaoSistema = () => {
  const [versaoBackend, setVersaoBackend] = useState<string | undefined>();

  useEffect(() => {
    const fetchVersaoSistema = async () => {
      try {
        const response = await getVersaoSistema();
        const versao = response.data; // valor desejado está em response.data
        setVersaoBackend(versao);
      } catch (error) {
        console.error("Erro ao obter a versão do backend:", error);
      }
    };
  
    fetchVersaoSistema();
  }, []);
 



  return (
    <Popover 
      placement="bottomRight"
      trigger="click" 
      title="Versão do sistema" 
      content={
        <p>
          <strong>Cliente:</strong> {config.version}<br />
          <strong>Servidor:</strong> {versaoBackend || '---'}
        </p>
      } 
    >
      <Tooltip placement="left" title="Versão do Sistema">
        <StyledInfoCircleOutlined />
      </Tooltip>
    </Popover>
  );
}

export default VersaoSistema;