import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface Produto {
  produto: string;
  categoria: string;
  descricao: string;
}

export function App() {
  const [planilha, setPlanilha] = useState<Array<Produto>>([]);

  const baixarModelo = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([], {
      header: ['produto', 'categoria', 'descricao'],
    });
    XLSX.utils.book_append_sheet(wb, ws, 'Modelo');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'modelo_produto.xlsx');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: Produto[] = XLSX.utils.sheet_to_json(worksheet);
      setPlanilha(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div
      style={{
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        padding: '40px',
        fontFamily: 'sans-serif',
      }}
    >
      <h2 style={{ color: '#333' }}>Cadastro de Produto</h2>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
        <button
          onClick={baixarModelo}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          📥 Baixar Modelo da Planilha
        </button>

        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          style={{
            padding: '10px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '6px',
          }}
        />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#e9ecef', color: '#343a40' }}>
            <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Produto</th>
            <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Categoria</th>
            <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {planilha.map((item, idx) => (
            <tr key={idx}>
              <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{item.produto}</td>
              <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{item.categoria}</td>
              <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{item.descricao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
