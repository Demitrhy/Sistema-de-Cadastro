import { CheckCircleOutlined, DownloadOutlined, EyeOutlined, PrinterOutlined, SearchOutlined,IssuesCloseOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Input, Modal, message, Row, Select, Space, Table, Tooltip, Alert, Popover } from 'antd';
import React, { useLayoutEffect, useEffect, useState, useRef } from 'react'
import PageHeader from '../../../components/Layout/Page Header';
import { GeraDadosPedidoDireto, getInformacoesDeposito, getInformacoesFilial, getPedidoDireto, getPedidosDiretoPendentes, postAutorizarPedidoDireto, putAprovarANE } from '../../../services/apiservices';
import { Filial, FiltroStatus, PesquisaParametrosPedidoDireto, Produto, PendenciaPedido, PedidoDiretoPendente, Deposito } from '../../../store/PedidoDireto/PedidoDireto';
import { Container } from './styles';
import { getRoles, getUser } from '../../../utils/AuthService';
import AutorizacaoAME from '../AutorizacaoAME';
const Option = Select.Option;



const StatusPedido: React.FC = () => {
  const [filial, setFilial] = useState<Filial>();
  const [deposito, setDeposito] = useState<Deposito>();
  const [filtros, setFiltros] = useState<FiltroStatus>();
  const [pedidosPendentes, setPedidosPendentes] = useState<Array<PedidoDiretoPendente>>([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pedidoDiretoItens, setPedidoDiretoItens] = useState<Array<Produto>>([]);
  const [showWarning, setShowWarning] = useState(false);

  const columns = [
    {
      title: 'Pedido',
      dataIndex: 'pedido',
      key: 'pedido',
      align: 'center' as 'center',
      width: '13%',
      render(text, record) {
        return {
          props: {
            style: { background: record.corPendencia },
          },
          children: <div style={{ color: 'black' }}>{text}</div>,
        };
      },
    },
    {
      title: 'Filial',
      dataIndex: 'filial',
      key: 'filial',
      align: 'center' as 'center',
      width: '13%',
      render(text, record) {
        return {
          props: {
            style: { background: record.corPendencia },
          },
          children: <div style={{ color: 'black' }}>{text}</div>,
        };
      },
    },
    {
      title: 'Depósito',
      dataIndex: 'deposito',
      key: 'deposito',
      align: 'center' as 'center',
      width: '13%',
      render(text, record) {
        return {
          props: {
            style: { background: record.corPendencia },
          },
          children: <div style={{ color: 'black' }}>{text}</div>,
        };
      },
    },
    {
      title: 'Data cadastro',
      dataIndex: 'dataCadastro',
      key: 'dataCadastro',
      align: 'center' as 'center',
      width: '13%',
      render(text, record) {
        return {
          props: {
            style: { background: record.corPendencia },
          },
          children: <div style={{ color: 'black' }}>{text}</div>,
        };
      },
    },
    {
      title: 'Somente nota',
      dataIndex: 'somenteNotaStr',
      key: 'somenteNotaStr',
      align: 'center' as 'center',
      width: '13%',
      render(text, record) {
        return {
          props: {
            style: { background: record.corPendencia },
          },
          children: <div style={{ color: 'black' }}>{text}</div>,
        };
      },
    },
    {
      title: 'Pendência',
      dataIndex: 'pendencia',
      key: 'pendencia',
      align: 'center' as 'center',
      width: '16%',
      render(text, record) {
        return {
          props: {
            style: { background: record.corPendencia },
          },
          children: <div style={{ color: 'black' }}>{text}</div>,
        };
      },
    },
    {
      title: 'Ações',
      key: 'action',
      align: 'center' as 'center',
      width: '20%',
      render(text, record) {
        const isDisabled = record.status === PendenciaPedido.PendenteAME || record.status === PendenciaPedido.PendenteANE;
        const isPedidoGerado = Boolean(record.pedidoGerou) 
        return {
          props: {
            style: { background: record.corPendencia },
          },
          children:
            <div>
              <a  target={isDisabled ? '' : '_blank'}
               href={isDisabled ? '#' :  `http://olapstg/ReportServer/Pages/ReportViewer.aspx?%2fCosmos%2fLog%C3%ADstica%2fPedidoDireto&rs:Command=Render&Pedido=${record.codigoPedido}&Sequencial=${record.sequencial}`}>
                {/* https://relatorios.pmenos.com.br */}
                <Tooltip placement="top" title="Imprimir pedido direto">
                  <Button
                    type='primary'
                    size="middle"
                    disabled={isDisabled} // Desabilita o botão se estiver com status Pendente AME ou Pendente ANE
                    icon={<PrinterOutlined />} />
                    
                </Tooltip>
              </a>

              <Tooltip placement="top" title="Exibir Produtos">
                <Button
                  onClick={() => exibirProdutos(record)}
                  icon={<EyeOutlined />}
                  style={{ marginLeft: "10px" }} />
              </Tooltip>

              {record.status == PendenciaPedido.PendenteANE ?
                <Tooltip placement="top" title="Liberar ANE">
                  <Button
                    type="primary"
                    disabled={!getRoles("AUANE")}
                    onClick={() => autorizacaoANE(record)}
                    icon={<CheckCircleOutlined />}
                    style={{ marginLeft: "10px", backgroundColor: '#FE967F', borderColor: '#FE967F' }} />
                </Tooltip>
                : ""}

              {record.status == PendenciaPedido.PendenteLiberacaoCD  && (getRoles("PDLB")) ?
              <>
              {!isPedidoGerado ? (
                  <Popover
                    content={<span>Para finalizar o pedido, primeiro gere os dados. Isso liberará a funcionalidade de finalizar o pedido.</span>}
                    placement="bottom"
                  >
                    <Tooltip placement="top" title="Gerar Dados">
                      <Button
                        type='primary'
                        style={{ border: 'white', marginLeft: "10px", backgroundColor: '#000000', borderColor: '#FF4040' }}
                        icon={<FileDoneOutlined />}
                        onClick={() => geraDados(record)}
                      />
                    </Tooltip>
                  </Popover>
                ) : (
                  <Tooltip placement="top" title="Gerar Dados">
                    <Button
                      type='primary'
                      style={{ border: 'white', marginLeft: "10px", backgroundColor: '#000000', borderColor: '#FF4040' }}
                      icon={<FileDoneOutlined />}
                      disabled
                    />
                  </Tooltip>
                )}

                {isPedidoGerado ? (
                  <Popover
                    content={<span>Dados já foram gerados, agora você pode finalizar o pedido.</span>}
                    placement="bottom"
                  >
                    <Tooltip placement="top" title="Liberar Pedido">
                      <Button
                        type='primary'
                        style={{ border: 'white', marginLeft: "10px", backgroundColor: '#FFBE40', borderColor: '#FFBE40' }}
                        icon={<CheckCircleOutlined />}
                        onClick={(e) => liberarPedido(record)}
                      />
                    </Tooltip>
                  </Popover>
                ) : (
                  <Tooltip placement="top" title="Liberar Pedido">
                    <Button
                      type='primary'
                      style={{ border: 'white', marginLeft: "10px", backgroundColor: '#FFBE40', borderColor: '#FFBE40' }}
                      icon={<CheckCircleOutlined />}
                      disabled
                    />
                  </Tooltip>
                )}
              </>
                : ""}
         </div>
        };
      },
    }
  ];

  const columnsModal = [
    {
      title: 'Produto',
      dataIndex: 'codigo',
      key: 'codigo',
      align: 'center' as 'center',
      width: '20%'
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
      align: 'center' as 'center',
      width: '60%'
    },
    {
      title: 'Quantidade',
      dataIndex: 'qntdPedida',
      key: 'qntdPedida',
      align: 'center' as 'center',
      width: '20%'
    }
  ];

  const handleCancel = () => {
    setIsModalVisible(false)
    setPedidoDiretoItens([])
    setShowWarning(false);
  };

  function autorizacaoANE(record: any) {
    let pedido = {
      usuario: getUser(),
      codPedido: record.codigoPedido,
      sequencial: record.sequencial,
      somenteNota: record.somenteNota,
      codFilial: record.filial
    }

    putAprovarANE(pedido)
      .then((resultado) => {
        mensagemRetorno('Autorizando pedido...', 'Pedido autorizado com sucesso!');
        BuscarPendencias()
      })
      .catch((error) => {
        message.error("Ocorreu um erro ao tentar autorizar pedido. Tente novamente!")
      })
  }

  function geraDados(record: any){
    setLoadingTable(true)
    let geraDados = {
      codFilial: record.filial,
      codPedido: record.codigoPedido,
      sequencial: record.sequencial,
      codDeposito: record.deposito,
      usuario: getUser(),
    }

    GeraDadosPedidoDireto(geraDados)
      .then((resultado) => {
        BuscarPendencias(); 
        mensagemRetorno('Gerando dados do pedido...', 'Gerado com sucesso');
      })
      .catch((error) => {
        message.error(error.response.data)
      })
      .finally(() => {
      });
  }

  function exibirProdutos(record: any) {
    setIsModalVisible(true)
    if (record.status === PendenciaPedido.PendenteANE || record.status === PendenciaPedido.PendenteAME) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }

    getPedidoDireto(record.codigoPedido, record.sequencial, 'a', record.filial)
      .then((resultado) => {
        setPedidoDiretoItens(resultado.data?.itens.map((row: any) => {
          return {
            ...row,
            key: row.codigoSemDv,
            codigo: row.codigo,
            descricao: row.descricao,
            qntdPedida: row.qntdPedida
          };
        }))
      })
  }

  function mensagemRetorno(mensagem: string, mensagemRetorno: string) {
    const key = 'updatable';

    message.loading({ content: mensagem, key });
    setTimeout(() => {
      message.success({ content: mensagemRetorno, key, duration: 2 });
    }, 1000);
  }

  function liberarPedido(record: any) {
    let pedido = {
      usuario: getUser(),
      pedido: record.codigoPedido,
      sequencial: record.sequencial,
      codFilial: record.filial
    }

    postAutorizarPedidoDireto(pedido)
      .then((resultado) => {
        mensagemRetorno('Liberando pedido...', 'Pedido liberado com sucesso!');
        BuscarPendencias()
      })
      .catch((error) => {
        message.error(error.response.data.Message)
      })
  }

  function onChangeDeposito(value: any) {
    setFiltros({ ...filtros, codDeposito: value })

    if (value != "") {
      getInformacoesDeposito(value)
        .then((resultado) => {
          setDeposito(resultado.data);
        })
        .catch((error) => {
          message.error("Ocorreu um erro ao tentar resgatar o depósito. Tente novamente.")
        })
    }
    else {
      setDeposito(undefined)
    }
  }

  useEffect(() => {
  }, [deposito])


  function onChangeFilial(value: any) {
    setFiltros({ ...filtros, codFilial: value })

    if (value != "") {
      getInformacoesFilial(value)
        .then((resultado) => {
          setFilial(resultado.data);
        })
        .catch((error) => {
          message.error("Ocorreu um erro ao tentar resgatar filial. Tente novamente.")
        })
    }
    else {
      setFilial(undefined)
    }
  }


  function onChangeData(value: any) {
    setFiltros({ ...filtros, dataCadastro: value })
  }
  function onChangeStatus(value: any) {
    if (value) {
      let statusSelecionados: PendenciaPedido[] = [];

      value?.map((row: any) => {
        statusSelecionados.push(row.value);
      })

      setFiltros({ ...filtros, status: statusSelecionados })
    }
  }

  function BuscarPendencias() {
    setLoadingTable(true);

    getPedidosDiretoPendentes(filtros)
      .then((resultado) => {
        
        if (resultado.data.length == 0) {
          message.warn("Não foram encontrados pedidos pendentes com os parâmetros informados.")
          setPedidosPendentes([])
        }
        else {
          setPedidosPendentes(resultado.data?.map((row: any) => {
            return {
              ...row,
              key: row.pedido,
              pedido: row.pedido,
              codigoPedido: row.codigoPedido,
              sequencial: row.sequencial,
              filial: row.filial,
              pendencia: row.pendencia,
              status: row.status,
              somenteNota: row.somenteNota,
              somenteNotaStr: row.somenteNota == 0 ? 'Não' : 'Sim',
              corPendencia: row.corPendencia,
              pedidoGerou: !!row.pedidoGerou 
            };
          }))
        }
      }).catch((error) => {
        message.error("Ocorreu um erro ao tentar buscar pedidos pendentes. Tente novamente.")
      }).finally(() => {
        setLoadingTable(false);
      })

  }

  return (

    <>
      <PageHeader></PageHeader>
      <Container>
        <Space direction="horizontal">
          <Row style={{ marginTop: '1em' }}>
            <Col style={{ display: 'grid' }}>
              {`Filial`}
              <Input style={{ width: "4em" }}
                placeholder={"Filial"}
                onChange={(e) => onChangeFilial(e.target.value)}
                value={filtros?.codFilial} />
            </Col>
            <Col style={{ marginTop: "22px" }}>
              <Input
                value={filial?.descricao}
                disabled={true} />
            </Col>
          </Row>

          <Row style={{ marginTop: '1em' }}>
            <Col style={{ display: 'grid' }}>
              {`Depósito`}
              <Input style={{ width: "4em" }}
                placeholder={"Depósito"}
                onChange={(e) => onChangeDeposito(e.target.value)}
                value={filtros?.codDeposito} />
            </Col>
            <Col style={{ marginTop: "22px" }}>
              <Input
                value={deposito?.descricao}
                disabled={true} />
            </Col>
          </Row>

          <Row style={{ marginTop: '1em' }}>
            <Col style={{ display: 'grid' }}>
              {`Data da solicitação`}
              <Input type="date"
                onChange={(data) => onChangeData(data.target.value)} />

            </Col>
          </Row>

          <Row style={{ marginTop: '1em' }}>
            <Col style={{ display: 'grid' }}>
              {`Status`}
              <Select
                style={{ width: 500 }}
                mode="multiple"
                onChange={(value) => onChangeStatus(value)}
                labelInValue
                placeholder={"Selecione as pendências"}
                tokenSeparators={[" ", ","]}>
                <Option value={PendenciaPedido.PendenteAME}>Pendente AME</Option>
                <Option value={PendenciaPedido.PendenteANE}>Pendente ANE</Option>
                <Option value={PendenciaPedido.PendenteLote}>Pendente lotes</Option>
                <Option value={PendenciaPedido.PendenteLiberacaoCD}>Pendente liberação CD</Option>
                <Option value={PendenciaPedido.Finalizado}>Finalizado</Option>

              </Select>
            </Col>
          </Row>

          <Row style={{ marginTop: '2.5em' }}>
            <Col style={{ display: 'grid' }}>
              <Button
                type='primary'
                onClick={() => BuscarPendencias()}
                icon={<SearchOutlined />} />
            </Col>
          </Row>
        </Space>

        <Table style={{ marginTop: '1em' }}
          columns={columns}
          loading={loadingTable}
          dataSource={pedidosPendentes} title={() =>
            <div style={{ textAlign: "center", fontSize: 16 }}>
              Status pedidos diretos
            </div>}
        />

        <Modal title="Produtos por Pedido"
          visible={isModalVisible}
          onOk={handleCancel}
          onCancel={handleCancel}
          width={600}
          >
              {showWarning && (
            <Alert
              message="Apenas Para consulta. Solicitação de pedido direto pendente de autorização"
              type="warning"
              style={{ marginBottom: 16, backgroundColor: '#FFF4E5', color: '#8B4500', fontWeight: 'bold' }}
            />
          )}

          <Table style={{ marginTop: '1em' }}
            columns={columnsModal}
            loading={loadingTable}
            dataSource={pedidoDiretoItens}
          />
        </Modal>
      </Container>
    </>
  )
}

export default StatusPedido;