import React, { useState } from 'react';
import { Produto } from '../../interface/Produto';
import { Importar } from '../../api/Api';


const CadastroIndividual: React.FC = () => {
    const [planilha, setPlanilha] = useState<Array<Produto>>([]);
    const [produto, setProduto] = useState(0);
    const [valor, setValor] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState('');

    const limparCampos = () => {
        setProduto(0);
        setValor(0);
        setCategoria('');
        setDescricao('');

    };
    const limparPlanilha = () => {
        setPlanilha([]);
    }

    const adicionarProduto = () => {
        if (produto > 0 && valor > 0 && categoria.trim() && descricao.trim()) {
            const novoItem: Produto = {
                produto,
                valor,
                categoria: categoria.trim(),
                descricao: descricao.trim(),
            };
            setPlanilha((prev) => [...prev, novoItem]);
            limparCampos();
        } else {
            alert("Preencha todos os campos antes de adicionar o produto.");
        }
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
                fontFamily: 'sans-serif'
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
                {/* Linha 2 - Cadastro Individual */}

                <div style={{ display: 'flex', flexDirection: 'column', marginRight: '15px' }}>
                    <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Produto</label>
                    <input
                        type="number"
                        placeholder="Produto"
                        value={produto}
                        onChange={(e) => setProduto(parseInt(e.target.value))}
                        min={1}
                        style={{
                            padding: '5px',
                            appearance: 'textfield', // Firefox
                            fontSize: '16px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            width: '240px',
                            marginBottom: '20px'
                        }}
                    />
                </div>
                <div style={{
                    display: 'flex',
                    marginTop: '-70px',
                    marginLeft: '300px',
                    flexDirection: 'column', marginRight: '15px'
                }}>
                    <label style={{ fontWeight: 'bold' }}>Valor</label>
                    <input
                        type="number"
                        placeholder="Valor"
                        value={valor}
                        onChange={(e) => setValor(parseInt(e.target.value))}
                        min={1}
                        style={{
                            padding: '5px',
                            appearance: 'textfield', // Firefox
                            fontSize: '16px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            width: '240px',
                            marginBottom: '20px'
                        }}
                    />
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '-70px',
                    marginLeft: '600px'
                }}>
                    <label style={{ fontWeight: 'bold' }}>Categoria</label>
                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        style={{
                            padding: '5px',
                            fontSize: '16px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            width: '250px',
                            marginBottom: '20px'
                        }}
                    >
                        <option value="">Selecione</option>
                        <option value="M">M</option>
                        <option value="NM">NM</option>
                        <option value="P">P</option>
                    </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>
                    <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Descrição</label>
                    <input
                        type="text"
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '10px',
                            border: '1px solid #ccc',
                            width: '350px',
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

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', justifyContent: 'flex-end' }}>
                        <button
                            onClick={adicionarProduto}
                            disabled={
                                produto <= 0 ||
                                valor <= 0 ||
                                categoria.trim() === '' ||
                                descricao.trim() === '' ||
                                loading
                            }
                            style={{
                                opacity:
                                    produto <= 0 ||
                                        valor <= 0 ||
                                        categoria.trim() === '' ||
                                        descricao.trim() === '' ||
                                        loading
                                        ? 0.5
                                        : 1,
                                cursor:
                                    produto <= 0 ||
                                        valor <= 0 ||
                                        categoria.trim() === '' ||
                                        descricao.trim() === '' ||
                                        loading
                                        ? 'not-allowed'
                                        : 'pointer',
                                padding: '10px 20px',
                                backgroundColor: '#28a745',
                                border: 'none',
                                borderRadius: '6px',
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                        >
                            + Adicionar Produto
                        </button>



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

export default CadastroIndividual; 