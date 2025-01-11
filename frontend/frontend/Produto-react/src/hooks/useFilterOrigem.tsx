import { useState, useEffect } from "react";
import { Badge, message } from "antd";
import React from "react";
import moment from "moment";
const sixMonth = moment().subtract(180, 'days');
const today = moment();

const useFilterOrigem = () => {

  const [clearFilterOrigem, setClearFilterOrigem] = useState(false);
  const [checkedTipoPedido, setCheckedTipoPedido] = useState(
    {
      "avulso": false,
      "faltaAvulso": false,
      "sugestao": false,
      "faltaSugestao": false,
      "antecipadoCompra": false,
    });
  const [filterTipoPedido, setFilterTipoPedido] = useState(0);
  const [fornecedores, setFornecedores] = useState<any>([])
  const [filterFornecedores, setFilterFornecedores] = useState(0)
  const [compradores, setCompradores] = useState<any>([])
  const [filterCompradores, setFilterCompradores] = useState(0)
  const [depositos, setDepositos] = useState<any>([])
  const [filterDepositos, setFilterDepositos] = useState(0)
  const [subclassificacao, setSubclassificacao] = useState<any>([])
  const [filterSubclassificacao, setFilterSubclassificacao] = useState(0)
  const [dataPicker, setDataPicker] = useState(today);
  const [dataFimPicker, setDataFimPicker] = useState(today);


  useEffect(
    () => {
      if (clearFilterOrigem) {
        setFilterFornecedores(0);
        setFornecedores([]);

        setFilterCompradores(0);
        setCompradores([]);

        setFilterDepositos(0);
        setDepositos([]);
        setFilterSubclassificacao(0);
        setSubclassificacao([]);
        setFilterTipoPedido(0);
        setCheckedTipoPedido({
          "avulso": false,
          "faltaAvulso": false,
          "sugestao": false,
          "faltaSugestao": false,
          "antecipadoCompra": false,
        });
        setDataPicker(today);
        setDataFimPicker(today);

        setClearFilterOrigem(false);
      }
    },
    [clearFilterOrigem]
  );


  useEffect(
    () => {
      if (1 == 1) {
        console.log("subclassificacao")
        console.log(subclassificacao)

        console.log("compradores")
        console.log(compradores)
      }
    },
    [subclassificacao, compradores]
  );

  const handleCloseFornecedores = (removedTag: any) => {
    const fornecedor = fornecedores.filter((i: any) => i.id !== removedTag);
    setFornecedores(fornecedor);
    setFilterFornecedores(filterFornecedores - 1);
  };

  const handleCloseCompradores = (removedTag: any) => {
    const comprador = compradores.filter((i: any) => i.id !== removedTag);
    setCompradores(comprador);
    setFilterCompradores(filterCompradores - 1);
  };

  const handleCloseDepositos = (removedTag: any) => {
    const deposito = depositos.filter((i: any) => i.id !== removedTag);
    setDepositos(deposito);
    setFilterDepositos(filterDepositos - 1);

  };

  const handleCloseSubClassificacao = (removedTag: any) => {
    const selesubclassificacao = subclassificacao.filter((i: any) => i.id !== removedTag);
    setSubclassificacao(selesubclassificacao);
    setFilterSubclassificacao(filterSubclassificacao - 1);

  };

  const checkedTipoAvulso = (check: boolean) => {
    setCheckedTipoPedido({
      ...checkedTipoPedido,
      "avulso": check
    })
    check ? setFilterTipoPedido(filterTipoPedido + 1) : setFilterTipoPedido(filterTipoPedido - 1)
  }

  const checkedTipoFaltaAvulso = (check: boolean) => {
    setCheckedTipoPedido({
      ...checkedTipoPedido,
      "faltaAvulso": check
    })
    check ? setFilterTipoPedido(filterTipoPedido + 1) : setFilterTipoPedido(filterTipoPedido - 1)
  }

  const checkedTipoSugestao = (check: boolean) => {
    setCheckedTipoPedido({
      ...checkedTipoPedido,
      "sugestao": check
    })
    check ? setFilterTipoPedido(filterTipoPedido + 1) : setFilterTipoPedido(filterTipoPedido - 1)
  }

  const checkedTipoFaltaSugestao = (check: boolean) => {
    setCheckedTipoPedido({
      ...checkedTipoPedido,
      "faltaSugestao": check
    })
    check ? setFilterTipoPedido(filterTipoPedido + 1) : setFilterTipoPedido(filterTipoPedido - 1)
  }

  const checkedTipoAntecipadoCompra = (check: boolean) => {
    setCheckedTipoPedido({
      ...checkedTipoPedido,
      "antecipadoCompra": check
    })
    check ? setFilterTipoPedido(filterTipoPedido + 1) : setFilterTipoPedido(filterTipoPedido - 1)
  }



  const onSelect = (value: any) => {

    let _selecionarTodos = [];

    if (!value.includes("||")) {
      let [codigo, descricao, tipo] = value.toString().split(" ## ")
      let id = codigo.concat(" - ", descricao)
      switch (tipo) {
        case "Fornecedores":
          if (fornecedores.filter((i: any) => i.id === id).length === 0) {
            setFornecedores([{ id: id, descricao: descricao, tipo: tipo }].concat(fornecedores));
            setFilterFornecedores(filterFornecedores + 1);
          }
          break;
        case "Compradores":
          if (compradores.filter((i: any) => i.id === id).length === 0) {
            setCompradores([{ id: id, descricao: descricao, tipo: tipo }].concat(compradores));
            setFilterCompradores(filterCompradores + 1);
          }
          break;
        case "Centros de Distribuição":
          if (depositos.filter((i: any) => i.id === id).length === 0) {
            setDepositos([{ id: id, descricao: descricao, tipo: tipo }].concat(depositos));
            setFilterDepositos(filterDepositos + 1);
          }
          break;
        case "SubClassificação":
          if (subclassificacao.filter((i: any) => i.id === id).length === 0) {
            setSubclassificacao([{ id: id, descricao: descricao, tipo: tipo }].concat(subclassificacao));
            setFilterSubclassificacao(filterSubclassificacao + 1);
          }
          break;
        default:
      }
    } else {

      _selecionarTodos = value.toString().split("||")
      let _countTipo = 0;
      let _tipo: { id: any; descricao: any; tipo: any; }[] = [];

      _selecionarTodos.map((i: any) => {
        let [codigo, descricao, tipo] = i.toString().split(" ## ")
        let id = codigo.concat(" - ", descricao)
        switch (tipo) {
          case "Fornecedores":
            if (fornecedores.filter((i: any) => i.id === id).length === 0) {
              _countTipo += 1
              _tipo.push({ id: id, descricao: descricao, tipo: tipo });
              _countTipo === _selecionarTodos.length && setFornecedores(_tipo.concat(fornecedores));
              _countTipo === _selecionarTodos.length && setFilterFornecedores(filterFornecedores + _countTipo);
            }
            break;
          case "Compradores":
            if (compradores.filter((i: any) => i.id === id).length === 0) {
              _countTipo += 1
              _tipo.push({ id: id, descricao: descricao, tipo: tipo })
              _countTipo === _selecionarTodos.length && setCompradores(_tipo.concat(compradores));
              _countTipo === _selecionarTodos.length && setFilterCompradores(filterCompradores + _countTipo);
            }
            break;
          case "Centros de Distribuição":
            if (depositos.filter((i: any) => i.id === id).length === 0) {
              _countTipo += 1
              _tipo.push({ id: id, descricao: descricao, tipo: tipo })
              _countTipo === _selecionarTodos.length && setDepositos(_tipo.concat(depositos));
              _countTipo === _selecionarTodos.length && setFilterDepositos(filterDepositos + _countTipo);
            }
            break;
          case "SubClassificação":
            if (subclassificacao.filter((i: any) => i.id === id).length === 0) {
              _countTipo += 1
              _tipo.push({ id: id, descricao: descricao, tipo: tipo })
              _countTipo === _selecionarTodos.length && setSubclassificacao(_tipo.concat(subclassificacao));
              _countTipo === _selecionarTodos.length && setFilterSubclassificacao(filterSubclassificacao + _countTipo);
            }
            break;
          default:
        }
        return i;
      })
    }
  }

  const onChangePedido = (value: any, dateString: any) => {
    switch (true) {
      case value === null:
        setDataPicker(sixMonth)
        message.info("filtro de pedidos, maximo de 180 dias")
        break;
      case value.diff(dataFimPicker, 'days') > 0:
        setDataPicker(dataFimPicker)
        message.info("Deve ser menor que a Data Final.")
        break;
      case value !== null:
        setDataPicker(value)
        break;
      default:
    }
  }

  const onChangePedidoDataFim = (value: any, dateString: any) => {
    switch (true) {
      case value === null:
        setDataFimPicker(sixMonth)
        message.info("filtro de pedidos, maximo de 180 dias.")
        break;
      case value.diff(dataPicker, 'days') < 0:
        setDataFimPicker(dataPicker)
        message.info("Deve ser maior que a Data Inicial.")
        break;
      case value !== null:
        setDataFimPicker(value)
        break;
      default:
    }
  }

  const countFilterTipoPedido = () => (<Badge count={filterTipoPedido} />);
  const countFilterDataPedido = () => (<Badge count={1} />);
  const countFilterDataFimPedido = () => (<Badge count={1} />);

  return ({
    countFilterTipoPedido,
    countFilterDataPedido,
    countFilterDataFimPedido,
    onChangePedido,
    onChangePedidoDataFim,
    onSelect,
    checkedTipoAntecipadoCompra,
    checkedTipoFaltaSugestao,
    checkedTipoSugestao,
    checkedTipoFaltaAvulso,
    checkedTipoAvulso,
    handleCloseFornecedores,
    handleCloseCompradores,
    handleCloseDepositos,
    handleCloseSubClassificacao,
    clearFilterOrigem,
    setClearFilterOrigem,
    checkedTipoPedido,
    setCheckedTipoPedido,
    filterTipoPedido,
    setFilterTipoPedido,
    fornecedores,
    setFornecedores,
    filterFornecedores,
    setFilterFornecedores,
    compradores,
    setCompradores,
    filterCompradores,
    setFilterCompradores,
    depositos,
    setDepositos,
    filterDepositos,
    setFilterDepositos,
    setSubclassificacao,
    subclassificacao,
    filterSubclassificacao,
    setFilterSubclassificacao,
    dataPicker,
    setDataPicker,
    dataFimPicker,
    setDataFimPicker,

  });
};

export default useFilterOrigem;