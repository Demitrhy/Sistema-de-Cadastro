import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CadastroNovo from './CadastroNovo';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            toast.warning('Preencha todos os campos');
            return;
        }

        try {
            await login(email, password);
            navigate('/home');
        } catch (error) {
            toast.error('Usuário ou senha inválidos');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleLogin();
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

            {/* Card de login */}
            <div
                style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    minWidth: '300px',
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
                        marginLeft: '-2rem',
                        marginRight: '-2rem',
                        marginTop: '-2rem',
                        paddingTop: '1rem',
                    }}
                >
                    <h2
                        style={{
                            color: 'white',
                            margin: 0,
                            fontSize: '1.5rem',
                        }}
                    >
                        Login
                    </h2>
                </div>

                {/* Formulário */}
                <div style={{ marginBottom: '1rem' }}>
                    <label
                        style={{ display: 'block', marginBottom: '0.5rem', color: '#00008B' }}
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        style={{
                            width: '350px',
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            fontSize: '1rem',
                        }}
                        id="email"
                        type="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label
                        style={{ display: 'block', marginBottom: '0.5rem', color: '#00008B' }}
                        htmlFor="password"
                    >
                        Senha
                    </label>
                    <input
                        style={{
                            width: '350px',
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            fontSize: '1rem',
                        }}
                        id="password"
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                </div>

                <div style={{ textAlign: 'right', marginBottom: '1rem', fontSize: '0.9rem' }}>
                    <a href="/forgot-password">Esqueceu a senha?</a>
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
                    onClick={handleLogin}
                >
                    Entrar
                </button>

                <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
                    <p style={{ margin: 0 }}>Ainda não é cadastro?</p>
                    <Link
                        to="/cadastro"
                        style={{
                            color: "blue",
                            fontWeight: "bold",
                            textDecoration: "none",
                            display: "block",
                            marginTop: "5px",
                        }}
                    >
                        Comece aqui
                    </Link>
                </div>

            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>

    );
};

export default LoginPage;