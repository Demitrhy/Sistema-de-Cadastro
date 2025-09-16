import { useState } from "react";
import { IMaskInput } from 'react-imask';
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { ImportaNovoDeposito } from "../../api/Api";
import Phone from "../../components/telefone";
import Cep from "../../components/cep";
import Cnpj from "../../components/cnpj";
import Status from "../../components/selectStatus";
import { Deposito } from "../../interface/Deposito";
import Uf from "../../components/selectUf";
import Email from "../../components/email";
import Nome from "../../components/nome";
import Endereco from "../../components/endereco";
import Numero from "../../components/numero";
import Bairro from "../../components/bairro";
import Cidade from "../../components/cidade";


const CadastroDeDeposito: React.FC = () => {
    const [nome, setNome] = useState("");
    const [fantasia, setFantasia] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cep, setCep] = useState("");
    const [email, setEmail] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState(0);
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [uf, setUf] = useState("");
    const [situacao, setSituacao] = useState("");
    const [capacidade, setCapacidade] = useState<number | "">("");
    const [codigoFiscal, setCodigoFiscal] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [produtosRestritos, setProdutosRestritos] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const limparCampos = () => {
        setCnpj("");
        setCodigoFiscal("");
        setProdutosRestritos("");
        setCapacidade("");
        setTelefone("");
        setCep("");
        setNumero(0);
        setFantasia('');
        setNome('');
        setEmail("");
        setEndereco("");
        setCidade("");
        setBairro("");
        setUf("");
        setSituacao("");
    };


    const estados = [
        { nome: "Ceará", sigla: "CE" },
        { nome: "São Paulo", sigla: "SP" },
        { nome: "Rio de Janeiro", sigla: "RJ" },
    ];




    const handleImporta = () => {
        setShowModal(true);
    };

    const handleFechar = () => {
        setShowModal(false);
    };

    const Importar = async () => {
        setLoading(true);

        const planilha: Deposito[] = [{
            codigo: 0,
            nome: nome,
            fantasia: fantasia,
            telefone: telefone.replace(/\D/g, ''),
            cep: cep.replace(/\D/g, ''),
            email: email,
            endereco: endereco,
            numero: numero,
            cidade: cidade,
            bairro: bairro,
            uf: uf,
            situacao: situacao,
            capacidade: typeof capacidade === "string" ? parseFloat(capacidade) : capacidade,
            codigoFiscal: codigoFiscal,
            produtosRestritos: produtosRestritos.split(',').map(item => item.trim()),
            cnpj: cnpj.replace(/\D/g, '')
        }]
        try {
            await ImportaNovoDeposito(planilha);
            toast.success("Depósito importado com sucesso!");
            limparCampos();
            setLoading(false);
            setShowModal(false);
        }
        catch (error) {
            toast.error("Erro ao importar depósito");
        } finally {
            setLoading(false);
            setShowModal(false);
            limparCampos();
        }
    }

    return (
        <div style={{ backgroundColor: "#f9f9f9", padding: "10px" }}>
            <h2 style={{ fontSize: "18px", marginBottom: "20px", color: "#003865" }}>
                Cadastro de Depósito
            </h2>

            <div
                style={{
                    padding: "30px",
                    border: "1px solid #dee2e6",
                    borderRadius: "8px",
                    backgroundColor: "#f8f9fa",
                }}
            >

                <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Cnpj value={cnpj} onChange={(value) => setCnpj(cnpj)} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Nome value={nome} onChange={setNome} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ fontWeight: "bold", marginBottom: "6px" }}>Fantasia:</label>
                        <input
                            type="text"
                            placeholder="Fantasia"
                            value={fantasia}
                            onChange={(e) => setFantasia(e.target.value)}
                            style={{
                                padding: "5px",
                                fontSize: "16px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                width: "450px",
                            }}
                        />
                    </div>
                </div>
                <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Endereco value={endereco} onChange={setEndereco} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Numero value={numero} onChange={setNumero} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Bairro value={bairro} onChange={setBairro} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Cidade value={cidade} onChange={setCidade} />
                    </div>
                </div>


                <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Uf value={uf} onChange={setUf} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Phone value={telefone} onChange={(value) => setTelefone(telefone)} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Email value={email} onChange={setEmail} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Cep value={cep} onChange={(value) => setCep(cep)} />
                    </div>

                </div>

                <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Status value={situacao} onChange={setSituacao} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ fontWeight: "bold", marginBottom: "6px" }}>Capacidade (m³):</label>
                        <input
                            type="number"
                            placeholder="Capacidade"
                            value={capacidade}
                            onChange={(e) =>
                                setCapacidade(e.target.value ? parseFloat(e.target.value) : "")
                            }
                            style={{
                                padding: "5px",
                                fontSize: "16px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                width: "150px",
                            }}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ fontWeight: "bold", marginBottom: "6px" }}>Código Fiscal:</label>
                        <input
                            type="text"
                            placeholder="Código Fiscal"
                            value={codigoFiscal}
                            onChange={(e) => setCodigoFiscal(e.target.value)}
                            style={{
                                padding: "5px",
                                fontSize: "16px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                width: "200px",
                            }}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                        <label style={{ fontWeight: "bold", marginBottom: "6px" }}>Produtos Restritos: <small>(Opcional)</small></label>
                        <textarea
                            placeholder="Informe produtos restritos"
                            value={produtosRestritos}
                            onChange={(e) => setProdutosRestritos(e.target.value)}
                            style={{
                                padding: "5px",
                                fontSize: "16px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                minHeight: "80px",
                                width: "600px",
                            }}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', justifyContent: 'flex-end' }}>
                    <button
                        onClick={() => handleImporta()}
                        disabled={
                            nome.trim() === '' ||
                            cnpj.trim() === '' ||
                            fantasia.trim() === '' ||
                            endereco.trim() === '' ||
                            bairro.trim() === '' ||
                            cidade.trim() === '' ||
                            uf.trim() === '' ||
                            email.trim() === '' ||
                            situacao.trim() === '' ||
                            numero <= 0 ||
                            telefone.trim() === '' ||
                            codigoFiscal.trim() === '' ||
                            (typeof capacidade === "string" ? capacidade.trim() === '' : capacidade <= 0) ||
                            loading
                        }

                        style={{
                            opacity:
                                nome.trim() === '' ||
                                    cnpj.trim() === '' ||
                                    fantasia.trim() === '' ||
                                    endereco.trim() === '' ||
                                    bairro.trim() === '' ||
                                    cidade.trim() === '' ||
                                    uf.trim() === '' ||
                                    email.trim() === '' ||
                                    situacao.trim() === '' ||
                                    numero <= 0 ||
                                    telefone.trim() === '' ||
                                    codigoFiscal.trim() === '' ||

                                    (typeof capacidade === "string" ? capacidade.trim() === '' : capacidade <= 0) ||
                                    loading
                                    ? 0.5
                                    : 1,
                            cursor:
                                nome.trim() === '' ||
                                    cnpj.trim() === '' ||
                                    fantasia.trim() === '' ||
                                    endereco.trim() === '' ||
                                    bairro.trim() === '' ||
                                    cidade.trim() === '' ||
                                    uf.trim() === '' ||
                                    email.trim() === '' ||
                                    situacao.trim() === '' ||
                                    numero <= 0 ||
                                    telefone.trim() === '' ||
                                    codigoFiscal.trim() === '' ||

                                    (typeof capacidade === "string" ? capacidade.trim() === '' : capacidade <= 0) ||
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
                        {loading ? 'Importando...' : '▶ Importar '}
                    </button>
                </div>
            </div>
            <Modal show={showModal} onHide={handleFechar} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Tem certeza de cadastrar esse Depósito?</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <div style={{ flex: 1.2 }}>
                            <label style={{ color: 'black' }}>CNPJ</label>
                            <Form.Control disabled defaultValue={cnpj} />
                        </div>
                        <div style={{ flex: 2 }}>
                            <label style={{ color: 'black' }}>Nome</label>
                            <Form.Control disabled defaultValue={nome} />
                        </div>
                    </div>

                    {/* Segunda linha */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <div style={{ flex: 2 }}>
                            <label style={{ color: 'black' }}>Fantasia</label>
                            <Form.Control disabled defaultValue={fantasia} />
                        </div>
                        <div style={{ flex: 2 }}>
                            <label style={{ color: 'black' }}>Endereço</label>
                            <Form.Control disabled defaultValue={endereco} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ color: 'black' }}>Número</label>
                            <Form.Control disabled defaultValue={numero} />
                        </div>
                    </div>

                    {/* Terceira linha */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        <div style={{ flex: '1 0 20%' }}>
                            <label style={{ color: 'black' }}>Bairro</label>
                            <Form.Control disabled defaultValue={bairro} />
                        </div>
                        <div style={{ flex: '1 0 20%' }}>
                            <label style={{ color: 'black' }}>Cidade</label>
                            <Form.Control disabled defaultValue={cidade} />
                        </div>
                        <div style={{ flex: '1 0 10%' }}>
                            <label style={{ color: 'black' }}>UF</label>
                            <Form.Control disabled defaultValue={uf} />
                        </div>
                        <div style={{ flex: '1 0 15%' }}>
                            <label style={{ color: 'black' }}>CEP</label>
                            <Form.Control disabled defaultValue={cep} />
                        </div>
                        <div style={{ flex: '1 0 20%' }}>
                            <label style={{ color: 'black' }}>Telefone</label>
                            <Form.Control disabled defaultValue={telefone} />
                        </div>
                    </div>

                    {/* Quarta linha */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        <div style={{ flex: '1 0 30%' }}>
                            <label style={{ color: 'black' }}>Email</label>
                            <Form.Control disabled defaultValue={email} />
                        </div>
                        <div style={{ flex: '1 0 1%' }}>
                            <label style={{ color: 'black' }}>Status</label>
                            <Form.Control disabled defaultValue={situacao} />
                        </div>

                    </div>
                    {/* Quinta linha */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                        <div style={{ flex: '1 0 20%' }}>
                            <label style={{ color: 'black' }}>Capacidade (m³)</label>
                            <Form.Control disabled defaultValue={capacidade} />
                        </div>
                        <div style={{ flex: '1 0 20%' }}>
                            <label style={{ color: 'black' }}>Código Fiscal</label>
                            <Form.Control disabled defaultValue={codigoFiscal} />
                        </div>
                        <div style={{ flex: '1 0 40%' }}>
                            <label style={{ color: 'black' }}>Produtos Restritos</label>
                            <Form.Control as="textarea" rows={3} disabled defaultValue={produtosRestritos} />
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
        </div>
    );
};


export default CadastroDeDeposito;