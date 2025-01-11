import React, { useEffect, useRef, useState } from 'react';
import { SheetJSFT } from '../../utils/TypesExcel'
import * as XLSX from 'xlsx'
import { message } from 'antd';

// import { ExcelInput } from './styles';

export interface ExcelReaderProps {
  onRead: (data: any) => any;
  onAtivacaoMassa?: boolean;
  onPedidoDiretoEmMassa?: boolean;
  // file?: {};
  // data?: [];
  setFileName?: (data: any) => any;
  reloadInput?: boolean;
}
export const ExcelReader: React.FC<ExcelReaderProps> = ({
  onRead,
  setFileName,
  onAtivacaoMassa,
  onPedidoDiretoEmMassa,
  reloadInput
}: ExcelReaderProps) => {
  const [file, setFile] = useState<any>({});
  const [data, setData] = useState<any>([]);
  const inputRef = useRef<any>(null);
  
  useEffect(() => {
    if(file.name != "" && file.name != undefined && onPedidoDiretoEmMassa){
      message.warning("Validando planilha... Aguarde!")
    }
  }, [onPedidoDiretoEmMassa, file])

  useEffect(() => {
    inputRef.current.value = null;
  }, [reloadInput])

  const importarCSV = () => {
    if (file) {
      if ((file.constructor === Object) == false) {
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = function (e: any) {
          if (e.target) {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, {
              type: rABS ? "binary" : "array",
              bookVBA: true
            });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            if (wsname == "Tabela de Preços" || wsname == "Tabela Preço" || wsname == "Tabela Preços" || wsname == "Tabela Preço" || wsname == "Tabela de Precos" || wsname == "Tabela de Preco" || wsname == "Tabela Precos" || wsname == "Tabela Preco") {
              ws['A1'].w = "CNPJ";
              ws['B1'].w = "UFDESTINO";
              ws['C1'].w = "REGIAO";
              ws['D1'].w = "EAN";
              ws['E1'].w = "NCM";
              ws['F1'].w = "DESCRICAOPRODUTO";
              ws['G1'].w = "PRECO";
              ws['H1'].w = "DESCONTO";
              ws['I1'].w = "ICMS";
              ws['J1'].w = "PAUTA";
              ws['K1'].w = "MVA";
              ws['L1'].w = "QCOM";
              ws['M1'].w = "CST";
              ws['N1'].w = "ALIQUOTAIPI";
              ws['O1'].w = "FCP";
              ws['P1'].w = "SGEMBALAGEM";
            }

            if (onAtivacaoMassa) {
              ws['A1'].w = "filial";
              ws['B1'].w = "produto";
              ws['F1'].w = "ea";
              ws['G1'].w = "motivo";
              ws['H1'].w = "matricula";
            }

            const excel = XLSX.utils.sheet_to_json(ws, { raw: false });
            setData(excel)
          }
        };
        if (rABS) {
          reader.readAsBinaryString(file);
        } else {
          reader.readAsArrayBuffer(file);
        }

        reader.onerror = function (evt) {
          if (evt.target != null) {
            if (evt.target.error != null) {
              if (evt.target.error.name === "NotReadableError") {
                message.error("Erro ao buscar arquivo!")
              }
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    importarCSV();
  }, [file]);

  useEffect(() => {
    onRead(data);
    if (!!setFileName)
      setFileName(file.name);
  }, [data]);

  return (
    <input
      type="file"
      className="form-control"
      id="input-file"
      accept={SheetJSFT}
      onChange={(event: any) => setFile(inputRef.current.files[0])}
      ref={inputRef}
    />
  );

}

export default ExcelReader;