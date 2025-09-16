import { useState } from "react";
import { toast } from "react-toastify";
import { Fornecedores } from "../../interface/Fornecedor";
import { ImportarFornecedor } from "../../api/Api";
import { IMaskInput } from 'react-imask';
import { Button, Form, Modal } from "react-bootstrap";
import Cep from "../../components/cep";
import Phone from "../../components/telefone";
import Cnpj from "../../components/cnpj";
import Status from "../../components/selectStatus";
import Uf from "../../components/selectUf";
import SituacaoCadastral from "../../components/selectSituacaoCadastro";
import Email from "../../components/email";
import Endereco from "../../components/endereco";
import Numero from "../../components/numero";
import Bairro from "../../components/bairro";
import Cidade from "../../components/cidade";


const CadastroDeFornecedor: React.FC = () => {
    const [nome, setNome] = useState("");
    const [naturezaJuridica, setNaturezaJuridica] = useState("");
    const [fantasia, setFantasia] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [inscricaoEstadual, setInscricaoEstadual] = useState(0);
    const [telefone, setTelefone] = useState("");
    const [cep, setCep] = useState("");
    const [email, setEmail] = useState("");
    const [endereco, setEndereco] = useState("");
    const [complemento, setComplemento] = useState("");
    const [numero, setNumero] = useState(0);
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [uf, setUf] = useState("");
    const [situacao, setSituacao] = useState("");
    const [observacoes, setObervacoes] = useState("");
    const [situacaoCadastral, setSituacaoCadastral] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);



    const limparCampos = () => {
        setCnpj("");
        setInscricaoEstadual(0);
        setTelefone("");
        setCep("");
        setNumero(0);
        setFantasia('');
        setNome('');
        setEmail("");
        setEndereco("");
        setComplemento("");
        setCidade("");
        setBairro("");
        setUf("");
        setSituacao("");
        setObervacoes("");
        setNaturezaJuridica("");
        setSituacaoCadastral("");
    };

    const Importa = async () => {
        const planilha: Fornecedores[] = [{
            nome: nome,
            cnpj: cnpj.replace(/\D/g, ''),
            inscricaoEstadual: inscricaoEstadual,
            fantasia: fantasia,
            endereco: endereco,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            cep: cep.replace(/\D/g, ''),
            telefone: telefone.replace(/\D/g, ''),
            email: email,
            complemento: complemento,
            observacoes: observacoes,
            situacao: situacao,
            situacaoCadastral: situacaoCadastral,
            naturezaJuridica: naturezaJuridica
        }];

        setLoading(true);
        try {
            await ImportarFornecedor(planilha);
            toast.success(' Fornecedor importado com sucesso!');
            limparCampos();
        } catch (erro) {
            toast.error(' Erro ao importar o Fornecedor.');

        } finally {
            setLoading(false);
        }

    }
    const handleImporta = () => {
        setShowModal(true);
    };

    const handleFechar = () => {
        setShowModal(false);
    };

    return (
        <>
            <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#003865' }}>Cadastro de Fornecedores </h2>
            <div style={{
                backgroundColor: '#f9f9f9',
                minHeight: '100vh',
                padding: '10px',
                fontFamily: 'sans-serif',
            }}>

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
                            <Cnpj value={cnpj} onChange={(e) => setCnpj(cnpj)} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Inscricão Estadual (IE):</label>
                            <input
                                type="text"
                                placeholder="Inscricão Estadual"
                                value={inscricaoEstadual}
                                onChange={(e) => setInscricaoEstadual(parseInt(e.target.value))}
                                style={{
                                    padding: '5px',
                                    fontSize: '16px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    width: '250px',
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Nome Empresarial:</label>
                            <input
                                type="text"
                                placeholder="Nome do Fornecedor"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                style={{
                                    padding: '5px',
                                    fontSize: '16px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    width: '700px',
                                }}
                            />
                        </div>

                    </div>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Natureza Jurídica:</label>
                            <input
                                type="text"
                                placeholder="Natureza Jurídica"
                                value={naturezaJuridica}
                                onChange={(e) => setNaturezaJuridica(e.target.value)}
                                style={{
                                    padding: '5px',
                                    fontSize: '16px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    width: '250px',
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Fantasia:</label>
                            <input
                                type="text"
                                placeholder="Fantasia"
                                value={fantasia}
                                onChange={(e) => setFantasia(e.target.value)}
                                style={{
                                    padding: '5px',
                                    fontSize: '16px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    width: '400px',
                                }}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Endereco value={endereco} onChange={setEndereco} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Numero value={numero} onChange={setNumero} />
                        </div>

                    </div>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Bairro value={bairro} onChange={setBairro} />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Cidade value={cidade} onChange={setCidade} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Uf value={uf} onChange={setUf} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Cep value={cep} onChange={(value) => setCep(cep)} />
                        </div>

                    </div>

                    <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Phone value={telefone} onChange={(value) => setTelefone(telefone)} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Email value={email} onChange={setEmail} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Status value={situacao} onChange={setSituacao} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <SituacaoCadastral value={situacaoCadastral} onChange={setSituacaoCadastral} />
                        </div>

                    </div>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Complemento: <small>(Opcional)</small></label>
                            <input
                                type="text"
                                value={complemento}
                                onChange={(e) => setComplemento(e.target.value)}
                                style={{
                                    padding: '5px',
                                    fontSize: '16px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    width: '600px',
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Observação: <small>(Opcional)</small></label>
                            <input
                                type="text"
                                value={observacoes}
                                onChange={(e) => setObervacoes(e.target.value)}
                                style={{
                                    padding: '5px',
                                    fontSize: '16px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    width: '600px',
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
                                inscricaoEstadual <= 0 ||
                                numero <= 0 ||
                                telefone.trim() === '' ||
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
                                        inscricaoEstadual <= 0 ||
                                        numero <= 0 ||
                                        telefone.trim() === '' ||
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
                                        inscricaoEstadual <= 0 ||
                                        numero <= 0 ||
                                        telefone.trim() === '' ||
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
                        <Modal.Title>Tem certeza de cadastrar esse fornecedor?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <div style={{ flex: 2 }}>
                                <label style={{ color: 'black' }}>Nome</label>
                                <Form.Control disabled defaultValue={nome} />
                            </div>
                            <div style={{ flex: 1.2 }}>
                                <label style={{ color: 'black' }}>CNPJ</label>
                                <Form.Control disabled defaultValue={cnpj} />
                            </div>
                            <div style={{ flex: 1.2 }}>
                                <label style={{ color: 'black' }}>Inscrição Estadual</label>
                                <Form.Control disabled defaultValue={inscricaoEstadual} />
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
                                <label style={{ color: 'black' }}>Situação Cadastral Virgente</label>
                                <Form.Control disabled defaultValue={situacaoCadastral} />
                            </div>
                            <div style={{ flex: '1 0 1%' }}>
                                <label style={{ color: 'black' }}>Status</label>
                                <Form.Control disabled defaultValue={situacao} />
                            </div>

                        </div>
                        {/* Quinta linha */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                            <div style={{ flex: '1 0 15%' }}>
                                <label style={{ color: 'black' }}>Natureza Jurídica:</label>
                                <Form.Control disabled defaultValue={naturezaJuridica} />
                            </div>
                            <div style={{ flex: '1 0 15%' }}>
                                <label style={{ color: 'black' }}>Complemento</label>
                                <Form.Control disabled defaultValue={complemento} />
                            </div>
                            <div style={{ flex: '1 0 15%' }}>
                                <label style={{ color: 'black' }}>Observação</label>
                                <Form.Control disabled defaultValue={observacoes} />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={Importa}
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
            </div >
        </>
    );
}
export default CadastroDeFornecedor;