import { useState } from "react";
import { toast } from "react-toastify";
import { Fornecedores } from "../../interface/Fornecedor";
import { ImportarFornecedor } from "../../api/Api";
import { IMaskInput } from 'react-imask';
import { Button, Form, Modal } from "react-bootstrap";


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

    const handleUfChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUf(e.target.value);
    };
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSituacao(e.target.value);
    };
    const handleSituacaoCadastralChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSituacaoCadastral(e.target.value);
    };

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

    const status = [
        { sigla: 'A', nome: 'Ativo' },
        { sigla: 'D', nome: 'Desativado' }
    ]

    const situacaoCadastro = [
        { sigla: 'H', nome: 'Habilitado' },
        { sigla: 'D', nome: 'Desabilitado' }
    ]

    const estados = [
        { sigla: 'AC', nome: 'Acre' },
        { sigla: 'AL', nome: 'Alagoas' },
        { sigla: 'AP', nome: 'Amapá' },
        { sigla: 'AM', nome: 'Amazonas' },
        { sigla: 'BA', nome: 'Bahia' },
        { sigla: 'CE', nome: 'Ceará' },
        { sigla: 'DF', nome: 'Distrito Federal' },
        { sigla: 'ES', nome: 'Espírito Santo' },
        { sigla: 'GO', nome: 'Goiás' },
        { sigla: 'MA', nome: 'Maranhão' },
        { sigla: 'MT', nome: 'Mato Grosso' },
        { sigla: 'MS', nome: 'Mato Grosso do Sul' },
        { sigla: 'MG', nome: 'Minas Gerais' },
        { sigla: 'PA', nome: 'Pará' },
        { sigla: 'PB', nome: 'Paraíba' },
        { sigla: 'PR', nome: 'Paraná' },
        { sigla: 'PE', nome: 'Pernambuco' },
        { sigla: 'PI', nome: 'Piauí' },
        { sigla: 'RJ', nome: 'Rio de Janeiro' },
        { sigla: 'RN', nome: 'Rio Grande do Norte' },
        { sigla: 'RS', nome: 'Rio Grande do Sul' },
        { sigla: 'RO', nome: 'Rondônia' },
        { sigla: 'RR', nome: 'Roraima' },
        { sigla: 'SC', nome: 'Santa Catarina' },
        { sigla: 'SP', nome: 'São Paulo' },
        { sigla: 'SE', nome: 'Sergipe' },
        { sigla: 'TO', nome: 'Tocantins' },
    ];


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
                            <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>CNPJ:</label>
                            <IMaskInput
                                mask="00.000.000/0000-00"
                                value={cnpj}
                                onAccept={(value) => setCnpj(value)}
                                placeholder="00.000.000/0000-00"
                                style={{
                                    padding: '5px',
                                    fontSize: '16px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    width: '200px',
                                }}
                            />
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
                                    width: '800px',
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
                                    width: '350px',
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
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Endereço:</label>
                            <input
                                type="text"
                                placeholder="Endereço"
                                value={endereco}
                                onChange={(e) => setEndereco(e.target.value)}
                                style={{
                                    padding: '5px',
                                    fontSize: '16px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    width: '400px',
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Numero:</label>
                            <input
                                type="text"
                                placeholder="Numero"
                                value={numero}
                                onChange={(e) => setNumero(parseInt(e.target.value))}
                                style={{
                                    padding: '5px',
                                    fontSize: '16px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    width: '150px',
                                }}
                            />
                        </div>

                    </div>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Bairro:</label>
                            <input
                                type="text"
                                placeholder="Bairro"
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value)}
                                style={{
                                    padding: '5px',
                                    fontSize: '16px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    width: '400px',
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Cidade:</label>
                            <input
                                type="text"
                                placeholder="Cidade"
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                                style={{
                                    padding: '5px',
                                    fontSize: '16px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    width: '400px',
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>
                                UF:
                            </label>
                            <select
                                id="uf"
                                value={uf}
                                onChange={handleUfChange}
                                style={{
                                    padding: '5px',
                                    fontSize: '16px',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                    width: '240px',
                                }}
                            >
                                <option value="">Selecione uma UF</option>
                                {estados.map((estado) => (
                                    <option key={estado.sigla} value={estado.sigla}>
                                        {estado.nome} ({estado.sigla})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>CEP:</label>
                            <IMaskInput
                                mask="00000-000"
                                value={cep}
                                onAccept={(value) => setCep(value)}
                                placeholder="00000-000"
                                style={{
                                    padding: "5px",
                                    fontSize: "16px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                    width: "200px",
                                }} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Telefone:</label>
                            <IMaskInput
                                mask="(00)00000-0000"
                                value={telefone}
                                onAccept={(value) => setTelefone(value)}
                                placeholder="(85) 99483-7463"
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
                            <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Email:</label>
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                            <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Status:</label>
                            <select
                                id="situacao"
                                value={situacao}
                                onChange={handleStatusChange}
                                style={{
                                    padding: '5px',
                                    fontSize: '16px',
                                    borderRadius: '4px',
                                    appearance: 'textfield', // Firefox
                                    border: '1px solid #ccc',
                                    width: '170px',
                                }}>
                                <option value="">Selecione...</option>
                                {status.map((status) => (
                                    <option key={status.sigla} value={status.sigla}>
                                        {status.nome} ({status.sigla})
                                    </option>
                                ))}
                            </select>

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Situação Cadastral Virgente:</label>
                            <select
                                id="situacaoCadastral"
                                value={situacaoCadastral}
                                onChange={handleSituacaoCadastralChange}
                                style={{
                                    padding: '5px',
                                    fontSize: '16px',
                                    borderRadius: '4px',
                                    appearance: 'textfield', // Firefox
                                    border: '1px solid #ccc',
                                    width: '230px',
                                }}>
                                <option value="">Selecione...</option>
                                {situacaoCadastro.map((status) => (
                                    <option key={status.sigla} value={status.sigla}>
                                        {status.nome} ({status.sigla})
                                    </option>
                                ))}
                            </select>

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