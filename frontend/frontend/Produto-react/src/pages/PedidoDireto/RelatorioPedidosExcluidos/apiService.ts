import axios from 'axios';
import qs from 'querystring'
import { getToken } from '../../../utils/AuthService';

const URL = process.env.REACT_APP_DISTRIBUICAO_API;
const URL_PEDIDO_DIRETO = process.env.REACT_APP_PEDIDO_DIRETO_API;
const URL_MONITORAMENTO = process.env.REACT_APP_API_MONITORAMENTO_LOGISTICO;
const URL_LABEL_SERVICE = process.env.REACT_APP_LABEL_SERVICE
const URL_CHAMADOS = process.env.REACT_APP_CHAMADOS_API

export async function getPedidosExcluidos(){
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();

        return config;
    });
    return await axios.get(`${URL_PEDIDO_DIRETO}/pedidoDireto/excluidos`)
}

export async function getPedidosExcluidosItens(pedido: any, sequencial: any ){
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();
        return config;
    });
   
    return await axios.get(`${URL_PEDIDO_DIRETO}/pedidoDireto/excluidos/itens/${pedido}/${sequencial}` )
    
}

