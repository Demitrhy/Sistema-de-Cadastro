import React, { useEffect, useState } from 'react';
import { Fornecedor, Produto } from '../../interface/Produto';
import { Importar } from '../../api/Api';
import { toast } from 'react-toastify';
import { Button, Form, Modal } from "react-bootstrap";
import api from '../../components/Axios';

const CadastroIndividual: React.FC = () => {
    const [planilha, setPlanilha] = useState<Array<Produto>>([]);
    const [produto, setProduto] = useState<number | ''>('');
    const [fornecedor, setFornecedor] = useState<Array<Fornecedor>>([]);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState<number | null>(null);
    const [codigoBloqueado, setCodigoBloqueado] = useState(false);
    const [produtoAutomatico] = useState(false);
    const [custo, setCusto] = useState(0);
    const [digito] = useState(0);
    const [percLucro, setPercentualLucro] = useState(0);
    const [precoVenda, setPrecoVenda] = useState(0);
    const [comissao, setComissao] = useState(0);
    const [liquido, setLiquido] = useState(0);
    const [unidade, setUnidade] = useState("");
    const [nome, setNome] = useState("");
    const [marca, setMarca] = useState("");
    const [tipo, setTipo] = useState("");
    const [grupo, setGrupo] = useState("");
    const [situacao, setSituacao] = useState("");
    const [loading, setLoading] = useState(false);
    const [carregado, setCarregado] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const limparCampos = () => {
        setProduto(0);
        setCusto(0);
        setPrecoVenda(0);
        setPercentualLucro(0);
        setComissao(0);
        setLiquido(0);
        setTipo('');
        setNome('');
        setGrupo("");
        setMarca("");
        setUnidade("");
        setSituacao("");
        setFornecedor([])
    };

    const limparPlanilha = () => {
        setPlanilha([]);
    }

    useEffect(() => {
        const preco = custo + (custo * percLucro / 100);
        const comissaoReais = preco * (comissao / 100);
        const liquidoCalc = preco - comissaoReais;
        setPrecoVenda(preco);
        setLiquido(liquidoCalc);
    }, [custo, percLucro, comissao]);

    const handleImporta = () => {
        setShowModal(true);
    };

    const handleFechar = () => {
        setShowModal(false);
    };


    useEffect(() => {
        if (carregado) return;

        const fetchProdutos = async () => {
            setLoading(true);
            try {
                const response = await api.get('/Fornecedor/BucarFornecedor'); // <-- sua URL
                setFornecedor(response.data);
                setCarregado(true);
            } catch (error) {
                return;
            } finally {
                setLoading(false);
            }
        };

        fetchProdutos();
    }, [carregado]);

    const adicionarProduto = () => {
        const produtoValido =
            produtoAutomatico || codigoBloqueado || (typeof produto === 'number' && produto > 0);

        const camposObrigatoriosPreenchidos =
            custo > 0 &&
            tipo.trim() !== '' &&
            nome.trim() !== '' &&
            marca.trim() !== '' &&
            grupo.trim() !== '' &&
            unidade.trim() !== '' &&
            situacao.trim() !== '' &&
            percLucro > 0 &&
            comissao > 0 &&
            liquido > 0 &&
            fornecedor.length > 0;


        if (produtoValido && camposObrigatoriosPreenchidos) {
            const novoItem: Produto = {
                produto: (produtoAutomatico || codigoBloqueado) ? 0 : Number(produto),
                codigoBloqueado,
                custo,
                percLucro,
                comissao,
                precoVenda,
                liquido,
                digito,
                fornecedor: fornecedorSelecionado!,
                situacao: situacao.trim(),
                marca: marca.trim(),
                tipo: tipo.trim(),
                nome: nome.trim(),
                grupo: grupo.trim(),
                unidadeMedida: unidade.trim(),

            };

            setPlanilha((prev) => [...prev, novoItem]);
            toast.success('Produto adicionado à tabela!');
            limparCampos();
        } else {
            toast.error(" Preencha todos os campos obrigatórios antes de adicionar o produto.");
        }
    };


    const Importa = async () => {
        setLoading(true);
        try {

            await Importar(planilha);
            toast.success(' Produto importado com sucesso!');
            setPlanilha([]);
        } catch (erro) {
            toast.error(' Erro ao importar o produto.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            backgroundColor: '#f9f9f9',
            minHeight: '100vh',
            padding: '10px',
            fontFamily: 'sans-serif',
        }}>
            <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#003865' }}>Cadastro de Produto </h2>

            <div
                style={{
                    marginBottom: '30px',
                    padding: '30px',
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    backgroundColor: '#f8f9fa',
                }}
            >

                <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Fornecedor </label>
                        <select
                            value={fornecedorSelecionado ?? ''}
                            onChange={(e) => setFornecedorSelecionado(Number(e.target.value))}
                            style={{
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                width: '250px',
                            }}
                        >
                            <option value="" disabled>
                                {loading ? 'Carregando...' : 'Selecione...'}
                            </option>
                            {fornecedor.map((f) => (
                                <option key={f.codigo} value={f.codigo}>
                                    {f.codigo} - {f.nome}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Código</label>
                        <input
                            type="number"
                            placeholder="Produto"
                            value={produto}
                            onChange={(e) => setProduto(e.target.value === '' ? '' : parseInt(e.target.value))}
                            min={1}
                            disabled={codigoBloqueado}
                            style={{
                                padding: '5px',
                                appearance: 'textfield',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                width: '240px',
                                backgroundColor: codigoBloqueado ? '#e0e0e0' : 'white',
                            }}
                        />

                        <label style={{ marginTop: '10px', display: 'flex', alignItems: 'center', fontSize: '14px' }}>
                            <input
                                type="checkbox"
                                checked={codigoBloqueado}
                                onChange={(e) => setCodigoBloqueado(e.target.checked)}
                                style={{ marginRight: '6px' }}
                            />
                            Código Desabilitado
                        </label>
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
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            style={{
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                width: '580px',
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
                            <option value="MH "> Material Hospitalar   </option>
                            <option value="PV"> Produto Veterinário   </option>
                            <option value="PI"> Produto Interno   </option>
                            <option value="S "> Serviço   </option>

                        </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '30px' }}>
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
                                width: '700px',
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
                        <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Status</label>
                        <select
                            value={situacao}
                            onChange={(e) => setSituacao(e.target.value)}
                            style={{
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                appearance: 'textfield', // Firefox
                                border: '1px solid #ccc',
                                width: '170px',
                            }}>
                            <option value="">Selecione...</option>
                            <option value="A">Ativo</option>
                            <option value="S">Suspenso </option>
                            <option value="D">Desativado</option>
                        </select>

                    </div>
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
                                width: '200px',
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Perc. de Lucro (%)</label>
                        <input
                            type="number"
                            value={percLucro}
                            onChange={(e) => setPercentualLucro(parseInt(e.target.value))}
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
                                width: '200px',
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
                                width: '200px',
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
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', justifyContent: 'flex-end' }}>
                    <button
                        onClick={() => handleImporta()}
                        disabled={
                            (!produtoAutomatico && !codigoBloqueado && (produto === '' || typeof produto !== 'number' || produto <= 0)) ||
                            custo <= 0 ||
                            tipo.trim() === '' ||
                            nome.trim() === '' ||
                            marca.trim() === '' ||
                            grupo.trim() === '' ||
                            unidade.trim() === '' ||
                            situacao.trim() === '' ||
                            percLucro <= 0 ||
                            comissao <= 0 ||
                            liquido <= 0 ||
                            fornecedor.length <= 0 ||
                            loading
                        }
                        style={{
                            opacity:
                                (!produtoAutomatico && !codigoBloqueado && (produto === '' || typeof produto !== 'number' || produto <= 0)) ||
                                    custo <= 0 ||
                                    tipo.trim() === '' ||
                                    nome.trim() === '' ||
                                    marca.trim() === '' ||
                                    grupo.trim() === '' ||
                                    unidade.trim() === '' ||
                                    situacao.trim() === '' ||
                                    percLucro <= 0 ||
                                    comissao <= 0 ||
                                    liquido <= 0 ||
                                    fornecedor.length <= 0 ||
                                    loading
                                    ? 0.5
                                    : 1,
                            cursor:
                                (!produtoAutomatico && !codigoBloqueado && (produto === '' || typeof produto !== 'number' || produto <= 0)) ||
                                    custo <= 0 ||
                                    tipo.trim() === '' ||
                                    nome.trim() === '' ||
                                    marca.trim() === '' ||
                                    grupo.trim() === '' ||
                                    unidade.trim() === '' ||
                                    situacao.trim() === '' ||
                                    percLucro <= 0 ||
                                    comissao <= 0 ||
                                    liquido <= 0 ||
                                    fornecedor.length <= 0 ||
                                    loading
                                    ? 'not-allowed'
                                    : 'pointer',
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            border: 'none',
                            borderRadius: '15px',
                            color: 'white',
                            fontWeight: 'bold',
                            marginTop:'25px'
                        }}
                    >
                        ▶ Importar
                    </button>

                </div>
                <Modal show={showModal} onHide={handleFechar} size="xl" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Tem certeza de cadastrar esse Produto?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Linha 1: Fornecedor, Código, Tipo, Nome */}
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <div style={{ flex: 2 }}>
                                <label style={{ color: 'black' }}>Fornecedor</label>
                                <Form.Control disabled defaultValue={fornecedorSelecionado ?? ''} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ color: 'black' }}>Código</label>
                                <Form.Control disabled defaultValue={produto ?? ''} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ color: 'black' }}>Tipo</label>
                                <Form.Control disabled defaultValue={tipo} />
                            </div>
                            <div style={{ flex: 2 }}>
                                <label style={{ color: 'black' }}>Nome</label>
                                <Form.Control disabled defaultValue={nome} />
                            </div>
                        </div>

                        {/* Linha 2: Grupo, Marca, Unidade Medida */}
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ color: 'black' }}>Grupo</label>
                                <Form.Control disabled defaultValue={grupo} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ color: 'black' }}>Marca</label>
                                <Form.Control disabled defaultValue={marca} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ color: 'black' }}>Unidade Medida</label>
                                <Form.Control disabled defaultValue={unidade} />
                            </div>
                        </div>

                        {/* Linha 3: Status, Custo, Perc. Lucro, Preço Venda, Comissão, Líquido */}
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ color: 'black' }}>Status</label>
                                <Form.Control disabled defaultValue={situacao} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ color: 'black' }}>Custo</label>
                                <Form.Control disabled defaultValue={custo} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ color: 'black' }}>Perc. de Lucro (%)</label>
                                <Form.Control disabled defaultValue={percLucro} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ color: 'black' }}>Preço Venda (R$)</label>
                                <Form.Control disabled defaultValue={precoVenda} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ color: 'black' }}>Comissão (%)</label>
                                <Form.Control disabled defaultValue={comissao} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ color: 'black' }}>Líquido (R$)</label>
                                <Form.Control disabled defaultValue={liquido} />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={Importa}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#28a745",
                                border: "none",
                                borderRadius: "6px",
                                color: "white",
                                fontWeight: "bold",
                            }}
                            disabled={loading}
                        >
                            {loading ? "Importando..." : "▶ Importar Cadastro"}
                        </Button>
                        <Button
                            onClick={handleFechar}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#dc3545",
                                border: "none",
                                borderRadius: "6px",
                                color: "white",
                                fontWeight: "bold",
                            }}
                        >
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>


            </div>
        </div>
    );
}

export default CadastroIndividual; 