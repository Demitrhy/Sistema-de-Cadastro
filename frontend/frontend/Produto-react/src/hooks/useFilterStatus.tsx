import { useState, useEffect } from "react";
import { Badge } from "antd";
import React from "react";

const useFilterStatus = () => {

  const [clearFilterStatus, setClearFilterStatus] = useState(false);
  const [checkedStatus, setCheckedStatus] = useState(
    {
      "aberto": false,
      "fechado": false,
      "pendente": false,
      "cancelado": false,
      "encerrado": false,
    });

  const [checkedAnalisador, setCheckedAnalisador] = useState(
    {
      "analisador": "pendente-analise-automatica"
    });

  const [envioEmMassa, setEnvioEmMassa] = useState(0); 

  const [filterSituacao, setFilterSituacao] = useState(0);
  const [filterAnaliseAutomatica, setFilterAnaliseAutomatica] = useState(0);
  const [filterEnvioEmMassa, setFilterEnvioEmMassa] = useState(0);

  useEffect(
    () => {
      if (clearFilterStatus) {
        setFilterSituacao(0);
        setCheckedStatus({
          "aberto": false,
          "fechado": false,
          "pendente": false,
          "cancelado": false,
          "encerrado": false,
        });
        setFilterAnaliseAutomatica(0);
        setCheckedAnalisador({
          "analisador": "pendente-analise-automatica"
        });
        setEnvioEmMassa(0);
        setFilterEnvioEmMassa(0);

        setClearFilterStatus(false);
      } 
    },
    [clearFilterStatus]
  );


  const checkedStatusAberto = (check: boolean) => {
    setCheckedStatus({
      ...checkedStatus,
      "aberto": check
    })
    check ? setFilterSituacao(filterSituacao + 1) : setFilterSituacao(filterSituacao - 1)

  }

  const checkedStatusFechado = (check: boolean) => {
      setCheckedStatus({
      ...checkedStatus,
      "fechado": check
    })
    check ? setFilterSituacao(filterSituacao + 1) : setFilterSituacao(filterSituacao - 1)
  }

  const checkedStatusPendente = (check: boolean) => {
      setCheckedStatus({
      ...checkedStatus,
      "pendente": check
    })
    check ? setFilterSituacao(filterSituacao + 1) : setFilterSituacao(filterSituacao - 1)
  }

  const checkedStatusCancelado = (check: boolean) => {
      setCheckedStatus({
      ...checkedStatus,
      "cancelado": check
    })
    check ? setFilterSituacao(filterSituacao + 1) : setFilterSituacao(filterSituacao - 1)
  }

  const checkedStatusEncerrado = (check: boolean) => {
    setCheckedStatus({
    ...checkedStatus,
    "encerrado": check
  })
  check ? setFilterSituacao(filterSituacao + 1) : setFilterSituacao(filterSituacao - 1)
  }

  const onChangeAnalisador = (e: any) => {
    const value = e.target.value
    setCheckedAnalisador({
      ...checkedAnalisador,
      "analisador": value
    })
    value !== "pendente-analise-automatica" ? setFilterAnaliseAutomatica(1) : setFilterAnaliseAutomatica(0)
  } 


  const onChangeStatus = (current: any) => {
    setEnvioEmMassa( current );
    current !== 0 ? setFilterEnvioEmMassa(1) : setFilterEnvioEmMassa(0)
  };

  const countFilterSituacao  = () => (<Badge count={filterSituacao} />);
  const countFilterAnalisador  = () => (<Badge count={filterAnaliseAutomatica} />);
  const countFilterEnvioEmMassa  = () => (<Badge count={filterEnvioEmMassa} />);


  return ({
    countFilterSituacao,
    countFilterAnalisador,
    countFilterEnvioEmMassa,
    onChangeStatus,
    onChangeAnalisador,
    checkedStatusCancelado,
    checkedStatusEncerrado,
    checkedStatusPendente,
    checkedStatusFechado,
    checkedStatusAberto,
    clearFilterStatus, 
    setClearFilterStatus,
    checkedStatus, 
    setCheckedStatus,
    checkedAnalisador, 
    setCheckedAnalisador,
    envioEmMassa, 
    setEnvioEmMassa,
    filterSituacao, 
    setFilterSituacao,
    filterAnaliseAutomatica, 
    setFilterAnaliseAutomatica,
    filterEnvioEmMassa, 
    setFilterEnvioEmMassa,
  });
};

export default useFilterStatus;