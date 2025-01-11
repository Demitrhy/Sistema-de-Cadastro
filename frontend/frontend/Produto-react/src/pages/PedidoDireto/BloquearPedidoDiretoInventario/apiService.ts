import axios from 'axios';
import { getToken } from '../../../utils/AuthService';
import { Deposito } from '../../../store/PedidoDireto/PedidoDireto';

const URL = process.env.REACT_APP_DISTRIBUICAO_API;
const URL_PEDIDO_DIRETO = process.env.REACT_APP_PEDIDO_DIRETO_API;

export async function getDepositosBloqueadosPorInventario(){
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();

        return config;
    });
    return await axios.get(`${URL_PEDIDO_DIRETO}/pedidoDireto/depositos/bloqueados/inventario`)
}

export async function postBloquearDepositos(depositos: number[], matricula: number){
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();
        return config;
    });

    return await axios.post(`${URL_PEDIDO_DIRETO}/pedidoDireto/depositos/bloquear/inventario/${matricula}`, depositos, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    });
}

export async function postDeletarBloqueioInventario(deposito: number){
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();
        return config;
    });

    return await axios.post(`${URL_PEDIDO_DIRETO}/pedidoDireto/depositos/deletar/bloqueio/inventario/${deposito}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    });
}