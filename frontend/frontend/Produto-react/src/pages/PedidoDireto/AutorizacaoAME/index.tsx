import React, { useEffect, useLayoutEffect, useState } from 'react'
import { CheckCircleOutlined, CheckOutlined, CloseOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, message, Modal, Row, Space } from 'antd';
import Table from 'antd/lib/table';
import { getRoles, getUser } from "../../../utils/AuthService";
import PageHeader from '../../../components/Layout/Page Header';
import { Container } from './styles';
import {
    TypedUseSelectorHook,
    useSelector as useReduxSelector,
} from 'react-redux';
import { useHistory } from "react-router";
import { ICombineReducers } from '../../../store/rootReducer';
import { PedidoDiretoAprovacaoAme } from '../../../store/PedidoDireto/PedidoDireto';
import { getPedidosAutorizacaoAME, putEitarQuantidadeAME, putPedidosAutorizacaoAME, putPedidosReprovarAME } from './apiService';
import Highlighter from 'react-highlight-words';
import moment from 'moment';

export const useSelector: TypedUseSelectorHook<ICombineReducers> = useReduxSelector;

const AutorizacaoAME: React.FC = (props: any) => {
    const [row, setRow] = useState<PedidoDiretoAprovacaoAme>();
    const { data } = useSelector(state => state.autenticacao)
    const history = useHistory();
    const [loadingTable, setLoadingTable] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pedidosDiretoAprovacao, setPedidosDiretoAprovacao] = useState<Array<PedidoDiretoAprovacaoAme>>()
    const [novaQuantidade, setNovaQuantidade] = useState("");
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const dateFormat = "DD/MM/YYYY HH:mm:ss";

    const showModal = (value: any) => {
        setRow(value)
        setIsModalVisible(true)
    };

    const handleCancel = () => {
        setIsModalVisible(false)
    };

    useEffect(() => {
        getPedidosAutorizacaoAME()
            .then(resultado => {
                setPedidosDiretoAprovacao(resultado.data.map((row: any) => {
                    return {
                        ...row, key: row.id,
                        codDeposito: row.codDeposito,
                        pedido: `${row.codPedido}-${row.sequencial}`,
                        codFilial: row.codFilial,
                        solicitante: row.solicitante,
                        produto: `[${row.codProduto}] ${row.descricaoProduto}`,
                        quantPedida: row.quantPedida,
                        dataCadastro: moment(row.dataCadastro).format(dateFormat),
                        usuario: getUser()
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
            dataIndex: 'codDeposito',
            key: 'codDeposito',
            align: 'center' as 'center',
            width: '5%',
            ...getColumnSearchProps('codDeposito'),
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
            title: 'Código filial',
            dataIndex: 'codFilial',
            key: 'codFilial',
            align: 'center' as 'center',
            width: '8%',
            ...getColumnSearchProps('codFilial'),
        },
        {
            title: 'Data Solicitação',
            dataIndex: 'dataCadastro',
            key: 'dataCadastro',
            align: 'center' as 'center',
            width: '10%',
        },
        {
            title: 'Solicitante',
            dataIndex: 'solicitante',
            key: 'solicitante',
            align: 'center' as 'center',
            width: '8%',
        },
        {
            title: 'Produto',
            dataIndex: 'produto',
            key: 'produto',
            align: 'center' as 'center',
            width: '25%',
        },
        {
            title: 'Quantidade pedida',
            dataIndex: 'quantPedida',
            key: 'quantPedida',
            align: 'center' as 'center',
            width: '8%',
        },
        {
            title: 'Editar quantidade',
            dataIndex: '',
            key: 'x',
            align: 'center' as 'center',
            width: '10%',
            render: (text: any, record: any) => (
                <div>
                    <Space size="middle">
                        <Button
                            onClick={() => showModal(record)}
                            icon={<EditOutlined />}
                            disabled={!getRoles("AUAM")}
                            style={{ marginRight: 10, border: 'white' }}
                        />
                    </Space>
                </div>
            )
        },
        {
            title: 'Aprovar AME',
            dataIndex: '',
            key: 'x',
            align: 'center' as 'center',
            width: '10%',
            render: (text: any, record: any) => (
                <div>
                    <Space size="middle">
                        <Button type="primary"
                            onClick={() => {
                                AutorizarAME(record);
                            }}
                            icon={<CheckOutlined />}
                            disabled={!getRoles("AUAM")}
                            style={{ marginRight: 10 }}
                        />
                    </Space>
                </div>
            )
        },
        {
            title: 'Reprovar AME',
            dataIndex: '',
            key: 'x',
            align: 'center' as 'center',
            width: '10%',
            render: (text: any, record: any) => (
                <div>
                    <Space size="middle">
                        <Button type="danger"
                            onClick={() => {
                                ReprovarAME(record);
                            }}
                            icon={<CloseOutlined />}
                            disabled={!getRoles("AUAM")}
                            style={{ marginRight: 10 }}
                        />
                    </Space>
                </div>
            )
        }
    ]

    function AutorizarAME(value: any) {
        const key = 'updatable';
        putPedidosAutorizacaoAME(value)
            .then((resultado) => {
                if (resultado.data.length == 0) {
                    message.success({ content: 'Autorização feita com sucesso!', key, duration: 2 })
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
                else {
                    message.error({ content: "Autorização retornou erros.", key, duration: 2 });
                }
            })
            .catch((error) => {
                message.error("Erro ao solicitar aprovação AME. ");
            })
    }

    function ReprovarAME(value: any) {
        const key = 'updatable';
        putPedidosReprovarAME(value)
            .then((resultado) => {
                if (resultado.data.length == 0) {
                    message.success({ content: 'Reprovado com sucesso!', key, duration: 2 })
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
                else {
                    message.error({ content: "Reprovação retornou erros.", key, duration: 2 });
                }
            })
            .catch((error) => {
                message.error("Erro ao solicitar reprovação AME. ");
            })
    }

    function EditarQuantidadeAME(value: any) {
        let edicao = {
            id: value?.id,
            codPedido: value?.codPedido,
            sequencial: value?.sequencial,
            codProduto: value?.codProduto,
            quantPedida: novaQuantidade,
        }
        const key = 'updatable';
        putEitarQuantidadeAME(edicao)
            .then((resultado) => {
                if (resultado.data.length == 0) {
                    message.success({ content: 'Quantidade editada com sucesso!', key, duration: 2 })
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
                else {
                    message.error({ content: "Edição retornou erros.", key, duration: 2 });
                }
            })
            .catch((error) => {
                message.error("Erro ao editar AME. ");
            })
    }

    function onchangeNovaQuantidade(value: any) {
        setNovaQuantidade(value)
    }

    return (<>
        <PageHeader></PageHeader>
        <Container>
            <Table style={{ marginTop: 2 + 'em' }}
                columns={columns}
                loading={loadingTable}
                dataSource={pedidosDiretoAprovacao}
                title={() => <div style={{ textAlign: "center", fontSize: 15 }}><b>Produtos sem Autorização</b></div>} />

            <Modal title="Editar Pedido"
                width={500}
                visible={isModalVisible}
                onOk={() => EditarQuantidadeAME(row)}
                onCancel={handleCancel}>
                <Space direction="horizontal" >
                    <Row>
                        <Col>
                            {`Produto`}
                            <Input
                                title='Produto'
                                disabled={true}
                                value={row?.produto}
                            />

                            {`Quantidade`}
                            <Input
                                defaultValue={row?.quantPedida} onChange={(e) => onchangeNovaQuantidade(e.target.value)}></Input>
                        </Col>
                    </Row>

                </Space>
            </Modal>
        </Container>
    </>)
}
export default AutorizacaoAME;


