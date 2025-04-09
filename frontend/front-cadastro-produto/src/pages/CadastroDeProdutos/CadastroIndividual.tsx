import React, { useEffect, useState } from 'react';
import { Produto } from '../../interface/Produto';
import { Importar } from '../../api/Api';


const CadastroIndividual: React.FC = () => {
    const [planilha, setPlanilha] = useState<Array<Produto>>([]);
    const [produto, setProduto] = useState(0);
    const [custo, setCusto] = useState(0);
    const [percentualLucro, setPercentualLucro] = useState(0);
    const [precoVenda, setPrecoVenda] = useState(0);
    const [comissao, setComissao] = useState(0);
    const [liquido, setLiquido] = useState(0);
    const [unidade, setUnidade] = useState("");
    const [descricao, setDescricao] = useState("");
    const [marca, setMarca] = useState("");
    const [tipo, setTipo] = useState("");
    const [grupo, setGrupo] = useState("");
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState('');

    const limparCampos = () => {
        setProduto(0);
        setCusto(0);
        setPrecoVenda(0);
        setPercentualLucro(0);
        setComissao(0);
        setLiquido(0);
        setTipo('');
        setDescricao('');
        setGrupo("");
        setMarca("");
        setUnidade("");
    };

    const limparPlanilha = () => {
        setPlanilha([]);
    }

    useEffect(() => {
        const preco = custo + (custo * percentualLucro / 100);
        const comissaoReais = preco * (comissao / 100);
        const liquidoCalc = preco - comissaoReais;
        setPrecoVenda(preco);
        setLiquido(liquidoCalc);
      }, [custo, percentualLucro, comissao]);
      

    const adicionarProduto = () => {
        if (produto > 0 && custo > 0 && tipo.trim() && descricao.trim()) {
            const novoItem: Produto = {
                produto,
                custo,
                percentualLucro,
                comissao,
                precoVenda,
                liquido,
                marca: marca.trim(),
                tipo: tipo.trim(),
                descricao: descricao.trim(),
                grupo: grupo.trim(),
                unidadeMedida: unidade.trim()
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
                fontFamily: 'sans-serif',
               
            }}
        >
            <h2 style={{ color: '#333' }}>Cadastro de Produto</h2>

            {/* Bloco único com tudo junto */}
            <div
                style={{
                    marginBottom: '30px',
                    padding: '30px',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    backgroundColor: '#f8f9fa',
                }}
            >
                {/* Linha 2 - Cadastro Individual */}

                {/* Linha 1: Código | Tipo | Nome */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Código</label>
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
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Tipo</label>
                        <select
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            style={{
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                width: '250px',
                            }}
                        >
                            <option value="">Selecione...</option>
                            <option value="M"> Medicamento</option>
                            <option value="G">Genérico</option>
                            <option value="S"> Similar </option>
                            <option value="C"> Controlado </option>
                            <option value="P"> Perfumaria </option>
                            <option value="H"> Higiene </option>
                            <option value="SA"> Suplemento/Alimento </option>
                            <option value="MH"> Material Hospitalar </option>
                            <option value="PV"> Produto Veterinário </option>
                            <option value="SR"> Serviço </option>
                            <option value="PL"> Produto de Limpeza </option>
                            <option value="A"> Água </option>
                            <option value="HE"> Hidratante / Energético </option>
                            <option value="CLT"> Curativos / Luvas / Termômetro </option>
                            <option value="AI"> Aplicação de Injetáveis </option>
                            <option value="VP"> Verificação de Pressão </option>
                            <option value="TG"> Teste de glicemia </option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Nome</label>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            style={{
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                width: '550px',
                            }}
                        />
                    </div>
                </div>

                {/* Linha 2: Grupo | Marca | custo */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Grupo</label>
                        <select
                            value={grupo}
                            onChange={(e) => setGrupo(e.target.value)}
                            style={{
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                width: '240px',
                            }}
                        >
                            <option value="">Selecione...</option>
                            <option value="M"> Medicamento</option>
                            <option value="B"> Bebidas    </option>
                            <option value="H"> Higiene    </option>
                            <option value="L"> Limpeza    </option>
                            <option value="A"> Alimentos   </option>
                            <option value="MH"> Material Hospitalar   </option>
                            <option value="PV"> Produto Veterinário   </option>
                            <option value="PI"> Produto Interno   </option>
                            <option value="S"> Serviço   </option>

                        </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column',marginLeft:'30px' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Marca</label>
                        <input
                            type="text"
                            placeholder="Marca"
                            value={marca}
                            onChange={(e) => setMarca(e.target.value)}
                            style={{
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                width: '500px',
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Unidade Medida</label>
                        <select
                            value={unidade}
                            onChange={(e) => setUnidade(e.target.value)}

                            style={{
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                appearance: 'textfield', // Firefox
                                border: '1px solid #ccc',
                                width: '250px',
                            }}>
                            <option value="">Selecione...</option>
                            <option value="UN"> Unidade</option>
                            <option value="CX"> Caixa    </option>
                            <option value="FR"> Frasco    </option>
                            <option value="BL"> Blister    </option>
                            <option value="MG"> Miligrama   </option>
                            <option value="ML">Mililitro  </option>
                            <option value="G">  Grama   </option>
                            <option value="KG">Quilograma   </option>
                            <option value="PAC"> Pacote   </option>
                            <option value="AMP"> Ampola   </option>
                        </select>

                    </div>
                </div>

                <div style={{ display: 'flex', gap: '30px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Custo</label>
                        <input
                            type="number"
                            value={custo}
                            onChange={(e) => setCusto(parseInt(e.target.value))}
                            min={1}
                            style={{
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                appearance: 'textfield', // Firefox
                                border: '1px solid #ccc',
                                width: '180px',
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Perc. de Lucro (%)</label>
                        <input
                            type="number"
                            value={percentualLucro}
                            onChange={(e) => setPercentualLucro(parseInt(e.target.value))}
                            min={1}
                            style={{
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                appearance: 'textfield', // Firefox
                                border: '1px solid #ccc',
                                width: '180px',
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Preço Venda (R$)</label>
                        <input
                            type="number"
                            value={precoVenda}
                            onChange={(e) => setPrecoVenda(parseInt(e.target.value))}
                            min={1}
                            style={{
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                appearance: 'textfield', // Firefox
                                border: '1px solid #ccc',
                                width: '180px',
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Comissão (%$)</label>
                        <input
                            type="number"
                            value={comissao}
                            onChange={(e) => setComissao(parseInt(e.target.value))}
                            min={1}
                            style={{
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                appearance: 'textfield', // Firefox
                                border: '1px solid #ccc',
                                width: '150px',
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Liquido (R$)</label>
                        <input
                            type="number"
                            value={liquido}
                            onChange={(e) => setLiquido(parseInt(e.target.value))}
                            min={1}
                            style={{
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                appearance: 'textfield', // Firefox
                                border: '1px solid #ccc',
                                width: '200px',
                            }}
                        />
                    </div>
                   
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
                                custo <= 0 ||
                                tipo.trim() === '' ||
                                descricao.trim() === '' ||
                                marca.trim() === '' ||
                                grupo.trim() === '' ||
                                unidade.trim() === '' ||
                                percentualLucro <= 0 ||
                                comissao <= 0 ||
                                liquido <= 0 ||
                                loading
                            }
                            style={{
                                opacity:
                                    produto <= 0 ||
                                        custo <= 0 ||
                                        tipo.trim() === '' ||
                                        descricao.trim() === '' ||
                                        marca.trim() === '' ||
                                        grupo.trim() === '' ||
                                        unidade.trim() === '' ||
                                        percentualLucro <= 0 ||
                                        comissao <= 0 ||
                                        liquido <= 0 ||
                                        loading
                                        ? 0.5
                                        : 1,
                                cursor:
                                    produto <= 0 ||
                                        custo <= 0 ||
                                        tipo.trim() === '' ||
                                        descricao.trim() === '' ||
                                        marca.trim() === '' ||
                                        grupo.trim() === '' ||
                                        unidade.trim() === '' ||
                                        percentualLucro <= 0 ||
                                        comissao <= 0 ||
                                        liquido <= 0 ||
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
                            + Adicionar Cadastro
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
                            {loading ? 'Importando...' : '▶ Importar Cadastro'}
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
                                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Tipo</th>
                                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Nome</th>
                                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Grupo</th>
                                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Marca</th>
                                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Unidade Medida</th>
                                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Custo</th>
                                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Perc. de Lucro %</th>
                                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Preço Venda R$</th>
                                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Comissão %</th>
                                <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Liquido R$</th>
                            </tr>
                        </thead>
                        <tbody>
                            {planilha.map((item, idx) => (
                                <tr key={idx}>
                                    <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.produto}</td>
                                    <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.tipo}</td>
                                    <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.descricao}</td>
                                    <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.grupo}</td>
                                    <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.marca}</td>
                                    <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.unidadeMedida}</td>
                                    <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.custo}</td>
                                    <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.percentualLucro}</td>
                                    <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.precoVenda}</td>
                                    <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.comissao}</td>
                                    <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.liquido}</td>
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