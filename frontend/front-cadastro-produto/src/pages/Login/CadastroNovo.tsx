import { useState } from "react";
import { CadastroLogin } from "../../interface/Produto";
import { toast } from "react-toastify";
import { CadastroLoginNovo } from "../../api/Api";
import { Link } from "react-router-dom";


interface CadastroNovoProps {
    children: React.ReactNode;
}

const CadastroNovo: React.FC<CadastroNovoProps> = ({ children }) => {
    const [cadastro, setCadastro] = useState<CadastroLogin>();
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const NovoCadastroLogin = async () => {
        if (!nome || !sobrenome || !telefone || !email || !password) {
            toast.warning('Preencha todos os campos');
            return;
        }
    
        const novoCadastro: CadastroLogin = {
            nome,
            sobreNome: sobrenome.trim(),
            telefone,
            email,
            senha: password.trim()
        };
    
        try {
            setCadastro(novoCadastro);
            console.log("Enviando cadastro:", novoCadastro);
            await CadastroLoginNovo(novoCadastro);
            toast.success("Cadastro realizado com sucesso!");
        } catch (error) {
            toast.error('Erro ao cadastrar. Verifique os dados e tente novamente.');
        }
    };
    
    return (

        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundColor: '#f0f0f0',
                    flexDirection: 'column',
                    padding: '1rem',
                }}
            >
                {/* Nome acima do card */}
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <span style={{ color: 'black', fontSize: '1em' }}>{"<"}</span>
                    <strong style={{ color: '#007bff', fontSize: '1.5em', margin: '0 0.3em' }}>Gustavo</strong>
                    <span style={{ color: 'black', fontSize: '1em' }}>/&gt;</span>
                </div>

                {/* Card de login */}
                <div
                    style={{
                        backgroundColor: 'white',
                        padding: '1.5rem', /* Diminui um pouco o padding interno em telas menores */
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        width: '100%', /* O card ocupa 90% da largura */
                        maxWidth: '400px', /* Largura máxima do card */
                    }}
                >
                    {/* Cabeçalho azul */}
                    <div
                        style={{
                            backgroundColor: '#00008B',
                            borderRadius: '4px 4px 0 0',
                            marginBottom: '1.5rem',
                            textAlign: 'center',
                            padding: '0.8rem 0.5rem', /* Ajusta o padding do cabeçalho */
                            marginLeft: '-1.5rem',
                            marginRight: '-1.5rem',
                            marginTop: '-2rem',
                            paddingTop: '0.5rem',
                        }}
                    >
                        <h2
                            style={{
                                color: 'white',
                                margin: 0,
                                fontSize: '1.2rem', /* Diminui um pouco a fonte do título */
                            }}
                        >
                            Cadastro Novo Login
                        </h2>
                    </div>

                    {/* Formulário */}
                    <div style={{ marginBottom: '0.8rem' }}>
                        <label
                            style={{ display: 'block', marginBottom: '0.3rem', color: '#00008B', fontSize: '0.9rem' }}
                            htmlFor="nome"
                        >
                            Nome
                        </label>
                        <input
                            style={{
                                width: '100%', /* O input ocupa a largura total do card */
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                            }}
                            id="nome"
                            type="nome"
                            placeholder="Digite seu nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div style={{ marginBottom: '0.8rem' }}>
                        <label
                            style={{ display: 'block', marginBottom: '0.3rem', color: '#00008B', fontSize: '0.9rem' }}
                            htmlFor="sobrenome"
                        >
                            Sobrenome
                        </label>
                        <input
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                            }}
                            id="sobrenome"
                            type="sobrenome"
                            placeholder="Digite seu sobrenome"
                            value={sobrenome}
                            onChange={(e) => setSobrenome(e.target.value)}
                        />
                    </div>
                    <div style={{ marginBottom: '0.8rem' }}>
                        <label
                            style={{ display: 'block', marginBottom: '0.3rem', color: '#00008B', fontSize: '0.9rem' }}
                            htmlFor="telefone"
                        >
                            Telefone
                        </label>
                        <input
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                            }}
                            id="telefone"
                            type="telefone"
                            placeholder="Digite seu telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                    </div>
                    <div style={{ marginBottom: '0.8rem' }}>
                        <label
                            style={{ display: 'block', marginBottom: '0.3rem', color: '#00008B', fontSize: '0.9rem' }}
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                            }}
                            id="email"
                            type="email"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div style={{ marginBottom: '0.8rem' }}>
                        <label
                            style={{ display: 'block', marginBottom: '0.3rem', color: '#00008B', fontSize: '0.9rem' }}
                            htmlFor="password"
                        >
                            Senha
                        </label>
                        <input
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                            }}
                            id="password"
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        style={{
                            width: '100%',
                            padding: '0.8rem',
                            backgroundColor: '#00008B',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                        }}
                        onClick={NovoCadastroLogin}
                    >
                        Entrar
                    </button>

                    <div style={{ textAlign: "center", marginTop: "15px", fontSize: "0.8rem" }}>
                        <p style={{ marginBottom: '0.3rem' }}>Já tem o cadastro?</p>
                        <Link to="/login" style={{ color: "blue", fontWeight: "bold", textDecoration: "none" }}>
                            Voltar ao inicio
                        </Link>
                    </div>
                </div>
            </div>


        </>
    );
}
export default CadastroNovo;