import axios from 'axios';
import qs from 'querystring'
import { PedidoDiretoAprovacaoAme } from '../../../store/PedidoDireto/PedidoDireto';
import { getToken } from '../../../utils/AuthService';

const URL = process.env.REACT_APP_DISTRIBUICAO_API;
const URL_PEDIDO_DIRETO = process.env.REACT_APP_PEDIDO_DIRETO_API;
const URL_MONITORAMENTO = process.env.REACT_APP_API_MONITORAMENTO_LOGISTICO;
const URL_LABEL_SERVICE = process.env.REACT_APP_LABEL_SERVICE
const URL_CHAMADOS = process.env.REACT_APP_CHAMADOS_API

export async function getPedidosAutorizacaoAME(){
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();

        return config;
    });
    return await axios.get(`${URL_PEDIDO_DIRETO}/pedidoDireto/aprovacao/ame`)
}

export async function putPedidosAutorizacaoAME(data: PedidoDiretoAprovacaoAme) {
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();

        return config;
    });
    return await axios.put(`${URL_PEDIDO_DIRETO}/pedidoDireto/aprovacao/ame`, data, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    });
}

export async function putPedidosReprovarAME(data: PedidoDiretoAprovacaoAme) {
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();

        return config;
    });
    return await axios.put(`${URL_PEDIDO_DIRETO}/pedidoDireto/reprovou/ame`, data, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    });
}

export async function putEitarQuantidadeAME(data: any) {
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();

        return config;
    });
    return await axios.put(`${URL_PEDIDO_DIRETO}/pedidoDireto/edicao/quant/ame`, data, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    });
}