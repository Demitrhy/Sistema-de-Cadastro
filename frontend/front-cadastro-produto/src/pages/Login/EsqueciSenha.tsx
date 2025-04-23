import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { enviarCodigoAPI } from "../../api/Api";
import { toast } from "react-toastify";
interface Props {
    onSuccess: (contato: string) => void;
}

const EsqueciSenha: React.FC<Props> = ({ onSuccess }) => {
    const [email, setEmail] = useState("");
    const [codigo] = useState("");
    const [enviando, setEnviando] = useState(false);
    const navigate = useNavigate();

    // Função para validar o e-mail ou telefone
    const validar = (): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEnviarCodigo = async () => {
        if (!validar()) {
            toast.error(`Informe um email válido`);
            return;
        }

        setEnviando(true);
        localStorage.setItem("contato_usuario", email);

        try {
            navigate("/verificarCodigo");
            await enviarCodigoAPI(email, codigo);
            toast.success("Nova senha atualizada com sucesso!!")
        } catch (error) {
            toast.error("Erro ao enviar o código. Tente novamente.");
        } finally {
            setEnviando(false);
        }
    };

    return (

        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f0f0f0',
                flexDirection: 'column',
            }}
        >
            {/* Nome acima do card */}
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <span style={{ color: 'black', fontSize: '1.5rem' }}>{"<"}</span>
                <strong style={{ color: '#007bff', fontSize: '1.5rem', margin: '0 0.3rem' }}>Gustavo</strong>
                <span style={{ color: 'black', fontSize: '1.5rem' }}>/&gt;</span>
            </div>

            {/* Card central */}
            <div
                style={{
                    backgroundColor: 'white',
                    padding: '1.25rem',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    minWidth: '300px',
                    maxWidth: '500px',
                    width: '100%',
                }}
            >
                {/* Cabeçalho azul */}
                <div
                    style={{
                        backgroundColor: '#00008B',
                        borderRadius: '4px 4px 0 0',
                        marginBottom: '1.5rem',
                        textAlign: 'center',
                        padding: '0.5rem',
                        marginLeft: '-1.2rem',
                        marginRight: '-1.2rem',
                        marginTop: '-2rem',
                        paddingTop: '1rem',
                    }}
                >
                    <h2
                        style={{
                            color: 'white',
                            marginTop: '1px',
                            fontSize: '1.5rem',
                        }}
                    >
                        Recuperar Senha
                    </h2>
                </div>

                <h6>Para recuprar a senha por favor coloque seu email abaxio!</h6>

                {/* Input */}
                <div style={{ marginBottom: '2rem' }}>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: '#333',
                            fontWeight: 'bold',
                        }}
                    >
                        Email
                    </label>
                    <input
                        type={"email"}
                        placeholder={'Digite seu e-mail'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            outline: 'none',
                        }}
                    />
                </div>

                {/* Botão */}
                <button
                    style={{
                        width: '100%',
                        padding: '0.6rem',
                        backgroundColor: '#00008B',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                    }}
                    onClick={handleEnviarCodigo}
                    disabled={enviando}
                >
                 
                    {enviando ? "Enviando código..." : "Enviar código"}
                </button>
            </div>
        </div>


    );
};

export default EsqueciSenha;
