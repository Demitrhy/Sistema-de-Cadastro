import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";
import { ICombineReducers } from "../../../store/rootReducer";
import PageHeader from "../../../components/Layout/Page Header";
import { Container } from "./styles";
import {
  Alert,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Menu,
  message,
  Modal,
  Pagination,
  Popconfirm,
  Radio,
  Row,
  Space,
  Switch,
  Table,
  Tooltip,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  FormOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  TwitterOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getRoles, getUser } from "../../../utils/AuthService";
import {
  getTipoUsuarioPedidoDireto,
  putExcluirPedidoCompleto,
  getDepositos,
  getFiliaisPorDeposito,
  getPedidoDireto,
  getProdutoPedidoDireto,
  postPedidoDireto,
  putExcluirItem,
  postAutorizarPedidoDireto,
  getInformacoesFilial,
  putAprovarANE,
  getPesquisarPedidoDiretoPor,
  postEnviarEmail,
} from "../../../services/apiservices";
import {
  Filial,
  PedDiretoDetEnvioEmailDto,
  PedidoDireto,
  PesquisaParametrosPedidoDireto,
  Produto,
  TipoUsuario,
} from "../../../store/PedidoDireto/PedidoDireto";
import { cancel } from "redux-saga/effects";
import TextArea from "antd/lib/input/TextArea";
import { postVoltarAme } from "./apiService";

export const useSelector: TypedUseSelectorHook<ICombineReducers> = useReduxSelector;

const SolicitarPedido: React.FC = () => {
  const { data } = useSelector((state) => state.autenticacao);
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalEnviarEmailVisible, setIsModalEnviarEmailVisible] = useState(
    false
  );
  const [pedido, setPedido] = useState("");
  const [loadingTable, setLoadingTable] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>();
  const [tipoPedido, setTipoPedido] = useState("M");
  const [filial, setFilial] = useState<Filial>();
  const [novoPedido, setNovoPedido] = useState(false);
  const [pedidoLiberado, setPedidoLiberado] = useState(true);
  const [pedidoLiberadoAne, setPedidoLiberadoAne] = useState(true);
  const [produto, setProduto] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [pedidoDireto, setPedidoDireto] = useState<PedidoDireto>();
  const [pedDiretoDetEnvioEmailDto, setPedDiretoDetEnvioEmailDto] = useState<
    PedDiretoDetEnvioEmailDto
  >();
  const [produtoPedidoDireto, setProdutoPedidoDireto] = useState<Produto>();
  const [solicitante, setSolicitante] = useState("");
  const [pedidoRequisitado, setPedidoRequisitado] = useState(false);
  const [novosItens, setNovosItens] = useState<Array<Produto>>([]);
  const [codigoFilial, setCodigoFilial] = useState("");
  const [permiteAlterarFilial, setPermiteAlterarFilial] = useState(false);
  const inputProduto = useRef<Input>(null);
  const inputFilial = useRef<Input>(null);
  const inputFilialPesquisa = useRef<Input>(null);
  const inputQuantidade = useRef<Input>(null);
  const [dataJuliana, setDataJuliana] = useState(0);
  const [sequencial, setSequencial] = useState(0);
  const [observacao, setObservacao] = useState("");
  const [exibirPesquisa, setExibirPesquisa] = useState(false);
  const [dataSolicitacao, setDataSolicitacao] = useState(null);
  const [filialPesquisa, setFilialPesquisa] = useState("");
  const [
    pesquisaParametrosPedidoDireto,
    setPesquisaParametrosPedidoDireto,
  ] = useState<Array<PesquisaParametrosPedidoDireto>>([]);
  const [somenteNota, setSomenteNota] = useState(false);
  const [aguardando, setAguardando] = useState(false);
  const [usuarioAutorizadoAME, setUsuarioAutorizadoAME] = useState(false);
  const [tblSimples, setTblSimples] = useState(false);
  const [motivoExclusao, setMotivoExclusao] = useState("");
  const [qtdItens, setQtdItens] = useState(0);
  const [alterarFlagFrac, setAlterarFlagFrac] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    setTblSimples(
      !(!getRoles("AUAM")
        ? getRoles("EXIL")
          ? getRoles("AUANE")
          : false
        : true)
    );
    //Verifica se o usuário tem permissão para modificar a flag fracionada
    getRoles("BPFR")? setAlterarFlagFrac(false) : setAlterarFlagFrac(true)
  }, []);

  useLayoutEffect(() => {
    !getRoles("PDSP") && history.push(`${process.env.REACT_APP_PREFIX}/403`);
  }, [data]);


  const columns = [
    {
      title: "Código",
      dataIndex: "codigo",
      key: "codigo",
      align: "center" as "center",
      width: "5%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: <div style={{ color: "black" }}>{text}</div>,
        };
      },
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
      align: "center" as "center",
      width: "20%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: <div style={{ color: "black" }}>{text}</div>,
        };
      },
    },
    {
      title: "Qtde Pedida",
      dataIndex: "qntdPedida",
      key: "qntdPedida",
      align: "center" as "center",
      width: "5%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: <div style={{ color: "black" }}>{text}</div>,
        };
      },
    },
    {
      title: "EA",
      dataIndex: "estoqueAlvo",
      key: "estoqueAlvo",
      align: "center" as "center",
      width: "5%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: <div style={{ color: "black" }}>{text}</div>,
        };
      },
    },
    {
      title: "Estoque Pend. Filial",
      dataIndex: "estoqueTransito",
      key: "estoqueTransito",
      align: "center" as "center",
      width: "5%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: <div style={{ color: "black" }}>{text}</div>,
        };
      },
    },
    {
      title: "Estoque Atual Filial",
      dataIndex: "estoqueAtual",
      key: "estoqueAtual",
      align: "center" as "center",
      width: "5%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: <div style={{ color: "black" }}>{text}</div>,
        };
      },
    },
    {
      title: "Estoque Atual CD",
      dataIndex: "estoqueAtualDeposito",
      key: "estoqueAtualDeposito",
      align: "center" as "center",
      width: "5%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: <div style={{ color: "black" }}>{text}</div>,
        };
      },
    },
    {
      title: "Emb. Exp. CD",
      dataIndex: "embalagemQntd",
      key: "embalagemQntd",
      align: "center" as "center",
      width: "5%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: <div style={{ color: "black" }}>{text}</div>,
        };
      },
    },
    {
      title: "Preço de Venda",
      dataIndex: "precoVenda",
      key: "precoVenda",
      align: "center" as "center",
      width: "5%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: <div style={{ color: "black" }}>{text}</div>,
        };
      },
    },
    {
      title: "Preço Promocional.",
      dataIndex: "precoPromocao",
      key: "precoPromocao",
      align: "center" as "center",
      width: "5%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: <div style={{ color: "black" }}>{text}</div>,
        };
      },
    },
    {
      title: "Vigencia da Ação Prom.",
      children: [
        {
          title: "Início",
          dataIndex: "dataIniPromocStr",
          key: "dataIniPromocStr",
          align: "center" as "center",
          width: "7%",
          render(text, record) {
            return {
              props: {
                style: { background: record.reprovadoAme },
              },
              children: <div style={{ color: "black" }}>{text}</div>,
            };
          },
        },
        {
          title: "Fim",
          dataIndex: "dataFimPromocStr",
          key: "dataFimPromocStr",
          align: "center" as "center",
          width: "7%",
          render(text, record) {
            return {
              props: {
                style: { background: record.reprovadoAme },
              },
              children: <div style={{ color: "black" }}>{text}</div>,
            };
          },
        },
      ],
    },
    {
      title: "Lote",
      dataIndex: "lote",
      key: "lote",
      align: "center" as "center",
      width: "5%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: <div style={{ color: "black" }}>{text}</div>,
        };
      },
    },
    {
      title: "Validade Produto.",
      dataIndex: "dataVencimentoStr",
      key: "dataVencimento",
      align: "center" as "center",
      width: "8%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: <div style={{ color: "black" }}>{text}</div>,
        };
      },
    },
    {
      title: "Endereço de Separação",
      dataIndex: "endereco",
      key: "endereco",
      align: "center" as "center",
      width: "7%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: <div style={{ color: "black" }}>{text}</div>,
        };
      },
    },
    // {
    //   title: 'A/P',
    //   dataIndex: 'ap',
    //   key: 'ap',
    //   align: 'center' as 'center',
    //   width: '5%',
    // },
    {
      title: "Ação",
      key: "action",
      align: "center" as "center",
      width: "5%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: (
            <Space size="middle">
              <Button
                style={{ border: "white", background: record.reprovadoAme }}
                disabled={
                  pedidoLiberado
                    ? true
                    : novoPedido
                      ? false
                      : pedidoRequisitado
                        ? !(qtdItens > 1)
                        : record.temNotaGerada
                          ? true : false
                }
                onClick={() => excluirRegistro(record)}
              >
                <DeleteOutlined />
              </Button>
            </Space>
          ),
        };
      },
    },
  ];

  const columnsTblSimples = [
    {
      title: "Código",
      dataIndex: "codigo",
      key: "codigo",
      align: "center" as "center",
      width: "11%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: <div style={{ color: "black" }}>{text}</div>,
        };
      },
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
      align: "center" as "center",
      width: "11%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: <div style={{ color: "black" }}>{text}</div>,
        };
      },
    },
    {
      title: "Qtde Pedida",
      dataIndex: "qntdPedida",
      key: "qntdPedida",
      align: "center" as "center",
      width: "11%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: <div style={{ color: "black" }}>{text}</div>,
        };
      },
    },
    {
      title: "EA",
      dataIndex: "estoqueAlvo",
      key: "estoqueAlvo",
      align: "center" as "center",
      width: "11%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: <div style={{ color: "black" }}>{text}</div>,
        };
      },
    },
    {
      title: "Estoque Pend. Filial",
      dataIndex: "estoqueTransito",
      key: "estoqueTransito",
      align: "center" as "center",
      width: "11%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: <div style={{ color: "black" }}>{text}</div>,
        };
      },
    },
    {
      title: "Estoque Atual Filial",
      dataIndex: "estoqueAtual",
      key: "estoqueAtual",
      align: "center" as "center",
      width: "11%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: <div style={{ color: "black" }}>{text}</div>,
        };
      },
    },
    {
      title: "Estoque Total Filail",
      dataIndex: "estoqueTotalFilial",
      key: "estoqueTotalFilial",
      align: "center" as "center",
      width: "11%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: <div style={{ color: "black" }}>{text}</div>,
        };
      },
    },
    {
      title: "Estoque Atual CD",
      dataIndex: "estoqueAtualDeposito",
      key: "estoqueAtualDeposito",
      align: "center" as "center",
      width: "11%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: <div style={{ color: "black" }}>{text}</div>,
        };
      },
    },
    {
      title: "Ação",
      key: "action",
      align: "center" as "center",
      width: "11%",
      render(text, record) {
        return {
          props: {
            style: { background: record.reprovadoAme },
          },
          children: (
            <Space size="middle">
              <Button
                style={{ border: "white", background: record.reprovadoAme }}
                disabled={pedidoLiberado ? true : novoPedido ? false : true}
                onClick={() => excluirRegistro(record)}
              >
                <DeleteOutlined />
              </Button>
            </Space>
          ),
        };
      },
    },
  ];

  const columsPesquisa = [
    {
      title: "Pedido",
      dataIndex: "pedido",
      key: "pedido",
      align: "center" as "center",
      width: "30%",
    },
    {
      title: "Código Depósido",
      dataIndex: "codDeposito",
      key: "codDeposito",
      align: "center" as "center",
      width: "20%",
    },
    {
      title: "Filial",
      dataIndex: "codFilial",
      key: "codFilial",
      align: "center" as "center",
      width: "20%",
    },
    {
      title: "Data Cadastro",
      dataIndex: "dataCadastro",
      key: "dataCadastro",
      align: "center" as "center",
      width: "70%",
    },
    {
      title: "Selecionar",
      key: "action",
      align: "center" as "center",
      width: "5%",
      render: (text, record) => (
        <Space size="middle">
          <Button
            style={{ border: "white" }}
            onClick={() => selecionarPedido(record)}
          >
            <FormOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getTipoUsuarioPedidoDireto(getUser())
      .then((usuario) => {
        setTipoUsuario(usuario.data);
      })
      .catch((error) => {
        message.error("Não foi possível resgatar informações de usuário.");
      });
  }, []);

  useEffect(() => {
    if (tipoUsuario) {
      if (tipoUsuario.tipoUsuario == "F" && !getRoles("PDPP")) {
        setPermiteAlterarFilial(false);
        setFilial({
          codigo: tipoUsuario.filial,
          descricao: tipoUsuario.nomeFantasiaFilial,
          depositoPrincipal: tipoUsuario.deposito,
          descricaoDeposito: tipoUsuario.nomeFantasiaDeposito,
        });
      } else setPermiteAlterarFilial(true);

      setCodigoFilial(tipoUsuario.filial.toString());
      setFilial({
        codigo: tipoUsuario.filial,
        descricao: tipoUsuario.nomeFantasiaFilial,
        depositoPrincipal: tipoUsuario.deposito,
        descricaoDeposito: tipoUsuario.nomeFantasiaDeposito,
      });
      setSolicitante(tipoUsuario.nomeUsuario);
    }
  }, [tipoUsuario]);

  useEffect(() => {
    if (getRoles("AUANE") || getRoles("AUAM")) {
      setUsuarioAutorizadoAME(true);
    }
  });

  useEffect(() => {
    if (getRoles("AUANE") || getRoles("AUAM")) {
      setPedidoLiberadoAne(false);
    }
  }, [aguardando]);

  function autorizacaoANE() {
    let pedido = {
      usuario: getUser(),
      codPedido: pedidoDireto?.codPedido,
      sequencial: pedidoDireto?.sequencial,
      somenteNota: pedidoDireto?.somenteNota,
      codFilial: pedidoDireto?.codFilial,
    };

    putAprovarANE(pedido)
      .then((resultado) => {
        mensagemRetorno(
          "Autorizando pedido...",
          "Pedido autorizado com sucesso!"
        );

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        message.error(
          "Ocorreu um erro ao tentar autorizar pedido. Tente novamente!"
        );
      });
  }

  function liberarPedido() {
    let pedido = {
      usuario: getUser(),
      pedido: pedidoDireto?.codPedido,
      sequencial: pedidoDireto?.sequencial,
      codFilial: pedidoDireto?.codFilial,
    };

    postAutorizarPedidoDireto(pedido)
      .then((resultado) => {
        mensagemRetorno("Liberando pedido...", "Pedido liberado com sucesso!");

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        message.error(error.response.data.Message);
        //message.error("Ocorreu um erro ao tentar liberar pedido. Tente novamente!")
      });
  }

  useEffect(() => {
    if (codigoFilial == "") setFilial(undefined);
  }, [codigoFilial]);

  function buscarFilial(e: any) {
    if (e.keyCode == 9 || e.keyCode == 13) {
      getInformacoesFilial(codigoFilial)
        .then((resultado) => {
          if (resultado.data.filialDesativada)
            message.warning("Filial em questão se encontra desativada.");
          else if (resultado.data.pedidoBloqueado)
            message.warning("Filial em questão está com o pedido bloqueado.");
          else {
            setFilial(resultado.data);
            inputProduto.current?.focus();
          }
        });
    }
  }
  function onChangeFilial(filial: any) {
    setCodigoFilial(filial);
    setFilial(undefined);
  }

  function excluirRegistro(value: any) {
    let itensAtuais = [...novosItens];

    var filtered = itensAtuais.filter(function (l) {
      return l.codigoSemDv != value.codigoSemDv;
    });

    if (filtered.length > 0) {
      setNovosItens(
        filtered?.map((row: any) => {
          return {
            ...row,
            key: row.codigoSemDv,
            pedido: row.pedido,
            sequencial: row.sequencial,
            codigo: row.codigo,
            descricao: row.descricao,
            precoVenda: row.precoVenda,
            precoPromocao: row.precoPromocao,
            estoqueFilial: row.estoqueFilial,
            qntdPedida: row.qntdPedida,
            qntdAtendida: row.qntdAtendida,
            lote: row.lote,
            embalagemTP: row.embalagemTP,
            embalagemQntd: row.embalagemQntd,
            dataVencimentoStr: row.dataVencimentoStr,
            dataIniPromocStr: row.dataIniPromocStr,
            dataFimPromocStr: row.dataFimPromocStr,
            ap: row.ap,
            endereco: row.endereco,
            enderecoID: row.enderecoID,
            estoqueAlvo: row.estoqueAlvo,
            estoqueAtual: row.estoqueAtual,
            estoqueTransito: row.estoqueTransito,
          };
        })
      );
    } else setNovosItens([]);

    if (pedidoRequisitado) {
      putExcluirItem(value)
        .then((resultado) => {
          message.success("Item excluído com sucesso!");
        })
        .catch((error) => {
          message.error("Erro ao excluir item do pedido.");
        });
    }
  }

  function selecionarPedido(value: any) {
    onChangePedido(value.pedido);
    handleCancel();
    setFilialPesquisa("");
  }

  function onChangeSomenteNota() {
    setSomenteNota(!somenteNota);
  }

  function onChangeAguardar() {
    setAguardando(!aguardando);
  }

  function onChangeProduto(value: any) {
    let existeProduto =
      pedidoDireto?.itens.find((p) => p.codigo == value) != undefined;

    if (!existeProduto)
      existeProduto = novosItens.find((p) => p.codigo == value) != undefined;

    if (existeProduto) {
      setProduto(0);
      message.warn("O produto informado já existe para o pedido atual.");
    }

    setProduto(value);
  }

  function focusQuantidade(e: any) {
    if (e.keyCode == 13) inputQuantidade.current?.focus();
  }

  function onChangeQuantidade(value: any) {
    setQuantidade(value);
  }

  function onChangeSolicitante(value: any) {
    setSolicitante(value);
  }

  function onChangeObservacao(value: any) {
    setObservacao(value);
  }

  useEffect(() => {
    if (produtoPedidoDireto) {
      let itens = [...novosItens];

      if (pedidoDireto && pedidoRequisitado && novosItens.length == 0)
        itens = pedidoDireto.itens;

      itens.push(produtoPedidoDireto);

      setNovosItens(
        itens?.map((row: any) => {
          return {
            ...row,
            key: row.codigoSemDv,
            pedido: row.pedido,
            sequencial: row.sequencial,
            codigo: row.codigo,
            codigoSemDv: row.codigoSemDv,
            descricao: row.descricao,
            precoVenda: row.precoVenda,
            precoPromocao: row.precoPromocao,
            estoqueFilial: row.estoqueFilial,
            qntdPedida: row.qntdPedida,
            qntdAtendida: row.qntdAtendida,
            lote: row.lote,
            embalagemTP: row.embalagemTP,
            embalagemQntd: row.embalagemQntd,
            dataVencimentoStr: row.dataVencimentoStr,
            dataIniPromocStr: row.dataIniPromocStr,
            dataFimPromocStr: row.dataFimPromocStr,
            ap: row.ap,
            endereco: row.endereco,
            enderecoID: row.enderecoID,
            estoqueAlvo: row.estoqueAlvo,
            estoqueAtual: row.estoqueAtual,
            estoqueTransito: row.estoqueTransito,
          };
        })
      );
    }
  }, [produtoPedidoDireto]);

  useEffect(() => {
    if (pedDiretoDetEnvioEmailDto) {
      setIsModalEnviarEmailVisible(pedDiretoDetEnvioEmailDto.enviarEmail);
    } else {
      setIsModalEnviarEmailVisible(false);
    }
  }, [pedDiretoDetEnvioEmailDto]);

  useEffect(() => {
    if (!pedidoDireto) {
      setPedidoDireto({
        codPedido: 0,
        sequencial: 0,
        cadUsuario: 0,
        codDeposito: filial?.depositoPrincipal,
        nomeFantasiaDeposito: filial?.descricaoDeposito
          ? filial?.descricaoDeposito
          : "",
        codFilial: filial?.codigo,
        nomeFantasiaFilial: filial?.descricao ? filial?.descricao : "",
        dataCadastro: "",
        existeAme: false,
        dataLiberacao: "",
        dataAprovacaoANE: "",
        aguardando: aguardando,
        solicitante: solicitante,
        tipoPedido: tipoPedido,
        itens: novosItens,
        pedidoRequisitado: pedidoRequisitado,
        observacao: observacao,
        somenteNota: somenteNota,
      });
    } else if (pedidoDireto) {
      if (novoPedido || pedidoRequisitado) {
        setPedidoDireto({
          ...pedidoDireto,
          itens: novosItens,
        });
      }
    }
  }, [novosItens]);

  function onChangePedido(value: any) {
    setPedido(value);
    if (value.toString().length >= 8) {
      setLoadingTable(true);
      let dataJuliana = parseInt(value.toString().substring(0, 7));
      let sequencial = parseInt(value.toString().substring(7));

      setDataJuliana(dataJuliana);
      setSequencial(sequencial);

      getPedidoDireto(
        dataJuliana,
        sequencial,
        tipoUsuario?.tipoUsuario,
        codigoFilial
      )
        .then((pedido) => {
          setPedidoDireto({
            codPedido: pedido.data.codPedido,
            sequencial: pedido.data.sequencial,
            codDeposito: pedido.data.codDeposito,
            nomeFantasiaDeposito: pedido.data.nomeFantasiaDeposito,
            codFilial: pedido.data.codFilial,
            nomeFantasiaFilial: pedido.data.nomeFantasiaFilial,
            solicitante: pedido.data.solicitante,
            tipoPedido: pedido.data.tipoPedido,
            cadUsuario: pedido.data.cadUsuario,
            dataCadastro: pedido.data.dataCadastro,
            dataLiberacao: pedido.data.dataLiberacao,
            pedidoRequisitado: true,
            aguardando: pedido.data.aguardando,
            observacao: pedido.data.observacao,
            somenteNota: pedido.data.somenteNota,
            dataAprovacaoANE: pedido.data.dataAprovacaoANE,
            existeAme: pedido.data.existeAme,
            temNotaGerada: pedido.data.temNotaGerada,
            itens: pedido.data.itens.map((item) => {
              return {
                key: item.codigoSemDv,
                pedido: item.pedido,
                sequencial: item.sequencial,
                codigo: item.codigo,
                codigoSemDv: item.codigoSemDv,
                descricao: item.descricao,
                precoVenda: item.precoVenda,
                precoPromocao: item.precoPromocao,
                estoqueFilial: item.estoqueFilial,
                qntdPedida: item.qntdPedida,
                qntdAtendida: item.qntdAtendida,
                lote: item.lote,
                embalagemTP: item.embalagemTP,
                embalagemQntd: item.embalagemQntd,
                dataVencimentoStr: item.dataVencimentoStr,
                dataIniPromocStr: item.dataIniPromocStr,
                dataFimPromocStr: item.dataFimPromocStr,
                ap: item.ap,
                endereco: item.endereco,
                enderecoID: item.enderecoID,
                estoqueAlvo: item.estoqueAlvo,
                estoqueAtual: item.estoqueAtual,
                estoqueTransito: item.estoqueTransito,
                usuarioAutorizadoAME: usuarioAutorizadoAME,
                reprovadoAme: item.reprovadoAme,
                estoqueTotalFilial: item.estoqueTotalFilial,
              };
            }),
          });

          setFilial({
            codigo: pedido.data.codFilial,
            descricao: pedido.data.nomeFantasiaFilial,
            depositoPrincipal: pedido.data.codDeposito,
            descricaoDeposito: pedido.data.nomeFantasiaDeposito,
          });

          setSomenteNota(pedido.data.somenteNota);
          setSolicitante(pedido.data.solicitante);
          setNovosItens(pedido.data.itens);
          setQtdItens(pedido.data.itens.length);
          setLoadingTable(false);
          setPedidoRequisitado(true);
          setObservacao(pedido.data.observacao);

          if (pedido.data.dataLiberacao != null) setPedidoLiberado(true);
          else setPedidoLiberado(false);

          if (pedido.data.dataAprovacaoANE != null) setPedidoLiberadoAne(true);
          else setPedidoLiberadoAne(false);
        })
        .catch((error) => {
          message.error(error.response.data.Message);
          setLoadingTable(false);
          setPedidoDireto(undefined);
        });
    }
  }

  function onChangeTipoPedido(value: any) {
    setTipoPedido(value);
  }

  function onFilialPesquisa(e: any) {
    if (e.keyCode == 13) {
      getPesquisarPedidoDiretoPor({ codFilial: filialPesquisa }).then(
        (result) => {
          setPesquisaParametrosPedidoDireto(result.data);
        }
      );
    }
  }

  function excluirPedidoCompleto() {
    if (pedidoDireto) {
      if (motivoExclusao == "" || motivoExclusao == undefined)
        message.warn(
          "É preciso informar um motivo para concluir a exclusão do pedido."
        );
      else {
        putExcluirPedidoCompleto(pedidoDireto, motivoExclusao).then(
          (resultado) => {
            mensagemRetorno(
              "Excluindo pedido...",
              "Pedido excluído com sucesso!"
            );
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        );
      }
    }
  }

  function mensagemRetorno(mensagem: string, mensagemRetorno: string) {
    const key = "updatable";

    message.loading({ content: mensagem, key });
    setTimeout(() => {
      message.success({ content: mensagemRetorno, key, duration: 2 });
    }, 1000);
  }

  function salvarPedidoDireto() {
    let novoPedido = {};
    if (!pedidoRequisitado) {
      novoPedido = {
        codFilial: filial?.codigo,
        codDeposito: filial?.depositoPrincipal,
        tipoPedido: tipoPedido,
        solicitante: solicitante,
        cadUsuario: getUser(),
        itens: pedidoDireto?.itens,
        observacao: observacao,
        somenteNota: somenteNota,
        usuarioAutorizadoAME: usuarioAutorizadoAME,
        usuarioAME: getRoles("AUAM"),
        usuarioANE: getRoles("AUANE"),
      };
    }

    postPedidoDireto(pedidoRequisitado ? pedidoDireto : novoPedido)
      .then((resultado) => {
        if (resultado.status == 200) {
          if (!pedidoRequisitado)
            mensagemRetorno(
              "Criando pedido...",
              `Pedido ${resultado.data} criado com sucesso!`
            );
          else
            mensagemRetorno(
              "Adicionando itens ao pedido...",
              `Novos itens adicionados ao pedido ${resultado.data} com sucesso!`
            );
          setTimeout(() => {
            onChangePedido(resultado.data);
          }, 2000);
        }
      })
      .catch((error) => {
        error.response.data?.Message != null ?
          message.error(error.response.data?.Message) :
          message.error("Ocorreu um erro ao tentar salvar pedido.");
      });
  }

  function voltarAme() {
    postVoltarAme(pedidoDireto?.codPedido, pedidoDireto?.sequencial)
      .then((resultado) => {
        onChangePedido(
          `${pedidoDireto?.codDeposito}${pedidoDireto?.sequencial}`
        );
        message.success("Pedido liberado novamente para AME aprovar!");
      })
      .catch((error) => {
        message.error(
          "Erro ao tentar liberar pedido para o AME. Tente novamente!"
        );
      });
  }

  function onClickNovoPedido() {
    setNovoPedido(true);
    setPedido("");
    setPedidoRequisitado(false);

    setPedidoDireto(undefined);
    setPedidoLiberado(false);
    setNovosItens([]);

    if (tipoUsuario?.tipoUsuario == "R" || getRoles("PDPP")) {
      setCodigoFilial("");
      setFilial(undefined);
      inputFilial.current?.focus();
    } else {
      inputProduto.current?.focus();
    }
  }

  const handleOk = (e: any) => {
    if (e.keyCode == 13 && quantidade > 0) {
      setIsModalVisible(false);
      setLoadingTable(true);

      let fili = filial?.codigo != 0 ? filial?.codigo : tipoUsuario?.filial;

      if (quantidade > 0 && produto > 0) {
        getProdutoPedidoDireto(
          getUser(),
          fili,
          produto,
          getRoles("AUAM"),
          getRoles("AUANE"),
          quantidade
        )
          .then((prd) => {
            setPedDiretoDetEnvioEmailDto({
              filial: fili,
              deposito: prd.data.deposito,
              codigo: prd.data.codigo,
              estoqueAtualDeposito: prd.data.estoqueAtualDeposito,
              descricao: prd.data.descricao,
              quantidade: quantidade,
              enviarEmail: prd.data.enviarEmail,
            });
            if (prd.data.length == 0) {
              message.warn(
                `Não foram encontradas informações para o produto ${produto}.`
              );
              inputProduto.current?.focus();
            } else if (prd.data.tipoAme != 1 && !getRoles("AUANE")) {
              message.warn({
                title: "Acesso 'AUANE' requerido",
                content: `O produto ${produto} não é AME, você precisa de acesso para solicitar produtos que não são AME.`,
                duration: 5,
              });
            } else {
              if (prd.data.estoqueAtualDeposito == 0) {
                message.warn("O depósito não possui estoque desse produto.");
              } else if (prd.data.estoqueAtualDeposito < quantidade) {
                message.warn({
                  content: `O depósito não possui estoque suficiente para atender esse produto com essa quantidade. A quantidade atual é de ${prd.data.estoqueAtualDeposito}.`,
                  duration: 10,
                });
              } else {
                setProdutoPedidoDireto({
                  pedido: prd.data.pedido,
                  sequencial: prd.data.sequencial,
                  codigo: prd.data.codigo,
                  codigoSemDv: prd.data.codigoSemDv,
                  descricao: prd.data.descricao,
                  deposito: prd.data.deposito,
                  precoVenda: prd.data.precoVenda,
                  precoPromocao: prd.data.precoPromocao,
                  estoqueFilial: prd.data.estoqueFilial,
                  qntdPedida: quantidade,
                  qntdAtendida: prd.data.qntdAtendida,
                  lote: prd.data.lote,
                  embalagemTP: prd.data.embalagemTP,
                  embalagemQntd: prd.data.embalagemQntd,
                  dataVencimentoStr: prd.data.dataVencimentoStr,
                  dataIniPromocStr: prd.data.dataIniPromocStr,
                  dataFimPromocStr: prd.data.dataFimPromocStr,
                  ap: prd.data.ap,
                  endereco: prd.data.endereco,
                  enderecoID: prd.data.enderecoID,
                  estoqueAlvo: prd.data.estoqueAlvo,
                  estoqueAtual: prd.data.estoqueAtual,
                  estoqueTransito: prd.data.estoqueTransito,
                  estoqueAtualDeposito: prd.data.estoqueAtualDeposito,
                  usuarioAutorizadoAME: usuarioAutorizadoAME,
                  estoqueTotalFilial: prd.data.estoqueTotalFilial,
                  enviarEmail: prd.data.enviarEmail,
                  tipoAme: prd.data.tipoAme,
                });
              }
            }
          })
          .catch((error) => {
            message.error(
              "Ocorreu um erro ao tentar resgatar informações do produto."
            );
          })
          .finally(() => {
            setProduto(0);
            setQuantidade(0);
            setLoadingTable(false);
            inputProduto.current?.focus();
          });
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setExibirPesquisa(false);
    setFilialPesquisa("");
  };

  const exibirPesquisaData = () => {
    setExibirPesquisa(true);
  };

  const pesquisaPorData = (date: any) => {
    setDataSolicitacao(date.target.value);
    getPesquisarPedidoDiretoPor({
      dataCadastro: date.target.value,
      codFilial: filialPesquisa,
    }).then((result) => {
      setPesquisaParametrosPedidoDireto(result.data);
    });
  };

  const enviarEmail = () => {
    postEnviarEmail(pedDiretoDetEnvioEmailDto);
    setIsModalEnviarEmailVisible(false);
  };

  const cancelarEnvioEmail = () => {
    setIsModalEnviarEmailVisible(false);
  };

  return (
    <>
      {/* <PageHeader /> */}
      <Container>
        <Row>
          <Button
            type="primary"
            onClick={() => onClickNovoPedido()}
            style={{ marginRight: 10 }}
          >
            Novo pedido
          </Button>

          <Button type="primary" onClick={() => exibirPesquisaData()}>
            Pesquisar Pedidos
          </Button>

          <a
            target="_blank"
            href={`https://relatorios.pmenos.com.br/ReportServer/Pages/ReportViewer.aspx?%2fCosmos%2fLog%C3%ADstica%2fPedidoDireto&rs:Command=Render&Pedido=${dataJuliana}&Sequencial=${sequencial}`}
          >
            <Button
              type="primary"
              style={{ marginLeft: "10px" }}
              disabled={!pedidoRequisitado}
            >
              Imprimir
            </Button>
          </a>

          {pedidoDireto?.temNotaGerada ?
            <></>
            :
            <>
              <Button
                type="primary"
                disabled={
                  pedidoLiberado ||
                  pedidoDireto == undefined ||
                  pedidoDireto.itens.length < 1
                }
                onClick={() => salvarPedidoDireto()}
                icon={<CheckOutlined />}
                style={{ marginLeft: "10px" }}
              >
                Salvar
              </Button>

              {getRoles("PDLB") && (
                <Button
                  type="primary"
                  style={{ marginLeft: "10px" }}
                  onClick={() => liberarPedido()}
                  disabled={!pedidoLiberadoAne || novoPedido}
                >
                  Liberar Expedição
                </Button>
              )}

              <Button
                type="primary"
                onClick={() => autorizacaoANE()}
                disabled={pedidoLiberadoAne || !getRoles("AUANE")}
                style={{ marginLeft: "10px" }}
              >
                Autorizar ANE
              </Button>

              <Popconfirm
                title={
                  <div>
                    Tem certeza que deseja excluir esse pedido?
                    <Input
                      placeholder="Motivo exclusão"
                      style={{ marginTop: "10px" }}
                      value={motivoExclusao}
                      onChange={(e) => setMotivoExclusao(e.target.value)}
                    />
                  </div>
                }
                onConfirm={excluirPedidoCompleto}
                onCancel={cancel}
                okText="Sim"
                cancelText="Não"
              >
                <Button
                  style={{ marginLeft: "10px" }}
                  disabled={
                    !(getUser() == pedidoDireto?.cadUsuario || getRoles("AUANE"))
                  }
                  type="danger"
                >
                  Excluir pedido completo
                </Button>
              </Popconfirm>

              <Button
                style={{ marginLeft: "10px" }}
                disabled={
                  pedidoDireto?.existeAme
                    ? pedidoLiberado || pedidoLiberadoAne
                    : true
                }
                onClick={() => voltarAme()}
                type="danger"
              >
                Voltar AME
              </Button>
            </>
          }
        </Row>

        <Row style={{ marginTop: "1em" }}>
          <Col style={{ marginTop: "15px", marginBottom: 8, width: "7.5em" }}>
            {`Pedido`}
            <Input
              placeholder={`Pedido`}
              disabled={novoPedido}
              onChange={(e) => onChangePedido(e.target.value)}
              autoFocus={!novoPedido}
              value={pedido}
              type="text"
            />
          </Col>

          <Col
            style={{
              marginTop: "15px",
              marginBottom: 8,
              width: "4em",
              marginLeft: "0.5em",
            }}
          >
            {`Filial`}
            <Input
              style={{ width: "5em" }}
              placeholder={"Filial"}
              ref={inputFilial}
              value={codigoFilial}
              disabled={
                !permiteAlterarFilial ||
                pedidoRequisitado ||
                (pedidoDireto && pedidoDireto?.itens.length > 0)
              }
              onChange={(e) => onChangeFilial(e.target.value)}
              onKeyDown={(e) => buscarFilial(e)}
            />
          </Col>
          <Col
            style={{
              marginTop: "15px",
              marginBottom: 8,
              width: "11em",
              marginLeft: "0.5em",
            }}
          >
            <Input
              style={{ marginTop: "22px", width: "17em", color: "black" }}
              value={filial?.descricao}
              disabled={true}
            />
          </Col>

          <Col
            style={{
              marginTop: "15px",
              marginBottom: 8,
              width: "17em",
              marginLeft: 5 + "em",
            }}
          >
            {`Depósito`}
            <Input
              placeholder={"Depósito"}
              style={{ color: "black" }}
              value={filial?.descricaoDeposito}
              disabled={true}
            />
          </Col>

          <Col
            style={{
              marginTop: "15px",
              marginBottom: 8,
              width: "8em",
              marginLeft: 1 + "em",
            }}
          >
            {`Solicitante`}
            <Input
              placeholder={`Solicitante`}
              type="text"
              disabled={true}
              value={solicitante}
              onChange={(e) => onChangeSolicitante(e.target.value)}
            />
          </Col>

          <Col
            style={{
              marginTop: "37px",
              marginBottom: 8,
              width: "16em",
              marginLeft: 1 + "em",
            }}
          >
            <Radio.Group
              buttonStyle="solid"
              defaultValue={tipoPedido}
              disabled={pedidoRequisitado}
              onChange={(e) => onChangeTipoPedido(e.target.value)}
            >
              <Radio.Button disabled = {alterarFlagFrac} value="F">Fracionada</Radio.Button>
              <Radio.Button value="M">Múltipla</Radio.Button>
            </Radio.Group>
          </Col>

          {getRoles("AUANE") ? (
            <Col
              style={{
                marginTop: "31px",
                marginBottom: 8,
                width: "9em",
                marginLeft: "-10px",
              }}
            >
              <Checkbox
                defaultChecked={somenteNota}
                checked={somenteNota}
                disabled={pedidoRequisitado}
                onChange={() => onChangeSomenteNota()}
              >
                Somente nota
              </Checkbox>
              <Checkbox
                style={{ marginLeft: "-1px" }}
                defaultChecked={aguardando}
                checked={aguardando}
                onChange={() => onChangeAguardar()}
              >
                Aguardar
              </Checkbox>
            </Col>
          ) : (
            ""
          )}
        </Row>

        <Row>
          <Col style={{ display: "grid", width: "88em" }}>
            {`Observações`}
            <TextArea
              placeholder={`Observações`}
              value={observacao}
              onChange={(e) => onChangeObservacao(e.target.value)}
            />
          </Col>
        </Row>

        {!pedidoLiberado &&
          filial &&
          parseInt(codigoFilial) == filial.codigo ? (
          <Row style={{ marginTop: "1em" }}>
            <Col style={{ display: "grid" }}>
              {`Informe o produto`}
              <Input
                key="codigo"
                ref={inputProduto}
                style={{ width: "15em" }}
                value={produto > 0 ? produto : ""}
                onChange={(e) => onChangeProduto(e.target.value)}
                onKeyDown={(e) => focusQuantidade(e)}
              />
            </Col>

            <Col style={{ display: "grid", width: "22em", marginLeft: "1em" }}>
              {`Informe a quantidade`}
              <Input
                onKeyDown={(e) => handleOk(e)}
                disabled={produto == 0}
                // style={{ width: '22em', marginLeft: '1em'}}
                value={quantidade > 0 ? quantidade : ""}
                ref={inputQuantidade}
                onChange={(e) => onChangeQuantidade(e.target.value)}
                type="text"
              />
            </Col>
          </Row>
        ) : (
          ""
        )}

        {pedidoRequisitado && pedidoDireto?.temNotaGerada ? (
          <Alert
            style={{ marginTop: "10px", fontWeight: 'bold' }}
            type="error"
            banner
            message={`Pedido direto está em fase de faturamento, não é possível realizar ações com ele.`}
            closable
          />
        ) : ""}

        {pedidoRequisitado && pedidoDireto ? (
          <Alert
            style={{ marginTop: "10px" }}
            message="Linhas vermelhas significam que o produto em questão foi REPROVADO pelo setor AME."
            banner
            closable
          />
        ) : ""}

        <Table
          size="small"
          columns={tblSimples ? columnsTblSimples : columns}
          dataSource={pedidoDireto?.itens}
          loading={loadingTable}
          rowClassName={() => "editable-row"}
          style={{ marginRight: "5px", marginTop: "20px" }}
          title={() => (
            <div style={{ textAlign: "center", fontSize: 16 }}>
              {pedidoDireto &&
                pedidoDireto?.itens.length > 0 &&
                pedidoDireto.codPedido > 0
                ? `Pedido ${pedidoDireto.codPedido}-${pedidoDireto.sequencial}`
                : ""}
              {pedidoDireto &&
                pedidoDireto?.itens.length > 0 &&
                pedidoDireto.dataLiberacao != null &&
                pedidoDireto.dataLiberacao != ""
                ? `, liberado dia ${pedidoDireto.dataLiberacao}`
                : ""}
            </div>
          )}
        />

        <Modal
          title="Adicionar itens ao pedido"
          width={700}
          visible={isModalVisible}
          okButtonProps={{ disabled: quantidade == 0 }}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Row>
            <Alert
              style={{ textAlign: "justify" }}
              message="Se o produto (código + dígito) informado não retornar, é preciso checar se ele foi digitado corretamente e/ou se você tem permissão para pedir produtos que NÃO sejam da categoria AME."
              type="warning"
            />
          </Row>

          <Space direction="horizontal">
            <Row style={{ marginTop: "1em" }}>
              <Col>
                <div style={{ width: "28em" }}>
                  {`Produto: `}
                  <Input
                    key="codigo"
                    value={produto}
                    onChange={(e) => onChangeProduto(e.target.value)}
                    placeholder={"Informe o produto"}
                  />
                </div>
              </Col>

              <Col>
                <div style={{ width: "16.5em", marginLeft: "2em" }}>
                  {`Quantidade: `}
                  <Input
                    id="quantidade"
                    disabled={produto == 0}
                    value={quantidade > 0 ? quantidade : ""}
                    onChange={(e) => onChangeQuantidade(e.target.value)}
                    placeholder={"Informe a quantidade"}
                    type="text"
                  />
                </div>
              </Col>
            </Row>
          </Space>
        </Modal>

        <Modal
          title="Pesquisar Pedidos"
          width={700}
          visible={exibirPesquisa}
          onOk={handleCancel}
          onCancel={handleCancel}
        >
          <Space direction="horizontal">
            <Row>Filial</Row>
            <Row>
              <Col>
                <Input
                  style={{ width: "5em" }}
                  placeholder={"Filial"}
                  ref={inputFilialPesquisa}
                  value={filialPesquisa}
                  onKeyDown={(e) => onFilialPesquisa(e)}
                  onChange={(e) => setFilialPesquisa(e.target.value)}
                />
              </Col>
              <Col>
                <Input
                  value={pesquisaParametrosPedidoDireto[0]?.nomeFantasiaFilial}
                  disabled={true}
                />
              </Col>
            </Row>

            <Row>Data da Solicitação</Row>
            <Row>
              <Input
                style={{ marginBottom: 8 }}
                type="date"
                onChange={(e) => pesquisaPorData(e)}
              />
            </Row>
          </Space>

          <Table
            size="small"
            columns={columsPesquisa}
            dataSource={pesquisaParametrosPedidoDireto}
            loading={loadingTable}
            rowClassName={() => "editable-row"}
            style={{ marginRight: "5px", marginTop: "20px" }}
          />
        </Modal>

        <Modal
          title="Estoque insuficiente"
          visible={isModalEnviarEmailVisible}
          onOk={enviarEmail}
          onCancel={cancelarEnvioEmail}
        >
          <p>
            O depósito não possui estoque suficiente para atender o produto.
          </p>
          <p>Deseja enviar email para o setor do AME?</p>
        </Modal>
      </Container>
    </>
  );
};

export default SolicitarPedido;