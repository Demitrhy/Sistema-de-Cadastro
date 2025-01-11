import React from "react";
import { Avatar } from "antd";
import { CheckOutlined, CloseOutlined, SyncOutlined, ClockCircleOutlined } from '@ant-design/icons';

export const statusProcessamento = (
  
  dataHoraFimProcessamento: any, 
  dataHoraInicioProcessamento: any, 
  resultado: any, 
  error: any, 
  quantidadeTentativas: any
  ) => {

  let _statusProcessamento: any = {}

  switch (true) {
    case  (dataHoraInicioProcessamento === null 
          && dataHoraFimProcessamento === null 
          && quantidadeTentativas === 0):
      _statusProcessamento.enum = 1
      _statusProcessamento.descricao = 'Aguardando Processamento'
      _statusProcessamento.icon = <Avatar style={{ backgroundColor: '#0054a5' }} icon={<ClockCircleOutlined />} />
      break;
    case  (dataHoraInicioProcessamento !== null 
          && dataHoraFimProcessamento === null
          && resultado === null):
      _statusProcessamento.enum = 2
      _statusProcessamento.descricao = 'Processando'
      _statusProcessamento.icon = <Avatar style={{ backgroundColor: '#0054a5' }} icon={<SyncOutlined spin />} />
      break;
    case  (dataHoraInicioProcessamento !== null 
          && dataHoraFimProcessamento !== null
          && error === null 
          && quantidadeTentativas > 0):
      _statusProcessamento.enum = 3
      _statusProcessamento.descricao = 'Processamento Concluído'
      _statusProcessamento.icon = <Avatar style={{ backgroundColor: '#87d068' }} icon={<CheckOutlined  />} />
      break;
    case (dataHoraInicioProcessamento !== null 
         && dataHoraFimProcessamento !== null
         && error !== null 
         && quantidadeTentativas > 0):
      _statusProcessamento.enum = 4
      _statusProcessamento.descricao = 'Processamento com Erro'
      _statusProcessamento.icon = <Avatar style={{ backgroundColor: '#FF0033' }} icon={<CloseOutlined />} />
      break;
      
    default:
      _statusProcessamento.enum = 5
      _statusProcessamento.descricao = 'Inconsistência!'
      _statusProcessamento.icon = <Avatar style={{ backgroundColor: '#FF0033' }} icon={<CloseOutlined />} />
      break;
  }

      return _statusProcessamento;
}