import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { redefimirSenha } from "../../api/Api";

const RedefinirSenha = () => {
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [enviando, setEnviando] = useState(false);
    const navigate = useNavigate();

    const handleRedefimirSenha = async () => {
        setEnviando(true);

        const contato = localStorage.getItem("contato_usuario");
        if(senha != confirmarSenha){
            toast.error("A senha está diferente.");
        }

        try {
            await redefimirSenha(contato,senha)
            navigate("/login")
        } catch (error) {
            toast.error("Falha ao redefimir a senha ");
        } finally {
            setEnviando(false);
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0', flexDirection: 'column' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <span style={{ color: 'black', fontSize: '1.5rem' }}>{"<"}</span>
                <strong style={{ color: '#007bff', fontSize: '1.5rem', margin: '0 0.3rem' }}>Gustavo</strong>
                <span style={{ color: 'black', fontSize: '1.5rem' }}>/&gt;</span>
            </div>

            <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', minWidth: '300px', maxWidth: '500px', width: '100%' }}>
                <div style={{ backgroundColor: '#00008B', borderRadius: '4px 4px 0 0', marginBottom: '1.5rem', textAlign: 'center', padding: '0.5rem', marginLeft: '-1.2rem', marginRight: '-1.2rem', marginTop: '-2rem', paddingTop: '1rem' }}>
                    <h2 style={{ color: 'white', marginTop: '1px', fontSize: '1.5rem' }}>
                        Redefinir Senha
                    </h2>
                </div>


                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 'bold' }}>
                        Senha
                        <input
                            type="text"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}

                            placeholder="Digite a senha"
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
                        />
                    </label>

                </div>
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 'bold' }}>
                        Confirma Senha
                        <input
                            type="text"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            placeholder="confirme a senha"
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
                        />
                    </label>

                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <button
                        style={{ width: '100%', padding: '0.6rem', backgroundColor: '#00008B', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={handleRedefimirSenha}
                        disabled={enviando}
                    >
                        {enviando ? "Mudando senha..." : "Alterar senha"}
                    </button>
                </div>

            </div>
        </div>
    );

}

export default RedefinirSenha