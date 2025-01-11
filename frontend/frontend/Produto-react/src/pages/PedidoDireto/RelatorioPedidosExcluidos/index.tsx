import React, { useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, message, Modal, Row, Space } from 'antd';
import Table from 'antd/lib/table';
import { getUser } from "../../../utils/AuthService";
import PageHeader from '../../../components/Layout/Page Header';
import { Container } from './styles';
import {
    TypedUseSelectorHook,
    useSelector as useReduxSelector,
} from 'react-redux';
import { ICombineReducers } from '../../../store/rootReducer';
import { PedidoExluidoItens, PedidoExcluido } from '../../../store/PedidoDireto/PedidoDireto';
import { getPedidosExcluidos, getPedidosExcluidosItens } from './apiService';
import Highlighter from 'react-highlight-words';
import moment from 'moment';

export const useSelector: TypedUseSelectorHook<ICombineReducers> = useReduxSelector;

const RelatorioPedidosExcluidos: React.FC = (props: any) => {
    const { data } = useSelector(state => state.autenticacao)
    const [loadingTable, setLoadingTable] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pedidoExluido, setPedidoExcluido] = useState<Array<PedidoExcluido>>()
    const [pedidoDiretoItensExcluidos, setPedidoDiretoItensExcluidos] = useState<Array<PedidoExluidoItens>>()
    const [novaQuantidade, setNovaQuantidade] = useState("");
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const dateFormat = "DD/MM/YYYY HH:mm:ss";

    const showModal = (value: any) => {
        setIsModalVisible(true)
    };

    const handleCancel = () => {
        setIsModalVisible(false)
    };
    function onchangeNovaQuantidade(value: any) {
        setNovaQuantidade(value)
    };

    useEffect(() => {
        getPedidosExcluidos()
            .then(resultado => {
                setPedidoExcluido(resultado.data.map((row: any) => {
                    return {
                        ...row, key: row.id,
                        filial: row.filial,
                        pedido: row.pedido,
                        sequencial: row.sequencial,
                        codUsuario: row.codUsuario,
                        usuario: row.nomeUsuario,
                        dataHora: moment(row.dataHora).format(dateFormat),
                        motivo: row.motivo
                    }
                }))
                setLoadingTable(false);
            })
            .catch(error => {
                message.error('Erro ao Buscar Dados');
                setLoadingTable(false);
            })
    }, []);

    const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
        confirm();
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
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
            title: 'Filial',
            dataIndex: 'filial',
            key: 'filial',
            align: 'center' as 'center',
            width: '10%',
            ...getColumnSearchProps('pedido'),
        },
        {
            title: 'Pedido',
            dataIndex: 'pedido',
            key: 'pedido',
            align: 'center' as 'center',
            width: '10%',
            ...getColumnSearchProps('pedido'),
        },
        {
            title: 'Sequencial',
            dataIndex: 'sequencial',
            key: 'sequencial',
            align: 'center' as 'center',
            width: '8%',
        },
        {
            title: 'Cod.Usuario',
            dataIndex: 'codUsuario',
            key: 'codUsuario',
            align: 'center' as 'center',
            width: '10%',
        },
        {
            title: 'Usuario',
            dataIndex: 'nome',
            key: 'nome',
            align: 'center' as 'center',
            width: '15%',
        },
        {
            title: 'Data Hora',
            dataIndex: 'dataHora',
            key: 'dataHora',
            align: 'center' as 'center',
            width: '10%',
        },
        {
            title: 'Motivo',
            dataIndex: 'motivo',
            key: 'motivo',
            align: 'center' as 'center',
            width: '15%',
        },
        {
            title: '',
            dataIndex: '',
            key: '',
            align: 'center' as 'center',
            width: '5%',
            render: (text: any, record: any) => (
                <div>
                    <Space size='middle'>
                        <Button
                            onClick={() => exibirProdutos(record)}
                            icon={<SearchOutlined />}
                            style={{ marginRight: 10, border: 'white' }}
                        />
                    </Space>
                </div>
            )

        }
    ]

    const columnsModal = [
       
        {
            title: 'Produto',
            dataIndex: 'produto',
            key: 'produto',
            align: 'center' as 'center',
            width: '10%',
        },
        {
            title: 'Codigo Produto',
            dataIndex: 'codigoProduto',
            key: 'codigoProduto',
            align: 'center' as 'center',
            width: '10%',
            
        },
        {
            title: 'QtdAtentida',
            dataIndex: 'qtdAtendida',
            key: 'qtdAtendida',
            align: 'center' as 'center',
            width: '8%',
        }
    ]


    function exibirProdutos(record: any){
        setIsModalVisible(true)

        getPedidosExcluidosItens(record.pedido, record.sequencial)
        .then(resultado => {
            setPedidoDiretoItensExcluidos(resultado.data.map((row:any) => {
                return{
                    ...row,
                    produto: row.produto,
                    codigoProduto: row.codigoProduto,
                    qtdAtendida: row.qtdAtendida
                };
            } ))
            setLoadingTable(false);
        })
        .catch(error => {
                message.error('Erro ao Buscar o Produto desse Pedido ');
                setLoadingTable(false);
            })
       
    }

   
    return (<>
        <PageHeader></PageHeader>
        <Container>
            <Table style={{ marginTop: 2 + 'em' }}
                columns={columns}
                loading={loadingTable}
                dataSource={pedidoExluido}
                title={() => <div style={{ textAlign: "center", fontSize: 15 }}><b>Pedidos Excluidos</b></div>} />

            <Modal title="Editar Pedido"
                width={500}
                visible={isModalVisible}
                onCancel={handleCancel}>
            </Modal>

            <Modal
                title='Produtos por Pedido'
                width={900}
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={handleCancel}>
                <Table
                    columns={columnsModal}
                    loading={loadingTable}
                    dataSource={pedidoDiretoItensExcluidos}
                >
                </Table>

            </Modal>
        </Container>
    </>)
}
export default RelatorioPedidosExcluidos;


