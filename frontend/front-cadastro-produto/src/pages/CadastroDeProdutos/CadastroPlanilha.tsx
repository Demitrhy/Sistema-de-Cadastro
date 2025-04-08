import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Produto } from '../../interface/Produto';
import { Importar } from '../../api/Api';


const CadastroPlanilha: React.FC = () => {
    const [planilha, setPlanilha] = useState<Array<Produto>>([]);
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState('');

    const limparPlanilha = () => {
        setPlanilha([]);
    }

    const baixarModelo = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet([], {
            header: ['produto', 'valor', 'categoria', 'descricao'],
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


    const Importa = async () => {
        setLoading(true);
        setMensagem('');

        try {
            const resultado = await Importar(planilha);
            setMensagem('Produto importado com sucesso!');
            console.log(resultado);
        } catch (erro) {
            setMensagem('Erro ao importar o produto.');
            console.error(erro);
        } finally {
            setLoading(false);
        }
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

            {/* Bloco único com tudo junto */}
            <div
                style={{
                    marginBottom: '30px',
                    padding: '20px',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    backgroundColor: '#f8f9fa',
                }}
            >
                {/* Linha 1 - Importação */}
                <div style={{ marginLeft: '20px', display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
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

                <div style={{
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    padding: '10px',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                    marginTop: '10px'
                }}>
                    <h3 style={{ marginBottom: '-19px' }}>Lista de Produtos</h3>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'flex-end' }}>

                        <button
                            onClick={Importa}
                            disabled={planilha.length === 0 || loading}
                            style={{
                                opacity: planilha.length === 0 || loading ? 0.5 : 1,
                                cursor: planilha.length === 0 || loading ? 'not-allowed' : 'pointer',
                                padding: '10px 20px',
                                backgroundColor: '#007bff',
                                border: 'none',
                                borderRadius: '6px',
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                        >
                            {loading ? 'Importando...' : '▶ Importar Produto'}
                        </button>

                        <button onClick={limparPlanilha}
                            disabled={planilha.length === 0 || loading}
                            style={{
                                opacity: planilha.length === 0 || loading ? 0.5 : 1,
                                cursor: planilha.length === 0 || loading ? 'not-allowed' : 'pointer',
                                padding: '10px 20px',
                                backgroundColor: '#dc3545 ',
                                border: 'none',
                                borderRadius: '6px',
                                color: 'white',
                                fontWeight: 'bold'
                            }}>

                            🗑️ Limpar
                        </button>
                    </div>
                    {mensagem && <p>{mensagem}</p>}

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#0d6efd', color: '#ffffff' }}>
                                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Produto</th>
                                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Valor</th>
                                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Categoria</th>
                                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Descrição</th>
                            </tr>
                        </thead>

                        <tbody>
                            {planilha.map((item, idx) => (
                                <tr key={idx}>
                                    <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.produto}</td>
                                    <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.valor}</td>
                                    <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.categoria}</td>
                                    <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.descricao}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default CadastroPlanilha; 
