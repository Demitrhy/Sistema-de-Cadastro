import { lazy } from 'react'
import { getRoles } from '../utils/AuthService';

// Compoments management app
const Login = lazy(() => import('../pages/Login'));
const NotFound = lazy(() => import('../pages/NotFound'));
const AccessDenied = lazy(() => import('../pages/AccessDenied'));
const ServerError = lazy(() => import('../pages/ServerError'));
const IncluirLotes = lazy(() => import('../pages/PedidoDireto/IncluirLotes'));
const SolicitarPedido = lazy(() => import('../pages/PedidoDireto/SolicitarPedido'));
const AutorizacaoAME = lazy(() => import("../pages/PedidoDireto/AutorizacaoAME"));
const StatusPedido = lazy(() => import('../pages/PedidoDireto/StatusPedido'));
const ImportarEmMassa = lazy(() => import('../pages/PedidoDireto/ImportacaoEmMassa'));
const RelatorioPedidosExcluidos = lazy(() => import('../pages/PedidoDireto/RelatorioPedidosExcluidos'));
const BloquearPedidoDiretoInventario = lazy(() => import('../pages/PedidoDireto/BloquearPedidoDiretoInventario'));

export default [

  {
    title: 'NotFound',
    subTitle: '',
    role: '404',
    path: `${process.env.REACT_APP_PREFIX}/404`,
    component: NotFound,
    public: false,
    searchable: false,
    breadcrumb: [{ path: `${process.env.REACT_APP_PREFIX}/dashboard`, breadcrumbName: 'Home' }],
  },
  {
    title: 'AccessDenied',
    subTitle: '',
    role: '403',
    path: `${process.env.REACT_APP_PREFIX}/403`,
    component: AccessDenied,
    public: false,
    searchable: false
  },
  {
    title: 'ServerError',
    subTitle: '',
    role: '500',
    path: `${process.env.REACT_APP_PREFIX}/500`,
    component: ServerError,
    public: false,
    searchable: false,
    breadcrumb: [{ path: `${process.env.REACT_APP_PREFIX}/dashboard`, breadcrumbName: 'Home' }],
  },
  {
    title: 'Login',
    subTitle: '',
    role: 'AUTH',
    path: `${process.env.REACT_APP_PREFIX}/login`,
    component: Login,
    public: true,
    searchable: false,
    breadcrumb: [{ path: `${process.env.REACT_APP_PREFIX}/dashboard`, breadcrumbName: 'Home' }],
  },
  {
    title: 'Pedido Direto: Solicitar Pedido',
    subTitle: '',
    role: 'AUEA',
    path: `${process.env.REACT_APP_PREFIX}/PedidoDireto/SolicitarPedido`,
    component: SolicitarPedido,
    public: false,
    searchable: getRoles("AUEA"),
    breadcrumb: [
      { path: `${process.env.REACT_APP_PREFIX}/PedidoDireto/SolicitarPedido`, breadcrumbName: 'Home' },
      { path: `${process.env.REACT_APP_PREFIX}/PedidoDireto/SolicitarPedido`, breadcrumbName: 'Solicitar Pedido' },
    ],
  },
  {
    title: 'Pedido Direto: Configurar lotes',
    subTitle: '',
    role: 'AUEA',
    path: `${process.env.REACT_APP_PREFIX}/PedidoDireto/IncluirLotes`,
    component: IncluirLotes,
    public: false,
    searchable: getRoles("AUEA"),
    breadcrumb: [
      { path: `${process.env.REACT_APP_PREFIX}/PedidoDireto/IncluirLotes`, breadcrumbName: 'Home' },
      { path: `${process.env.REACT_APP_PREFIX}/PedidoDireto/IncluirLotes`, breadcrumbName: 'Configurar lotes' },
    ],
  },
  {
    title: 'Pedido Direto: Autorização AME',
    subTitle: '',
    role: 'AUAM',
    path: `${process.env.REACT_APP_PREFIX}/PedidoDireto/AutorizacaoAME`,
    component: AutorizacaoAME,
    public: false,
    searchable: getRoles("AUAM"),
    breadcrumb: [
      { path: `${process.env.REACT_APP_PREFIX}/PedidoDireto/AutorizacaoAME`, breadcrumbName: 'Home' },
      { path: `${process.env.REACT_APP_PREFIX}/PedidoDireto/AutorizacaoAME`, breadcrumbName: 'Autorização AME' },
    ],
  },
  {
    title: 'Pedido Direto: Status',
    subTitle: '',
    role: 'AUEA',
    path: `${process.env.REACT_APP_PREFIX}/PedidoDireto/StatusPedido`,
    component: StatusPedido,
    public: false,
    searchable: getRoles("AUEA"),
    breadcrumb: [
      { path: `${process.env.REACT_APP_PREFIX}/PedidoDireto/Dashbooard`, breadcrumbName: 'Home' },
      { path: `${process.env.REACT_APP_PREFIX}/PedidoDireto/StatusPedido`, breadcrumbName: 'Pedido Direto: Status' },
    ],
  },
  {
    title: 'Pedido Direto: Importação em massa',
    subTitle: '',
    role: 'AUEA',
    path: `${process.env.REACT_APP_PREFIX}/PedidoDireto/ImportarEmMassa`,
    component: ImportarEmMassa,
    public: false,
    searchable: getRoles("AUEA"),
    breadcrumb: [
      { path: `${process.env.REACT_APP_PREFIX}/PedidoDireto/Dashbooard`, breadcrumbName: 'Home' },
      { path: `${process.env.REACT_APP_PREFIX}/PedidoDireto/ImportarEmMassa`, breadcrumbName: 'Pedido Direto: Importação em massa' },
    ],
  },
  {
    title: 'Pedido Direto: Relatorio Pedido Excluidos',
    subTitle: '',
    role: 'AUEA',
    path: `${process.env.REACT_APP_PREFIX}/PedidoDireto/RelatorioPedidosExcluidos`,
    component: RelatorioPedidosExcluidos,
    public: false,
    searchable: getRoles("AUEA"),
    breadcrumb: [
      { path: `${process.env.REACT_APP_PREFIX}/PedidoDireto/Dashbooard`, breadcrumbName: 'Home' },
      { path: `${process.env.REACT_APP_PREFIX}/PedidoDireto/RelatorioPedidosExcluidos`, breadcrumbName: 'Pedido Direto: Relatorio Pedidos Excluidos' },
    ],
  },
  {
    title: 'Pedido Direto: Bloquear inventário',
    subTitle: '',
    role: 'AUEA',
    path: `${process.env.REACT_APP_PREFIX}/PedidoDireto/BloquearPedidoDiretoInventario`,
    component: BloquearPedidoDiretoInventario,
    public: false,
    searchable: getRoles("AUEA"),
    breadcrumb: [
      { path: `${process.env.REACT_APP_PREFIX}/PedidoDireto/Dashbooard`, breadcrumbName: 'Home' },
      { path: `${process.env.REACT_APP_PREFIX}/PedidoDireto/BloquearPedidoDiretoInventario`, breadcrumbName: 'Pedido Direto: Bloquear inventário' },
    ],
  }
];
