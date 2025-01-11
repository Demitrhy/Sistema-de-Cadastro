import { useState, useEffect } from "react";
import useDebounce from "./useDebounce";
import { Badge } from "antd";
import React from "react";

const useFilterFinanceiro = () => {

  const [clearFilterFinanceiro, setClearFilterFinanceiro] = useState(false);
  const [valorPagamento, setValorPagamento] = useState("");
  const [descontoComercial, setDescontoComercial] = useState("");
  const [descontoFinanceiro, setDescontoFinanceiro] = useState("");

  const [checked, setChecked] = useState(
    {
      "bonificacao": false,
      "garantiaDeVenda": false,
      "reposicao": false,
      "repactuado": false,
    });


  const [bonificacao, setBonificacao] = useState("");
  const [garantiaDeVenda, setGarantiaDeVenda] = useState("");
  const [reposicao, setReposicao] = useState("");
  const [repactuado, setRepactuado] = useState("");

  const [faturamento, setFaturamento] = useState("");
  const [vencimento, setVencimento] = useState("");
  const [pagamento, setPagamento] = useState("");
  const debouncedPagamento = useDebounce(pagamento, 500);

  const [rangePicker, setRangePicker] = useState(
    {
      "faturamento": [],
      "vencimento": [],
      "pagamento": "" 
    });

  const [filterValor, setFilterValor] = useState(0);
  const [filterTipoNegociacao, setFilterTipoNegociacao] = useState(0);
  const [filterFaturamento, setFilterFaturamento] = useState(0);


  const onChangeFaturamento = (value: any, dateString: any) => {
    setFaturamento("Periodo de Faturamento: ".concat(dateString.join()))
    setRangePicker({
      ...rangePicker,
      "faturamento": value
    })
  }

  const onChangeVencimento = (value: any, dateString: any) => {
    setVencimento("Periodo de Vencimento: ".concat(dateString.join()))
    setRangePicker({
      ...rangePicker,
      "vencimento": value
    })
  }

  const onChangePagamento = (e: { currentTarget: { value: any; }; }) => {
    const valuePagamento = e.currentTarget.value.replace(/\D+/g,"");
    setPagamento("Prazo de Pagamento: ".concat(valuePagamento.toString()))
    setRangePicker({
      ...rangePicker,
      "pagamento": valuePagamento
    })
  }

  const checkedBonificacao = (check: boolean) => {
    setChecked({
      ...checked,
      "bonificacao": check
    })
    check ? setFilterTipoNegociacao(filterTipoNegociacao + 1) : setFilterTipoNegociacao(filterTipoNegociacao - 1)
    check ? setBonificacao("bonificacao: S") : setBonificacao("")

  }

    const checkedGarantiaDeVenda = (check: boolean) => {
      setChecked({
      ...checked,
      "garantiaDeVenda": check
    })
    check ? setFilterTipoNegociacao(filterTipoNegociacao + 1) : setFilterTipoNegociacao(filterTipoNegociacao - 1)
    check ? setGarantiaDeVenda("garantiaDeVenda: S") : setGarantiaDeVenda("")
  }

    const checkedReposicao = (check: boolean) => {
      setChecked({
      ...checked,
      "reposicao": check
    })
    check ? setFilterTipoNegociacao(filterTipoNegociacao + 1) : setFilterTipoNegociacao(filterTipoNegociacao - 1)
    check ? setReposicao("reposicacao: S") : setReposicao("")
  }

    const checkedRepactuado = (check: boolean) => {
      setChecked({
      ...checked,
      "repactuado": check
    })
    check ? setFilterTipoNegociacao(filterTipoNegociacao + 1) : setFilterTipoNegociacao(filterTipoNegociacao - 1)
    check ? setRepactuado("repactuado: S") : setRepactuado("")
  }


  const countFilterValor  = () => (<Badge count={filterValor} />);
  const countFilterTipoNegociacao  = () => (<Badge count={filterTipoNegociacao} />);
  const countFilterFaturamento  = () => (<Badge count={filterFaturamento} />);

  useEffect(
    () => {
      if (clearFilterFinanceiro) {
        setFilterValor(0);
        setValorPagamento("");
        setDescontoComercial("");
        setDescontoFinanceiro("");

        setFilterTipoNegociacao(0);
        setBonificacao("");
        setGarantiaDeVenda("");
        setReposicao("");
        setRepactuado("");
        setChecked({ 
          "bonificacao": false,
          "garantiaDeVenda": false,
          "reposicao": false,
          "repactuado": false,
        })

        setRangePicker(
          {
            "faturamento": [],
            "vencimento": [],
            "pagamento": "" 
          });
          setFaturamento("");
          setVencimento("");
          setPagamento("");

        setFilterFaturamento(0);


        setClearFilterFinanceiro(false);
      } 
    },
    [clearFilterFinanceiro, setBonificacao, setChecked, setDescontoComercial, setDescontoFinanceiro, setFaturamento, setFilterFaturamento, setFilterTipoNegociacao, setFilterValor, setGarantiaDeVenda, setPagamento, setRangePicker, setRepactuado, setReposicao, setValorPagamento, setVencimento]
  );


  useEffect(
    () => {
          

          let countPagamento = valorPagamento !== "" ? 1 : 0
          let countDescontoComercial = descontoComercial !== "" ? 1 : 0
          let countDescontoFinanceiro = descontoFinanceiro !== "" ? 1 : 0
          setFilterValor(countPagamento + countDescontoComercial + countDescontoFinanceiro)

          let rangeFaturamento = rangePicker.faturamento.length !== 0 ? 1 : 0
          let rangeVencimento = rangePicker.vencimento.length !== 0 ? 1 : 0
          let rangePagamento = rangePicker.pagamento !== "" ? 1 : 0
          setFilterFaturamento(rangeFaturamento + rangeVencimento + rangePagamento)


    },
    [descontoComercial, descontoFinanceiro, rangePicker.faturamento.length, rangePicker.pagamento, rangePicker.vencimento.length, valorPagamento]
  );
    


  return ({
    valorPagamento, 
    setValorPagamento,
    descontoComercial, 
    setDescontoComercial,
    descontoFinanceiro,
    setDescontoFinanceiro,
    bonificacao, 
    setBonificacao,
    garantiaDeVenda,
    setGarantiaDeVenda,
    reposicao,
    setReposicao,
    repactuado,
    setRepactuado,
    faturamento, 
    setFaturamento,
    vencimento,
    setVencimento,
    rangePicker,
    setRangePicker,
    filterValor,
    setFilterValor,
    filterTipoNegociacao,
    setFilterTipoNegociacao,
    filterFaturamento,
    setFilterFaturamento,
    debouncedPagamento,
    setChecked,
    checked,
    setPagamento,
    pagamento,
    clearFilterFinanceiro,
    setClearFilterFinanceiro,

    countFilterValor,
    countFilterTipoNegociacao,
    countFilterFaturamento,
    checkedRepactuado,
    checkedReposicao,
    checkedGarantiaDeVenda,
    checkedBonificacao,
    onChangePagamento,
    onChangeVencimento,
    onChangeFaturamento,

  });
};

export default useFilterFinanceiro;