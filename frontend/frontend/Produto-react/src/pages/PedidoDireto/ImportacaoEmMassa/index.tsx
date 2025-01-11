import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Alert, Button, Col, Input, message, Modal, Row, Space, Tabs, Tooltip } from 'antd';
import Table from 'antd/lib/table';
import { getRoles, getUser } from "../../../utils/AuthService";
import PageHeader from '../../../components/Layout/Page Header';
import {Container, ButtonPrimary } from './styles';
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from 'react-redux';
import { ICombineReducers } from '../../../store/rootReducer';
import Wrapper from '../../../components/Wrapper';
import ExcelReader from '../../../components/ExcelReader';
import { CheckOutlined, ClearOutlined, DownloadOutlined, MessageFilled, SearchOutlined } from '@ant-design/icons';
import { PedidoDireto, PedidoDiretoImportacao, Planilha } from '../../../store/PedidoDireto/PedidoDireto';
import { getBuscarPlanilha, getInformacoesPlanilha, putImportarPedidoDiretoEmMassa } from './apiService';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
export const useSelector: TypedUseSelectorHook<ICombineReducers> = useReduxSelector;
const { TabPane } = Tabs;


const ImportarEmMassa: React.FC = (props: any) => {
  const [loadingTable, setLoadingTable] = useState(false);
  const [theInputKey, setTheInputKey] = useState(Math.random().toString(36));
  const [planilha, setPlanilha] = useState<Array<PedidoDiretoImportacao>>();
  const [planilhaValida, setPlanilhaValida] = useState(false);
  const [loadingTablePlanilhas, setLoadingTablePlanilhas] = useState(false);
  const [nomeArquivo, setNomeArquivo] = useState("");
  const [planilhaImportada , setPlanilhaImportada] = useState<Array<Planilha>>([]); 

  const columns = [
    {
      title: 'Filial',
      dataIndex: 'filial',
      key: 'filial',
      align: 'center' as 'center',
      width: '16%',
    },
    {
      title: 'Depósito',
      dataIndex: 'deposito',
      key: 'deposito',
      align: 'center' as 'center',
      width: '16%',
    },
    {
      title: 'Produto',
      dataIndex: 'produto',
      key: 'produto',
      align: 'center' as 'center',
      width: '16%',
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      key: 'quantidade',
      align: 'center' as 'center',
      width: '16%',
      editable: true,
    }
  
  ]

  function limparCampos() {
    setTheInputKey(Math.random().toString(36));
    setPlanilha([]);
    setPlanilhaValida(false);
  }

  function importarPedidoDiretoEmMassa() {
    setLoadingTable(true);
    const key = 'updatable';
     
    if (planilha) {
      message.loading({ content: 'Importando pedidos diretos...', key });
      putImportarPedidoDiretoEmMassa(planilha, getUser())
        .then((resultado) => {
          setTimeout(() => {
            message.success({ content: 'Pedidos importados com sucesso!', key, duration: 2 });
          }, 1000);
          limparCampos();
        })
        .catch((error) => {
          message.error(error.response.data)
        })
        .finally(() => {
          setLoadingTable(false);
        })
    }
  }

  useEffect(() => { 
    setLoadingTable(true);

       if (planilha?.length! > 0) {
         
          const produtoSemLinha = planilha?.map((linha) => {
            if (linha.produto !== null ){
              linha.produto = linha.produto.replace(/-/g,'');
            }
            return linha 
          })
          
              if (planilha?.filter((j: any) => j.filial == null).length != 0)
             message.warn("Falta informar, em alguma linha do arquivo, a filial do pedido. Por favor, corrija!");
           else if (planilha?.filter((j: any) => j.deposito == null).length != 0)
             message.warn("Falta informar, em alguma linha do arquivo, o depósito do pedido. Por favor, corrija!")
           else if (produtoSemLinha?.filter((j: any) => j.produto == null).length != 0)  ///replace("-", ""))  
             message.warn("Falta informar, em alguma linha do arquivo, o produto do pedido. Por favor, corrija!")
           else if (planilha?.filter((j: any) => j.quantidade == null).length != 0)
             message.warn("Falta informar, em alguma linha do arquivo, a quantidade a ser pedida do produto. Por favor, corrija!")
           else {
             setPlanilhaValida(true);
             message.success("Planilha válida e pronta para ser importada!")
           }
    }
    setLoadingTable(false);
  }, [planilha]);


  useEffect(() => {
    setLoadingTable(true);
    if (planilhaValida) {
      setPlanilha(planilha?.map((row: any) => {
        return {
          ...row,
          key: row.arquivo,
          arquivo: nomeArquivo,
          filial: row.filial,
          pedido: row.pedido,
          sequencial: row.sequencial,
          dataHora: row.dataHora
        }
      }))
    }
    setLoadingTable(false);
  }, [planilhaValida]);
  

  const columnsPlanilhas = [
    {
      title: 'Arquivo',
      dataIndex: 'arquivo',
      key: 'arquivo',
      align: 'center' as 'center',
      width: '14%',
    },
    {
      title: 'Filial',
      dataIndex: 'filial',
      key: 'filial',
      align: 'center' as 'center',
      width: '14%',
    },
    {
      title: 'Pedido',
      dataIndex: 'pedido',
      key: 'pedido',
      align: 'center' as 'center',
      width: '14%',
    },
    {
      title: 'Sequencial',
      dataIndex: 'sequencial',
      key: 'sequencial',
      align: 'center' as 'center',
      width: '14%',
    },
    {
      title: 'Usuário que importou ',
      dataIndex: 'usuario',
      key: 'usuario',
      align: 'center' as 'center',
      width: '14%',
    },
    {
      title: 'Data Importado',
      dataIndex: 'dataHora',
      key: 'dataHora',
      align: 'center' as 'center',
      width: '14%',
    },
    {
      title: 'Ação',
      dataIndex: 'x',
      key:'x',
      align: 'center' as 'center',
      width: '20%',
      render:(text: any, record: any) => (
        <div>
           <Space size="small">
                <ButtonPrimary>
                <Tooltip placement="top" title="Baixar planilha">
                        <Button size="middle"
                          type="primary"
                          onClick={() => baixarExcel( record.key, record.pedido, record.sequencial )}
                          icon={<DownloadOutlined />} />
                 </Tooltip>
                </ButtonPrimary>
           </Space>

        </div>
      )
    }
  ]

  
  function baixarExcel( arquivo: any,  pedido: any,sequencial: any) {
    let fileExtension = '.xlsx';
  
    getInformacoesPlanilha( arquivo, pedido, sequencial)
      .then((excel) => {
        let header = [ 'Filial','Depósito', 'Produtos', 'Motivos', 'Data Importada'];
        const ws = XLSX.utils.book_new();
        XLSX.utils.sheet_add_aoa(ws, [header]);
        XLSX.utils.sheet_add_json(ws, excel.data, { origin: 'A2', skipHeader: true });
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { type: 'array', cellStyles: true });
        const finalData = new Blob([excelBuffer], { type: fileExtension });
        FileSaver.saveAs(finalData,arquivo, pedido, sequencial);
      }).catch((error) => {
        message.error("Ocorreu um erro ao tentar exportar planilha.", 5);
      })
  }
 
  
  useEffect(() => {
    resgatarPlanilhas();
  }, [])
   
  function resgatarPlanilhas() {
    setLoadingTablePlanilhas(true);
    getBuscarPlanilha()
      .then((resultado) => {
        setPlanilhaImportada(resultado.data.map((row: any) => {
          return {
            ...row,
            key: row.arquivo,
            arquivo: row.arquivo,
            usuario: row.usuario,
            pedido: row.pedido,
            sequencial: row.sequencial,
            dataHora: row.dataHora
        }}))
      }).catch((error) => {
        message.error("Falha ao resgatar planilhas.", 3);
      }).finally(() => {
        setLoadingTablePlanilhas(false);
      })
  }



   return (
     <div>
         <PageHeader></PageHeader>
         <Container>
           <Tabs defaultActiveKey = "1">
              <TabPane tab="Importações" key ="1"> 
                 <Wrapper>
                   <ExcelReader onRead={setPlanilha} key={theInputKey} setFileName={setNomeArquivo} />
                   <Button type="primary"
                        icon={<CheckOutlined />}
                        style={{ marginLeft: '35em' }}
                        disabled={!planilhaValida}
                        onClick={() => importarPedidoDiretoEmMassa()}> Importar </Button>
                
                        <Button type="danger"
                          icon={<ClearOutlined />}
                          style={{ marginRight: '5px' }}
                          onClick={() => limparCampos()}> Limpar campos </Button>
                
                           <Alert style={{
                             fontSize: 12 + 'px',
                             marginTop: 2 + 'em',
                             textAlign: "center",
                             width: '100em'
                           }}
                             message="É obrigatório que a planilha contenha os campos filial, depósito, produto (código + dígito), quantidade."
                             type="warning" />
                          
                  </Wrapper>
                        <Container>
                          <Table style={{ marginTop: 2 + 'em' }}
                            loading={loadingTable}
                            columns={columns}
                            dataSource={planilha}
                            title={() => <div style={{ textAlign: "center", fontSize: 15 }}>Itens que serão importados</div>} />
                        </Container>
               </TabPane>
                     <TabPane tab="Planilhas importadas" key="2">
                     <Container>
                       <Table columns={columnsPlanilhas}
                              loading={loadingTablePlanilhas}
                              dataSource={planilhaImportada}
                               style={{ marginTop: 2 + 'em' }} />
                               </Container>
                      </TabPane>
             </Tabs>
          </Container>
     </div> 

)

}
export default ImportarEmMassa;