import React, { useEffect, useLayoutEffect, useState } from 'react'
import PageHeader from "../../../components/Layout/Page Header";
import { Container } from "./styles";
import { Button, Input, message, Space, Table, Tabs } from "antd";
import { ProdutoSemLote } from '../../../store/PedidoDireto/PedidoDireto';
import { getProdutosSemLote } from '../../../services/apiservices';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import Wrapper from '../../../components/Wrapper';
import ModalIncluirLoteProduto from './IncluirLoteProduto';
import { getRoles } from '../../../utils/AuthService';
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from 'react-redux';
import { useHistory } from "react-router";
import { ICombineReducers } from '../../../store/rootReducer';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import EditarLote from './editarLote';
export const useSelector: TypedUseSelectorHook<ICombineReducers> = useReduxSelector;

const { TabPane } = Tabs;


const IncluirLotes: React.FC = () => {
  const { data } = useSelector(state => state.autenticacao)
  const history = useHistory();
  const [deposito, setDeposito] = useState(0);
  const [produtosSemLote, setProdutosSemLote] = useState<Array<ProdutoSemLote>>();
  const [loadingTable, setLoadingTable] = useState(false);
  const [row, setRow] = useState();
  const dateFormat = "DD/MM/YYYY HH:mm:ss";
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  function onChangeDeposito(value: any) {
    if (value.length > 0)
      setDeposito(value)
  }

  function buscarProdutosSemLote() {
    if (deposito) {
      setLoadingTable(true);
      getProdutosSemLote(deposito)
        .then((resultado) => {
          if (resultado.data.length > 0) {
            setProdutosSemLote(resultado.data?.map((row: any) => {
              return {
                ...row,
                key: row.id,
                codigoDeposito: row.codigoDeposito,
                nomeFantasiaDeposito: row.nomeFantasiaDeposito,
                numeroPedido: row.numeroPedido,
                sequencialPedido: row.sequencialPedido,
                quantidadePedida: row.quantidadePedida,
                codigoProduto: row.codigoProduto,
                idEnderecoProdutoDeposito: row.idEnderecoProdutoDeposito,
                dataCadastro: moment(row.dataCadastro).format(dateFormat),
                codigoFilial: row.codigoFilial,
              };
            }))
            setLoadingTable(false);
          }
          else {
            message.warn("Não foram encontrados produtos sem lote para o depósito informado.")
            setLoadingTable(false);
          }
        }).catch((error) => {
          message.error("Ocorreu um erro ao tentar resgatar informações. Tente novamnete.")
          setLoadingTable(false);
        })
    }
  }

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    setSearchText('')
  };

  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: { setSelectedKeys: any, selectedKeys: any, confirm: any, clearFilters: any }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Limpar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        //setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text: any) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });


  const columns = [
    {
      title: 'Depósito',
      dataIndex: 'nomeFantasiaDeposito',
      key: 'nomeFantasiaDeposito',
      align: 'center' as 'center',
      width: '15%',
    },
    {
      title: 'Filial',
      dataIndex: 'codigoFilial',
      key: 'codigoFilial',
      align: 'center' as 'center',
      width: '12%',
      ...getColumnSearchProps('codigoFilial'),
    },
    {
      title: 'Número pedido',
      dataIndex: 'numeroPedido',
      key: 'numeroPedido',
      align: 'center' as 'center',
      width: '12%',
      ...getColumnSearchProps('numeroPedido'),
    },
    {
      title: 'Sequencial pedido',
      dataIndex: 'sequencialPedido',
      key: 'sequencialPedido',
      align: 'center' as 'center',
      width: '12%',
    },
    {
      title: 'Data Cadastro',
      dataIndex: 'dataCadastro',
      key: 'dataCadastro',
      align: 'center' as 'center',
      width: '13%',
    },
    {
      title: 'Código produto',
      dataIndex: 'codigoProduto',
      key: 'codigoProduto',
      align: 'center' as 'center',
      width: '12%',
    },
    {
      title: 'Quantidade pedida',
      dataIndex: 'quantidadePedida',
      key: 'quantidadePedida',
      align: 'center' as 'center',
      width: '10%',
    },
    {
      title: 'Cadastrar lote',
      dataIndex: '',
      key: 'x',
      align: 'center' as 'center',
      width: '12%',
      render: (text: any, record: any) => (
        <div>
          <Space size="middle">
            <Button type="primary"
              onClick={() => {
                setRow(record);
              }}
              icon={<EditOutlined />}
              style={{ marginRight: 10 }}
            />
          </Space>
        </div>
      )
    }
  ]

  useEffect(() => {
    if (row === undefined) {
      buscarProdutosSemLote();
    }
  }, [row]);

  useLayoutEffect(() => {
    !getRoles("PDIL") && history.push(`${process.env.REACT_APP_PREFIX}/403`);
  }, [data]);

  return (
    <>
      <PageHeader></PageHeader>
      <Container>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Cadastrar lotes" key="1">
            <Input placeholder={"Informe o depósito"} style={{ width: 13 + 'em' }} onChange={(e) => onChangeDeposito(e.target.value)} type="number" />
            <Button style={{ marginLeft: "2px" }} type="primary" icon={<SearchOutlined />} onClick={() => buscarProdutosSemLote()}>
              Buscar
            </Button>

            <Table style={{ marginTop: 1 + 'em' }}
              columns={columns}
              loading={loadingTable}
              dataSource={produtosSemLote}
              title={() => <div style={{ textAlign: "center", fontSize: 15 }}><b>Produtos sem lote</b></div>} />
            {row &&
              <ModalIncluirLoteProduto
                onClose={() => {
                  setRow(undefined);
                }}
                icone={<EditOutlined />}
                row={row}
                produtosSemLote={getProdutosSemLote}
              />
            }
          </TabPane>
          <TabPane
            tab="Editar lotes"
            disabled={!getRoles("PDLB") || !getRoles("AUANE")}
            key="2">
            <EditarLote />
          </TabPane>
        </Tabs>
      </Container>
    </>
  );
}

export default IncluirLotes;
