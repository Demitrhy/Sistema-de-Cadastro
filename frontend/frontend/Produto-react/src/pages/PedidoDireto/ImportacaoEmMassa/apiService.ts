import axios from 'axios';
import qs from 'querystring'
import { PedidoDireto, PedidoDiretoAprovacaoAme, PedidoDiretoImportacao } from '../../../store/PedidoDireto/PedidoDireto';
import { getToken } from '../../../utils/AuthService';

const URL = process.env.REACT_APP_DISTRIBUICAO_API;
const URL_PEDIDO_DIRETO = process.env.REACT_APP_PEDIDO_DIRETO_API;


export async function putImportarPedidoDiretoEmMassa(data: Array<PedidoDiretoImportacao>, usuario: number) {
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();

        return config;
    });

    return await axios.put(`${URL_PEDIDO_DIRETO}/pedidoDireto/importar/massa`, data, {
        params:{
            usuario: usuario
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    });
}

export async function getInformacoesPlanilha(arquivo: string, pedido: number, sequencial: number) {
    return await axios.get(`${URL_PEDIDO_DIRETO}/pedidoDireto/informacaoPlanilhaProduto/${arquivo}/${pedido}/${sequencial}` )
}


export async function getBuscarPlanilha() {
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();
          return config;
        });    
        return await axios.get(`${URL_PEDIDO_DIRETO}/pedidoDireto/planilha`) ;
}