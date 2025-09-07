import { useEffect, useState } from "react";
import { Deposito, Produto, ProdutoDeposito } from "../../interface/ProdutoDeposito";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { ImportaNovoProdutoDeposito } from "../../api/Api";
import  api  from '../../components/Axios';

const ControleProdutoDeposito: React.FC = () => {


    const [produtosDeposito, setProdutosDeposito] = useState<ProdutoDeposito>();
    const [produtos, setProdutos] = useState<Array<Produto>>([]);
    const [deposito, setDeposito] = useState<Array<Deposito>>([]);
    const [depositoSelecionado, setDepositoSelecionado] = useState<number | null>(null);
    const [ProdutoSelecionado, setProdutoSelecionado] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [estoqueAtual, setEstoqueAtual] = useState(0);
    const [Ea, setEa] = useState(0);
    const [lote, setLote] = useState('');
    const [validade, setValidade] = useState('');
    const [carregado, setCarregado] = useState(false);
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        if (carregado) return;

        const fetchProdutos = async () => {
            setLoading(true);
            try {
                const response = await api.get('/deposito/BuscarDepositos');
                setDeposito(response.data);
                setCarregado(true);
            } catch (error) {
                return;
            } finally {
                setLoading(false);
            }
        };

        fetchProdutos();
    }, [carregado]);

    useEffect(() => {
        if (carregado) return;

        const fetchProdutos = async () => {
            setLoading(true);
            try {
                const response = await api.get('/Produto/BuscarProdutosExistente');
                setProdutos(response.data);
                setCarregado(true);
            } catch (error) {
                return;
            } finally {
                setLoading(false);
            }
        };

        fetchProdutos();
    }, [carregado]);

    const LimparCampos = () => {
        setEstoqueAtual(0);
        setEa(0);
        setLote('');
        setValidade('');
        setProdutosDeposito(undefined);
        setProdutos([]);
        setDeposito([]);
    };


    const handleImporta = () => {
        setShowModal(true);
    };

    const handleFechar = () => {
        setShowModal(false);
    };


    const Importar = async () => {
        setLoading(true);

        const planilha = {
            Produto: ProdutoSelecionado,
            Deposito: depositoSelecionado,
            EstoqueAtual: estoqueAtual,
            Ea: Ea,
            DataValidade: validade,
            DataEntrada: new Date().toISOString().split('T')[0],
            Lote: lote,
            Situacao: 'A',
        }

        try {

            await ImportaNovoProdutoDeposito(planilha);
            toast.success("Produto Depósito importado com sucesso!");
            LimparCampos();

            setLoading(false);
            setShowModal(false);
        }
        catch (error) {
            toast.error("Erro ao importar Produto Depósito");
        } finally {
            setLoading(false);
            setShowModal(false);
            LimparCampos();
        }
    }


    return (
        <div style={{
            backgroundColor: '#f9f9f9',
            minHeight: '100vh',
            padding: '10px',
            fontFamily: 'sans-serif',
        }}>
            <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#003865' }}>Cadastro Produto Deposito </h2>

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
                        <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Produto </label>
                        <select
                            value={ProdutoSelecionado ?? ''}
                            onChange={(e) => setProdutoSelecionado(Number(e.target.value))}
                            style={{
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                width: '450px',
                            }}
                        >
                            <option value="" disabled>
                                {loading ? 'Carregando...' : 'Selecione...'}
                            </option>
                            {produtos.map((f) => (
                                <option key={f.produto} value={`${f.produto}${f.digito}`}>
                                    {f.produto}{f.digito} - {f.nome}
                                </option>       
                            ))}
                        </select>

                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Deposito </label>
                        <select
                            value={depositoSelecionado ?? ''}
                            onChange={(e) => setDepositoSelecionado(Number(e.target.value))}
                            style={{
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                width: '450px',
                            }}
                        >
                            <option value="" disabled>
                                {loading ? 'Carregando...' : 'Selecione...'}
                            </option>
                            {deposito.map((f) => (
                                <option key={f.codigo} value={f.codigo}>
                                    {f.codigo} - {f.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Estoque Atual</label>
                        <input
                            type="number"

                            value={estoqueAtual}
                            onChange={(e) => setEstoqueAtual(parseInt(e.target.value))}
                            style={{
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                width: '300px',
                            }}
                        />
                    </div>

                </div>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>EA</label>
                        <input
                            type="number"
                            value={Ea}
                            onChange={(e) => setEa(parseInt(e.target.value))}
                            style={{
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                width: '300px',
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Lote</label>
                        <input
                            type="text"
                            placeholder="2025A01"
                            maxLength={15}
                            value={lote}
                            onChange={(e) => setLote(e.target.value.toUpperCase())}
                            style={{
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                width: '300px',
                                textTransform: 'uppercase'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Data de Validade</label>
                        <input
                            type="date"
                            value={validade}
                            onChange={(e) => setValidade(e.target.value)}
                            style={{
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                width: '300px'
                            }}
                        />
                    </div>

                </div>
                
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', justifyContent: 'flex-end' }}>
                    <button
                        onClick={() => handleImporta()}
                        disabled={
                            produtos.length <= 0 ||
                            deposito.length <= 0 ||
                            estoqueAtual <= 0 ||
                            Ea <= 0 ||
                            lote.trim() === '' ||
                            validade.trim() === '' ||
                            loading
                        }

                        style={{
                            opacity:
                                produtos.length <= 0 ||
                                    deposito.length <= 0 ||
                                    estoqueAtual <= 0 ||
                                    Ea <= 0 ||
                                    lote.trim() === '' ||
                                    validade.trim() === '' ||
                                    loading
                                    ? 0.5
                                    : 1,
                            cursor:
                                produtos.length <= 0 ||
                                    deposito.length <= 0 ||
                                    estoqueAtual <= 0 ||
                                    Ea <= 0 ||
                                    lote.trim() === '' ||
                                    validade.trim() === '' ||
                                    loading
                                    ? 'not-allowed'
                                    : 'pointer',
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            border: 'none',
                            borderRadius: '6px',
                            color: 'white',
                            fontWeight: 'bold'
                        }}
                    >
                        ▶ Importar
                    </button>
                </div>
            </div>
            <Modal show={showModal} onHide={handleFechar} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Tem certeza de cadastrar esse Produto Depósito?</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <div style={{ flex: 1.2 }}>
                            <label style={{ color: 'black' }}>Produto</label>
                            <Form.Control disabled defaultValue={ProdutoSelecionado ?? ''} />
                        </div>
                        <div style={{ flex: 2 }}>
                            <label style={{ color: 'black' }}>Depósito</label>
                            <Form.Control disabled defaultValue={depositoSelecionado ?? ''} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <div style={{ flex: 2 }}>
                            <label style={{ color: 'black' }}>Estoque Atual</label>
                            <Form.Control disabled defaultValue={estoqueAtual} />
                        </div>
                        <div style={{ flex: 2 }}>
                            <label style={{ color: 'black' }}>Ea</label>
                            <Form.Control disabled defaultValue={Ea} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ color: 'black' }}>Lote</label>
                            <Form.Control disabled defaultValue={lote} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ color: 'black' }}>Validade</label>
                            <Form.Control disabled defaultValue={validade} />
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={Importar}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#28a745',
                            border: 'none',
                            borderRadius: '6px',
                            color: 'white',
                            fontWeight: 'bold'
                        }}
                        disabled={loading}
                    >
                        {loading ? 'Importando...' : '▶ Importar Cadastro'}
                    </Button>
                    <Button onClick={handleFechar}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#dc3545',
                            border: 'none',
                            borderRadius: '6px',
                            color: 'white',
                            fontWeight: 'bold'
                        }}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>);
};
export default ControleProdutoDeposito;