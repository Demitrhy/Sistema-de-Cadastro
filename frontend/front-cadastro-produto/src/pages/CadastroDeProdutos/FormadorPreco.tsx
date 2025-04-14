import { toast } from "react-toastify";
import { Produto } from "../../interface/Produto";
import React, { useEffect, useState } from 'react';
import { BuscarProdutos, Editar } from "../../api/Api";
import 'font-awesome/css/font-awesome.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

const FormadorPreco: React.FC = () => {
    const [planilha, setPlanilha] = useState<Array<Produto>>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
    const [custo, setCusto] = useState(0);
    const [percLucro, setPercentualLucro] = useState(0);
    const [precoVenda, setPrecoVenda] = useState(0);
    const [comissao, setComissao] = useState(0);
    const [liquido, setLiquido] = useState(0);

    useEffect(() => {
        const preco = custo + (custo * percLucro / 100);
        const comissaoReais = preco * (comissao / 100);
        const liquidoCalc = preco - comissaoReais;
        setPrecoVenda(preco);
        setLiquido(liquidoCalc);
    }, [custo, percLucro, comissao]);

    useEffect(() => {
        if (produtoSelecionado) {
            setCusto(produtoSelecionado.custo ?? 0);
            setPercentualLucro(produtoSelecionado.percLucro ?? 0);
            setPrecoVenda(produtoSelecionado.precoVenda ?? 0);
            setComissao(produtoSelecionado.comissao ?? 0)
            setLiquido(produtoSelecionado.liquido ?? 0)
        }
    }, [produtoSelecionado]);


    const carregarProdutos = async () => {
        setLoading(true);
        try {
            const resultado = await BuscarProdutos();
            toast.success('Busca feita com  sucesso!');
            setPlanilha(resultado);
        } catch (erro) {
            toast.error('Falha na busca dos produtos.');
            console.error(erro);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarProdutos();
    }, []);



    const handleEditar = (produto: Produto) => {
        setProdutoSelecionado(produto);
        setShowModal(true);
    };

    const handleFechar = () => {
        setShowModal(false);
        setProdutoSelecionado(null);

    };

    const Salvar = async () => {
        const dadosAtualizados = {
            produto: produtoSelecionado?.produto,
            digito: produtoSelecionado?.digito,
            liquido,
            comissao,
            precoVenda,
            percLucro,
            custo
        };

        try {
            console.log("Passei por aqui novamente ", dadosAtualizados)
            await Editar(dadosAtualizados);
            toast.success('Produto salvo com sucesso!');
            carregarProdutos();
            handleFechar();
        } catch (error) {
            toast.error('Erro ao salvar o produto');
            console.error(error);
        }
    };

    return (
        <>
            <div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#0d6efd', color: '#ffffff' }}>
                            <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Produto</th>
                            <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Nome</th>
                            <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Marca</th>
                            <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Tipo</th>
                            <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Grupo</th>
                            <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Situacao</th>
                            <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Unid. Medida</th>
                            <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Custo</th>
                            <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Perc. Lucro (%)</th>
                            <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Preço Venda (R$)</th>
                            <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Comissão (%)</th>
                            <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Líquido (R$)</th>
                            <th style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planilha.map((item: Produto, idx: number) => (
                            <tr key={idx}>
                                <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.produto}</td>
                                <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.nome}</td>
                                <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.marca}</td>
                                <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.tipo}</td>
                                <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.grupo}</td>
                                <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.situacao}</td>
                                <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.unidadeMedida}</td>
                                <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.custo}</td>
                                <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.percLucro}</td>
                                <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.precoVenda}</td>
                                <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.comissao}</td>
                                <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>{item.liquido}</td>
                                <td style={{ padding: '10px', border: '1px solid #dee2e6', textAlign: 'center' }}>
                                    <button
                                        style={{
                                            padding: '5px 10px',
                                            backgroundColor: '#007bff',
                                            border: 'none',
                                            borderRadius: '6px',
                                            color: 'white',
                                            fontWeight: 'bold'
                                        }}
                                        onClick={() => handleEditar(item)}
                                    >
                                        <i className="fa fa-pencil" /> {/* Ícone de lápis para editar */}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal de Edição */}
            {produtoSelecionado && (
                <Modal show={showModal} onHide={handleFechar} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Produto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ backgroundColor: '#1c1c1c', padding: '20px', borderRadius: '10px' }}>
                            {/* Primeira linha */}
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                <div style={{ flex: 1 }} aria-disabled>
                                    <label style={{ color: '#fff' }}>Código</label>

                                    <Form.Control disabled defaultValue={produtoSelecionado.produto} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ color: '#fff' }}>Tipo</label>
                                    <Form.Control disabled defaultValue={produtoSelecionado.tipo} />
                                </div>
                                <div style={{ flex: 2 }}>
                                    <label style={{ color: '#fff' }}>Nome</label>
                                    <Form.Control disabled defaultValue={produtoSelecionado.nome} />
                                </div>
                            </div>

                            {/* Segunda linha */}
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ color: '#fff' }}>Grupo</label>
                                    <Form.Control disabled defaultValue={produtoSelecionado.grupo} />

                                </div>
                                <div style={{ flex: 2 }}>
                                    <label style={{ color: '#fff' }}>Marca</label>
                                    <Form.Control disabled defaultValue={produtoSelecionado.marca} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ color: '#fff' }}>Unidade Medida</label>
                                    <Form.Control disabled defaultValue={produtoSelecionado.unidadeMedida} />
                                </div>
                            </div>

                            {/* Terceira linha */}
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ color: '#fff' }}>Status</label>
                                    <Form.Control disabled defaultValue={produtoSelecionado.situacao} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ color: '#fff' }}>Custo</label>
                                    <Form.Control
                                        value={custo}
                                        type="number"
                                        style={{ appearance: 'textfield' }}
                                        onChange={(e) => setCusto(parseInt(e.target.value))}
                                        min={1} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ color: '#fff' }}>Perc. de Lucro (%)</label>
                                    <Form.Control value={percLucro} type="number" style={{ appearance: 'textfield' }}
                                        onChange={(e) => setPercentualLucro(parseInt(e.target.value))} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ color: '#fff' }}>Preço Venda (R$)</label>
                                    <Form.Control value={precoVenda} type="number" style={{ appearance: 'textfield' }}
                                        onChange={(e) => setPrecoVenda(parseInt(e.target.value))} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ color: '#fff' }}>Comissão (%)</label>
                                    <Form.Control value={comissao} type="number" style={{ appearance: 'textfield' }}
                                        onChange={(e) => setComissao(parseInt(e.target.value))} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ color: '#fff' }}>Líquido (R$)</label>
                                    <Form.Control value={liquido} type="number" style={{ appearance: 'textfield' }}
                                        onChange={(e) => setLiquido(parseInt(e.target.value))} />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button
                            onClick={Salvar}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#007bff',
                                border: 'none',
                                borderRadius: '6px',
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                        >
                            Salvar
                        </Button>
                        <Button onClick={handleFechar}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#dc3545 ',
                                border: 'none',
                                borderRadius: '6px',
                                color: 'white',
                                fontWeight: 'bold'
                            }}>

                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default FormadorPreco;
