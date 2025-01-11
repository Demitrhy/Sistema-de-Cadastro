import React from 'react';
import { Menu, Affix, } from 'antd';
import { Link } from 'react-router-dom';
import { StyleSider } from './styles';
import {
  InfoCircleOutlined, FileDoneOutlined,
  AlertOutlined, CopyrightOutlined,
  ShoppingCartOutlined, DashboardOutlined,
  HistoryOutlined, AimOutlined, RetweetOutlined,
  TableOutlined, InfoCircleFilled, TrademarkOutlined, PrinterOutlined, SnippetsOutlined, SettingOutlined, CheckCircleOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;


const MenuSide = () => {

  return (
    <div>
      <Affix>
        <StyleSider collapsible defaultCollapsed width={220} collapsedWidth={60}>
          <Menu defaultSelectedKeys={['100']} mode="inline">
            <SubMenu
              key="900"
              title={
                <span>
                  <FileDoneOutlined style={{ fontSize: 20, color: '#0054A5' }} />
                  <span>Pedido Direto</span>
                </span>
              }
            >
              <Menu.Item key="901">
                <Link to="/front-pedido-direto-react/PedidoDireto/SolicitarPedido">
                  <span>Solicitar Pedido</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="902">
                <Link to="/front-pedido-direto-react/PedidoDireto/IncluirLotes">
                  <span>Configurar lotes</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="903">
                <Link to="/front-pedido-direto-react/PedidoDireto/AutorizacaoAME">
                  <span>Autorização AME</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="904">
                <Link to="/front-pedido-direto-react/PedidoDireto/StatusPedido">
                  <span>Pendências Pedidos</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="905">
                <Link to="/front-pedido-direto-react/PedidoDireto/ImportarEmMassa">
                  <span>Importar em massa</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="906">
                <Link to="/front-pedido-direto-react/PedidoDireto/RelatorioPedidosExcluidos">
                  <span>Relatorio Pedidos Excluidos</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="907">
                <Link to="/front-pedido-direto-react/PedidoDireto/BloquearPedidoDiretoInventario">
                  <span>Bloquear pedido direto</span>
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </StyleSider>
      </Affix>
    </div>
  );
}

export default MenuSide;