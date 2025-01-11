import axios from 'axios';
import { PedidoDiretoAprovacaoAme } from '../../../store/PedidoDireto/PedidoDireto';
import { getToken } from '../../../utils/AuthService';

const URL = process.env.REACT_APP_DISTRIBUICAO_API;
const URL_PEDIDO_DIRETO = process.env.REACT_APP_PEDIDO_DIRETO_API;


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

export async function postVoltarAme(pedido: any, sequencial: any) {
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();

        return config;
    });

    return await axios.post(`${URL_PEDIDO_DIRETO}/pedidoDireto/voltarAme/${pedido}/${sequencial}`, null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    });
}