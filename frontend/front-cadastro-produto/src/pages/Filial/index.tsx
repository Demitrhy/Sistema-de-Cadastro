import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Cnpj from "../../components/cnpj";
import Endereco from "../../components/endereco";
import Nome from "../../components/nome";
import Numero from "../../components/numero";
import Bairro from "../../components/bairro";
import Cidade from "../../components/cidade";
import Uf from "../../components/selectUf";
import Phone from "../../components/telefone";
import Email from "../../components/email";
import Cep from "../../components/cep";
import Status from "../../components/selectStatusProd";
import { Deposito } from "../../interface/Deposito";
import api from '../../components/Axios';
import { toast } from "react-toastify";
import { Filial } from "../../interface/Filial";
import { ImportaNovaFilial } from "../../api/Api";

const CadastroFilial: React.FC = () => {
    const [codigoFilial, setCodigoFilial] = useState<number | ''>('');
    const [codigoBloqueado, setCodigoBloqueado] = useState(false);
    const [nomeFantasia, setNomeFantasia] = useState<string>("");
    const [razaoSocial, setRazaoSocial] = useState<string>("");
    const [cnpj, setCnpj] = useState<string>("");
    const [inscricaoEstadual, setInscricaoEstadual] = useState<number>(0);
    const [inscricaoMunicipal, setInscricaoMunicipal] = useState<number>(0);
    const [logradouro, setLogradouro] = useState<string>("");
    const [numero, setNumero] = useState<number>(0);
    const [bairro, setBairro] = useState<string>("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");
    const [cep, setCep] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [dataAbertura, setDataAbertura] = useState<string>("");
    const [situacao, setSituacao] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [deposito, setDeposito] = useState<Array<Deposito>>([]);
    const [depositoSelecionado, setDepositoSelecionado] = useState<number | null>(null);
    const [carregado, setCarregado] = useState(false);
    const [produtoAutomatico] = useState(false);
    const handleImporta = () => setShowModal(true);
    const handleFechar = () => setShowModal(false);

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

    const LimparCampos = () => {
        setCodigoFilial('');
        setCodigoBloqueado(false);
        setNomeFantasia('');
        setRazaoSocial('');
        setCnpj('');
        setInscricaoEstadual(0);
        setInscricaoMunicipal(0);
        setLogradouro('');
        setNumero(0);
        setBairro('');
        setCidade('');
        setUf('');
        setCep('');
        setTelefone('');
        setEmail('');
        setDataAbertura('');
        setSituacao('');
        setDepositoSelecionado(null)
    };


    const Importar = async () => {
        setLoading(true);

        const planilha: Filial = {
            codigoFilial: (produtoAutomatico || codigoBloqueado) ? 0 : Number(codigoFilial),
            codigoBloqueado: codigoBloqueado,
            nomeFantasia: nomeFantasia,
            razaoSocial: razaoSocial,
            cnpj: cnpj.replace(/\D/g, ''),
            inscricaoEstadual: inscricaoEstadual,
            inscricaoMunicipal: inscricaoMunicipal,
            logradouro: logradouro,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            uf: uf,
            telefone: telefone.replace(/\D/g, ''),
            cep: cep.replace(/\D/g, ''),
            email: email,
            dataAbertura: dataAbertura,
            situacao: situacao,
            codigoDeposito: depositoSelecionado ?? '',
            complemento: "Sistema"
        };

        try {

            await ImportaNovaFilial(planilha);
            toast.success("Filial importado com sucesso!");
            LimparCampos();
            setLoading(false);
            setShowModal(false);
        }
        catch (error) {
            toast.error("Erro ao importar Filial");
        } finally {
            setLoading(false);
            setShowModal(false);
            LimparCampos();
        }
    }

    return (
        <div style={{ backgroundColor: "#f9f9f9", padding: "10px" }}>
            <h2 style={{ fontSize: "18px", marginBottom: "20px", color: "#003865" }}>
                Cadastro de Filial
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
                        <Cnpj value={cnpj} onChange={setCnpj} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Inscricão Estadual (IE):</label>
                        <input
                            type="number"
                            placeholder="Inscricão Estadual"
                            value={inscricaoEstadual}
                            onChange={(e) => setInscricaoEstadual(parseInt(e.target.value))}
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
                        <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Inscricão Municipal (IM):</label>
                        <input
                            type="number"
                            placeholder="Inscricão Municipal"
                            value={inscricaoMunicipal}
                            onChange={(e) => setInscricaoMunicipal(parseInt(e.target.value))}
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
                        <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Código Filial</label>
                        <input
                            type="number"
                            placeholder="Código Filial"
                            value={codigoFilial}
                            onChange={(e) => setCodigoFilial(e.target.value === '' ? '' : parseInt(e.target.value))}
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
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Nome:</label>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={razaoSocial}
                            onChange={(e) => setRazaoSocial(e.target.value)}
                            style={{
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                width: '340px',
                            }}
                        />
                    </div>
                </div>

                <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ fontWeight: "bold", marginBottom: "6px" }}>Fantasia:</label>
                        <input
                            type="text"
                            placeholder="Fantasia"
                            value={nomeFantasia}
                            onChange={(e) => setNomeFantasia(e.target.value)}
                            style={{
                                padding: "5px",
                                fontSize: "16px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                width: "500px",
                            }}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Endereco value={logradouro} onChange={setLogradouro} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Numero value={numero} onChange={setNumero} />
                    </div>
                </div>
                <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>

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
                        <Cep value={cep} onChange={setCep} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Phone value={telefone} onChange={setTelefone} />
                    </div>

                </div>


                <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Email value={email} onChange={setEmail} />
                    </div>


                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Status value={situacao} onChange={setSituacao} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>Deposito </label>
                        <select
                            value={depositoSelecionado ?? ''}
                            onChange={(e) => setDepositoSelecionado(Number(e.target.value))}
                            style={{
                                padding: '5px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                width: '350px',
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

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ fontWeight: "bold", marginBottom: "6px" }}>
                            Data Abertura:
                        </label>
                        <input
                            type="date"
                            value={dataAbertura}
                            onChange={(e) => setDataAbertura(e.target.value)}
                            style={{
                                padding: "5px",
                                fontSize: "16px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                width: "200px",
                            }}
                        />
                    </div>

                </div>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', justifyContent: 'flex-end' }}>
                    <button
                        onClick={() => handleImporta()}
                        disabled={
                            nomeFantasia.trim() === '' ||
                            razaoSocial.trim() === '' ||
                            cnpj.trim() === '' ||
                            inscricaoEstadual <= 0 ||
                            inscricaoMunicipal <= 0 ||
                            logradouro.trim() === '' ||
                            bairro.trim() === '' ||
                            cidade.trim() === '' ||
                            uf.trim() === '' ||
                            cep.toString().trim() === '' ||

                            telefone.toString().trim() === '' ||
                            email.trim() === '' ||
                            deposito.length <= 0 ||
                            situacao.trim() === '' ||
                            numero <= 0 ||
                            loading
                        }
                        style={{
                            opacity:
                                nomeFantasia.trim() === '' ||
                                    razaoSocial.trim() === '' ||
                                    cnpj.trim() === '' ||
                                    inscricaoEstadual <= 0 ||
                                    inscricaoMunicipal <= 0 ||
                                    logradouro.trim() === '' ||
                                    bairro.trim() === '' ||
                                    cidade.trim() === '' ||
                                    uf.trim() === '' ||
                                    cep.toString().trim() === '' ||

                                    telefone.toString().trim() === '' ||
                                    email.trim() === '' ||
                                    deposito.length <= 0 ||
                                    situacao.trim() === '' ||
                                    numero <= 0 ||
                                    loading
                                    ? 0.5
                                    : 1,
                            cursor:
                                nomeFantasia.trim() === '' ||
                                    razaoSocial.trim() === '' ||
                                    cnpj.trim() === '' ||
                                    inscricaoEstadual <= 0 ||
                                    inscricaoMunicipal <= 0 ||
                                    logradouro.trim() === '' ||
                                    bairro.trim() === '' ||
                                    cidade.trim() === '' ||
                                    uf.trim() === '' ||
                                    cep.toString().trim() === '' ||

                                    telefone.toString().trim() === '' ||
                                    email.trim() === '' ||
                                    deposito.length <= 0 ||
                                    situacao.trim() === '' ||
                                    numero <= 0 ||
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
                    <Modal.Title>Tem certeza de cadastrar essa Filial?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Primeira linha */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <div style={{ flex: 1.2 }}>
                            <label style={{ color: 'black' }}>CNPJ</label>
                            <Form.Control
                                disabled
                                defaultValue={cnpj}
                            />
                        </div>
                        <div style={{ flex: '1 0 20%' }}>
                            <label style={{ color: 'black' }}>Código Filial</label>
                            <Form.Control disabled defaultValue={codigoFilial} />
                        </div>
                        <div style={{ flex: 2 }}>
                            <label style={{ color: 'black' }}>Nome</label>
                            <Form.Control
                                disabled
                                defaultValue={razaoSocial}
                            />
                        </div>
                    </div>

                    {/* Segunda linha */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>

                        <div style={{ flex: 2 }}>
                            <label style={{ color: 'black' }}>Fantasia</label>
                            <Form.Control disabled defaultValue={nomeFantasia} />
                        </div>
                        <div style={{ flex: '1 0 20%' }}>
                            <label style={{ color: 'black' }}>Código Depósito</label>
                            <Form.Control disabled defaultValue={depositoSelecionado ?? ''} />
                        </div>
                        <div style={{ flex: '1 0 20%' }}>
                            <label style={{ color: 'black' }}>Inscrição Estadual</label>
                            <Form.Control disabled defaultValue={inscricaoEstadual} />
                        </div>
                        <div style={{ flex: '1 0 20%' }}>
                            <label style={{ color: 'black' }}>Inscrição Municipal</label>
                            <Form.Control disabled defaultValue={inscricaoMunicipal} />
                        </div>

                    </div>

                    {/* Terceira linha */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>

                        <div style={{ flex: '1 0 20%' }}>
                            <label style={{ color: 'black' }}>Endereço</label>
                            <Form.Control disabled defaultValue={logradouro} />
                        </div>

                        <div style={{ flex: '1 0 20%' }}>
                            <label style={{ color: 'black' }}>Número</label>
                            <Form.Control disabled defaultValue={numero} />
                        </div>

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
                        <div style={{ flex: '1 0 30%' }}>
                            <label style={{ color: 'black' }}>Email</label>
                            <Form.Control disabled defaultValue={email} />
                        </div>
                        <div style={{ flex: '1 0 1%' }}>
                            <label style={{ color: 'black' }}>Status</label>
                            <Form.Control disabled defaultValue={situacao} />
                        </div>

                        <div style={{ flex: '1 0 20%' }}>
                            <label style={{ color: 'black' }}>Data Abertura</label>
                            <Form.Control disabled defaultValue={dataAbertura} />
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
        </div >

    );
}
export default CadastroFilial;