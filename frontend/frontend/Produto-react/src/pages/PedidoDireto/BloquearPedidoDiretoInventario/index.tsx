import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";
import { ICombineReducers } from "../../../store/rootReducer";
import PageHeader from "../../../components/Layout/Page Header";
import { Container } from "./styles";

import { getRoles, getUser } from "../../../utils/AuthService";
import { Button, Col, Input, Row, Select, Table, message } from "antd";
import { getDepositos } from "../../../services/apiservices";
import { Deposito, DepositoBloqueadoInventario } from "../../../store/PedidoDireto/PedidoDireto";
import { CloseCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { getDepositosBloqueadosPorInventario, postBloquearDepositos, postDeletarBloqueioInventario } from "./apiService";
const Option = Select.Option;

export const useSelector: TypedUseSelectorHook<ICombineReducers> = useReduxSelector;

const BloquearPedidoDiretoInventario: React.FC = () => {
  const { data } = useSelector((state) => state.autenticacao);
  const history = useHistory();
  const [depositos, setDepositos] = useState<Array<Deposito>>([]);
  const [bloqueados, setBloqueados] = useState<Array<DepositoBloqueadoInventario>>([]);
  const [selecionados, setSelecionados] = useState<Array<number>>([]);
  const [loading, setLoading] = useState(false);
  const matriculaLiberada = 62243;

  useEffect(() => {
    obterDepositosBloqueados();
  }, [])

  useEffect(() => {
    obterDepositos();
  }, [bloqueados])

  function obterDepositos() {
    getDepositos()
      .then((depositos) => {
        const d = depositos.data.filter(function (deposito) {
          return !bloqueados.some(function (bloqueado) {
            return deposito.codigo == bloqueado.deposito;
          });
        });
        setDepositos(d)
      }).catch((error) => {
        message.error("Ocorreu um erro ao tentar listar depósitos. Favor, recarregue a página.")
      })
  }

  function obterDepositosBloqueados() {
    setLoading(true);

    getDepositosBloqueadosPorInventario()
      .then((depositos) => {
        setBloqueados(depositos.data)
      }).catch((error) => {
        message.error("Um erro ocorreu ao tentar resgatar depósitos já bloqueados. Favor, recarregue a página.")
      })
      .finally(() => {
        setLoading(false);
      })
  }

  // useLayoutEffect(() => {
  //   !(getUser() == matriculaLiberada) && history.push(`${process.env.REACT_APP_PREFIX}/403`);
  // }, [data]);

  const columns = [
    {
      title: 'Depósito',
      dataIndex: 'depositoDescricao',
      key: 'depositoDescricao',
      align: 'center' as 'center',
      width: '30%',
    },
    {
      title: 'Data cadastro',
      dataIndex: 'dataCadastro',
      key: 'dataCadastro',
      align: 'center' as 'center',
      width: '20%',
    },
    {
      title: 'Usuário que cadastrou',
      dataIndex: 'usuarioCadastro',
      key: 'usuarioCadastro',
      align: 'center' as 'center',
      width: '20%',
    },
    {
      title: '',
      key: 'action',
      align: 'center' as 'center',
      width: '10%',
      render: (text, record) => (
        <div>
          <Button
            type="link"
            style={{ color: 'red' }}
            onClick={() => deletarBloqueioInventario(record.deposito)}
            icon={<DeleteOutlined />} />
        </div>
      )
    }
  ];

  function onChangeDepositos(value: any) {
    if (value) {
      let depositosSelecionados: number[] = [];

      value?.map((row: any) => {
        depositosSelecionados.push(
          row.value
        );
      });

      setSelecionados(depositosSelecionados);
    }
  }

  function deletarBloqueioInventario(deposito: number) {
    setLoading(true);

    postDeletarBloqueioInventario(deposito)
    .then((resultado) => {
      message.success("Bloqueio de inventário removido com sucesso!");
      obterDepositosBloqueados();
    })
    .catch((error) => {
      message.error("Ocorreu um erro ao tentar deletar bloqueio de inventário. Favor, tente novamente.");
    })
    .finally(() => {
      setLoading(false);
    })
  }

  function bloquearDepositos() {
    postBloquearDepositos(selecionados, getUser())
      .then((resultado) => {
        message.success("Depósito foi bloqueado com sucesso!")
        setSelecionados([]);
      })
      .catch((error) => {
        message.error("Ocorreu um erro ao tentar bloquear depósito. Favor, tente novamente.")
      })
      .finally(() => {
        obterDepositosBloqueados();
      })
  }

  return (
    <>
      <PageHeader />
      <Container>
        <Row>
          <Col style={{ display: 'grid' }}>
            {`Depósito(s)`}
            <Select
              style={{ width: 1060 }}
              mode="multiple"
              onChange={(value) => onChangeDepositos(value)}
              labelInValue
              placeholder={"Selecione depósito(s)"}
              tokenSeparators={[" ", ","]}>
              {
                depositos?.map((d: Deposito) => {
                  return <Option value={d.codigo}>{d.descricao}</Option>
                })
              }
            </Select>
          </Col>
          <Col>
            <Button
              icon={<CloseCircleOutlined />}
              onClick={bloquearDepositos}
              style={{ marginLeft: '1em', marginTop: '1.5em' }}
              type="primary">
              Bloquear
            </Button>
          </Col>
        </Row>

        <Table
          style={{ marginTop: '2em' }}
          columns={columns}
          loading={loading}
          dataSource={bloqueados}
        />
      </Container >
    </>
  );
};

export default BloquearPedidoDiretoInventario;