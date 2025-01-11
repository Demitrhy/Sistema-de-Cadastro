import axios from 'axios';
import qs from 'querystring'
import { getToken, getUser } from '../utils/AuthService';
import { EtiquetaConferenciaAsCegasDtoProps } from '../store/ImpressaoEtiqueta/EtiquetaConferenciaAsCegas';
import { ImpressaoCDLoja } from '../store/CDxLoja/impressaoCDLoja';
import { NotasAImprimir } from '../store/CDxLoja/notasAImprimir';
import { EmbalagemProdutoDeposito } from '../store/EmbalagemExpedicaoProdutoDeposito/EmbalagemProdutoDeposito';
import { PedDiretoDetEnvioEmailDto, PedidoDireto, PedidoDiretoAprovacaoAme, Produto, ProdutoSemLote } from '../store/PedidoDireto/PedidoDireto';

const URL = process.env.REACT_APP_DISTRIBUICAO_API;
const URL_PEDIDO_DIRETO = process.env.REACT_APP_PEDIDO_DIRETO_API;
// const URL_MONITORAMENTO = process.env.REACT_APP_API_MONITORAMENTO_LOGISTICO;
// const URL_LABEL_SERVICE = process.env.REACT_APP_LABEL_SERVICE
// const URL_CHAMADOS = process.env.REACT_APP_CHAMADOS_API


// -------------------------- URL_PEDIDO_DIRETO -----------------------------

export async function getVersaoSistema() {
    axios.interceptors.request.use((config: any) => {
      config.headers.common["Authorization"] = "Bearer " + getToken();
  
      return config;
    });
    return await axios.get(`${URL_PEDIDO_DIRETO}/VersaoSistema`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  export async function postMandarParaImpressora(caminho: string){
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();
        return config;
    });

    return await axios.post(`http://localhost:8888/api/printer/MandarPdfsParaImpressao?caminho=${caminho}`, null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    });
}

export async function postPedidoDireto(data: any) 
{         
    console.log(data)
    axios.interceptors.request.use((config: any) => 
    {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();
        return config;
    });      
    return await axios.post(`${URL_PEDIDO_DIRETO}/pedidoDireto`, data, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })    
}

export async function getPedidoDireto(pedido, sequencial, tipoUsuario, filial) {
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();
        return config;
    }); 
    return await axios.get(`${URL_PEDIDO_DIRETO}/pedidoDireto/${pedido}/${sequencial}/${tipoUsuario}/${filial}`, {
        headers: {
        'Access-Control-Allow-Origin': '*',
    } })
}

export async function getLotesPorProduto(produto) 
{        
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();

        return config;
    });

    return await axios.get(`${URL_PEDIDO_DIRETO}/pedidoDireto/lotes/${produto}`, {
        headers: {
        'Access-Control-Allow-Origin': '*',
    } })
}

export async function postAutorizarPedidoDireto(data: any) 
{
    axios.interceptors.request.use((config: any) => 
    {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();
        return config;
    });      
    return await axios.post(`${URL_PEDIDO_DIRETO}/pedidoDireto/autorizar`, data, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    }) 
}  

export async function getProdutosSemLote(deposito: number){
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();

        return config;
    });
    return await axios.get(`${URL_PEDIDO_DIRETO}/pedidoDireto/produtosSemLote/${deposito}`)
}

export async function putCadastroLotesProduto(data: ProdutoSemLote) {

    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();

        return config;
    });
    return await axios.put(`${URL_PEDIDO_DIRETO}/pedidoDireto/cadastrar`, data, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    });
}   


export async function getTipoUsuarioPedidoDireto(matricula: number){
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();

        return config;
    });
    return await axios.get(`${URL_PEDIDO_DIRETO}/pedidoDireto/usuario/${matricula}`)
}

export async function putExcluirItem(data: Produto) {

    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();

        return config;
    });
    return await axios.put(`${URL_PEDIDO_DIRETO}/pedidoDireto/excluirItem`, data, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    });
} 

export async function putAprovarANE(data: any) {
    return await axios.put(`${URL_PEDIDO_DIRETO}/pedidoDireto/aprovacao/ane`, data, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    });
} 

export async function GeraDadosPedidoDireto(data: any) {
    return await axios.post(`${URL_PEDIDO_DIRETO}/pedidoDireto/geraDadosPedidoDireto`, data, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    });
} 

export async function getPesquisarPedidoDiretoPor(data: any) 
{   
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();

        return config;
    });
    let params = qs.stringify(data) 
    return await axios.get(`${URL_PEDIDO_DIRETO}/pedidoDireto/pesquisa/por?${params}`, {
        headers: {
        'Access-Control-Allow-Origin': '*',
    } })
}
    
export async function getPedidosDiretoPendentes(data: any) 
{   
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();

        return config;
    });
    let params = qs.stringify(data) 

    console.log(params, "parametro")

    return await axios.get(`${URL_PEDIDO_DIRETO}/pedidoDireto/pendentes/por?${params}`, {
        headers: {
        'Access-Control-Allow-Origin': '*',
    } })
}

export async function getPedidoComLotes(pedido, sequencial, filial) {
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();
        return config;
    }); 
    return await axios.get(`${URL_PEDIDO_DIRETO}/pedidoDireto/pedido/lotes/${pedido}/${sequencial}/${filial}`, {
        headers: {
        'Access-Control-Allow-Origin': '*',
    } })
}

export async function postAtualizarLotesPedidoDireto(pedido: number, sequencial: number, item: any){
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();
        return config;
    });

    return await axios.post(`${URL_PEDIDO_DIRETO}/pedidoDireto/pedido/lotes/atualizar/${pedido}/${sequencial}`, item, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    });
}

export async function putExcluirPedidoCompleto(data: PedidoDireto, motivoExclusao: string) {

    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();

        return config;
    });
    return await axios.put(`${URL_PEDIDO_DIRETO}/pedidoDireto/excluirPedido`, data, {
        params:{
            motivoExclusao: motivoExclusao
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    });
} 

export async function getDepositos(){
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();

        return config;
    });
    return await axios.get(`${URL_PEDIDO_DIRETO}/deposito/depositos/`)
}

export async function getInformacoesDeposito(deposito){
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();

        return config;
    });
    return await axios.get(`${URL_PEDIDO_DIRETO}/deposito/select/id/${deposito}`)
}

export async function getInformacoesFilial(filial){
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();

        return config;
    });

    return await axios.get(`${URL_PEDIDO_DIRETO}/filial/select/${filial}`)
}

export async function getFiliaisPorDeposito(deposito: number){
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();

        return config;
    });
    return await axios.get(`${URL_PEDIDO_DIRETO}/filial/filiaisPorDeposito/${deposito}`)
}

export async function getProdutoPedidoDireto(matricula, filial, produto, ame, ane, quantidade) 
{       
    axios.interceptors.request.use((config: any) => {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();

        return config;
    });
    return await axios.get(`${URL_PEDIDO_DIRETO}/produtosPedido/produto/filial/${matricula}/${filial}/${produto}/${ame}/${ane}/${quantidade}`, {
        headers: {
        'Access-Control-Allow-Origin': '*',
    } })
}

export async function postEnviarEmail(data?: PedDiretoDetEnvioEmailDto) 
{         
    axios.interceptors.request.use((config: any) => 
    {
        config.headers.common['Authorization'] = 'Bearer ' + getToken();
        return config;
    });      
    return await axios.post(`${URL_PEDIDO_DIRETO}/produtosPedido/produto/filial/enviar/email`, data, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    })    
}

export async function getInformacoesPlanilha(arquivo: string) {
    return await axios.get(`${URL}/ajusteEstoqueFilial/informacoesPlanilha/${arquivo}` )
}

// --------------------------------------------------------------- AINDA NO DISTRIBUIÇÃO




