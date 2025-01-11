import React from 'react';
import { IconNotification } from './styles';
import { Popover, Tooltip, Button, List, Avatar, Empty, Badge } from 'antd';
import { avatarInitials } from '../../../../utils/AvatarInitials';


const data = [
  {
    tipo: 'Envio em Massa',
    descricao: 'Atividade #1920292 foi concluída sem erros',
    task: 1
  },
  {
    tipo: 'Editar em Massa',
    descricao: 'Atividade #1920292 foi concluída sem erros',
    task: 2
  },
  {
    tipo: 'Analisador Automatico',
    descricao: 'Atividade #1920292 foi concluída sem erros',
    task: 3
  },
  {
    tipo: 'Editar em Massa',
    descricao: 'Atividade #1920292 foi concluída sem erros',
    task: 4
  },
  {
    tipo: 'Analisador Automatico',
    descricao: 'Atividade #1920292 foi concluída sem erros',
    task: 5
  },
];

 const Notification = () => {
  return (
    <>
      {/* <Popover 
        placement="bottomRight"
        trigger="click" 
        title="Notificação" 
        content={
          <List
          size="small"
          itemLayout="horizontal"
          dataSource={data}
          locale={
            {emptyText: 
              <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={
                <div style={{ fontSize: 14, color: 'black'}}> 
                  Nenhuma <span style={{ fontWeight: 640}}>Notificação</span> disponível! 
                </div>
              }
            >
            </Empty>}
          }
          renderItem={item => (
            <List.Item>
              <List.Item.Meta style={{ marginBottom: 0}}
                avatar={<Avatar size="large" style={{ width: '38px', height: '38px', fontSize: '25px', fontWeight: 650, padding: 0, marginRight: '-10px',  backgroundColor: '#ff9090'}} shape="square">{avatarInitials(item.tipo)}</Avatar>}
                title={<div style={{ marginTop: -3}}>{item.tipo}</div>}
                description={<div style={{ maxWidth: '40ch', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: -3}}>{item.descricao}</div>}
              />
            </List.Item>
            )}
          />
        } 
      > 
      <Tooltip placement="left" title="Notificação">
        <Button style={{ margin: 6}} type="link">
        <Badge style={{ marginTop: 12 }} count={5}>
          <IconNotification />
          </Badge>
        </Button>
      </Tooltip>
    </Popover>*/}
  </>
  );
}

export default Notification;