import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { enviarCodigoAPI, validarCodigoAPI } from "../../api/Api";

const VerificarCodigo = () => {
  const [codigos, setCodigo] = useState("");
  const [codigo] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [reenviando, setReenviando] = useState(false);
  const navigate = useNavigate();

  const handleVerificarCodigo = async () => {
  
    setEnviando(true);
  
    const contato = localStorage.getItem("contato_usuario");
  
    if (!codigos) {
      toast.error("Informe o código recebido.");
      setEnviando(false);
      return;
    }
  
    try {
      await validarCodigoAPI(contato, codigos);
      navigate("/redefinirSenha");
    } catch (error) {
      toast.error("Código inválido ou expirado. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

  const handleReenviarCodigo = async () => {
    const contato = localStorage.getItem("contato_usuario");
    setReenviando(true);
  
    try {
      await enviarCodigoAPI(contato, codigo);
      toast.success("Novo código enviado com sucesso!");
    } catch (error) {
      toast.error("Erro ao reenviar o código.");
    } finally {
      setReenviando(false);
    }
  };
  

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
            Verificação de Código
          </h2>
        </div>

         <h6>Para redefinir sua senha utilize o código que chegou no seu email</h6>
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 'bold' }}>
            Insira o código recebido:
            <input
              type="text"
              value={codigos}
              onChange={(e) => setCodigo(e.target.value)}
              disabled={enviando}
              placeholder="Digite o código"
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
            />
          </label>
          
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <button
            style={{ width: '100%', padding: '0.6rem', backgroundColor: '#00008B', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={handleVerificarCodigo}
            disabled={enviando}
          >
            {enviando ? "Verificando..." : "Verificar Código"}
          </button>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            style={{ background: 'none', border: 'none', color: '#00008B', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={handleReenviarCodigo}
            disabled={reenviando}
          >
            {reenviando ? "Reenviando..." : "Reenviar código"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificarCodigo;