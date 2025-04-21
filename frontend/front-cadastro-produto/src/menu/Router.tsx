// Menu.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import CadastroIndividual from '../pages/CadastroDeProdutos/CadastroIndividual';
import MeuPerfil from '../pages/Login/MeuPerfil';
import Login from '../pages/Login/Login';
import { PrivateRoute } from '../components/PrivateRoute';
import CadastroNovo from '../pages/Login/CadastroNovo';
import EsqueciSenha from '../pages/Login/EsqueciSenha';
import VerificarCodigo from '../pages/Login/VerificarCodigo';
import RedefinirSenha from '../pages/Login/RedefinirSenha';
import EditarMeuPerfil from '../pages/Login/EditarMeuPerfil';


const Home: React.FC = () => {
  const [pagina, setPagina] = useState<'individual' | 'perfil' | 'edit'>('individual');

  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [menuUsuarioAberto, setMenuUsuarioAberto] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const renderConteudo = () => {
    switch (pagina) {
      case 'individual':
        return <CadastroIndividual />;
      case 'perfil':
        return <MeuPerfil />;
      case 'edit':
        return <EditarMeuPerfil />;
      default:
        return null;
    }
  };


  const Sair = () => {
    navigate('/login')
  }


  // Fecha o dropdown do usuário ao clicar fora
  useEffect(() => {
    const handleClickFora = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuUsuarioAberto(false);
      }
    };

    document.addEventListener('mousedown', handleClickFora);
    return () => document.removeEventListener('mousedown', handleClickFora);
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* TopBar */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '12px 20px',
        borderBottom: '2px solid #e0e0e0',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
        position: 'relative'
      }}>
        {/* Lado esquerdo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#003366' }}>
            {"<Gustavo/>"}
          </div>

          {/* Dropdown Produto */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginLeft: '40px' }}>
            <button
              onClick={() => setDropdownAberto(!dropdownAberto)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#003366',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              Produto
              <span style={{ transform: dropdownAberto ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                ▼
              </span>
            </button>

            {dropdownAberto && (
              <div style={{
                position: 'absolute',
                top: '40px',
                left: '0',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                padding: '8px 0',
                minWidth: '220px',
                marginLeft: '-45px',
                zIndex: 10,
              }}>
                <div
                  onClick={() => {
                    setPagina('individual');
                    setDropdownAberto(false);
                  }}
                  style={{
                    padding: '12px 20px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    fontWeight: pagina === 'individual' ? 'bold' : 'normal',
                    color: '#003366',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  Cadastro Individual
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lado direito - Avatar e menu do usuário */}
        <div style={{ marginLeft: 'auto', position: 'relative' }} ref={menuRef}>
          <div
            style={{
              backgroundColor: '#003366',
              color: 'white',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={() => setMenuUsuarioAberto(!menuUsuarioAberto)}
          >
            G
          </div>

          {menuUsuarioAberto && (
            <div
              style={{
                position: 'absolute',
                top: '40px',
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                minWidth: '160px',
                zIndex: 1000,
                padding: '8px 0'
              }}
            >
              <button
                onClick={() => {
                  setPagina('perfil');
                  setMenuUsuarioAberto(false);
                }}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  textAlign: 'left',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer'
                }}
              >
                Meu perfil
              </button>
              <div style={{
                height: '1px',
                backgroundColor: '#ddd',
                margin: '4px 0'
              }} />
              <div
                onClick={() => {
                  setPagina('edit');
                  setDropdownAberto(false);
                }}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  textAlign: 'left',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer', color:"white"}}
              >
              Editar Perfil
              </div>
              <div style={{
                height: '1px',
                backgroundColor: '#ddd',
                margin: '4px 0'
              }} />
              <button
                onClick={Sair}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  textAlign: 'left',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer'
                }}
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Conteúdo da página */}
      <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {renderConteudo()}
      </main>
    </div>
  );
};

// Esse é o componente principal que define as rotas da aplicação
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/esqueciSenha" element={<EsqueciSenha onSuccess={function (contato: string): void { throw new Error('Function not implemented.'); }} />} />
      <Route path="/verificarCodigo" element={<VerificarCodigo />} />
      <Route path="/redefinirSenha" element={<RedefinirSenha />} />
      <Route path="/cadastro" element={<CadastroNovo children={undefined} />} />
      <Route path="/meuPerfil" element={<CadastroNovo children={undefined} />} />
      <Route path="/editarMeuPerfil" element={<EditarMeuPerfil />} />
      <Route
        path="/CadastroProduto"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      {/* Redirecionamento padrão */}
      <Route path="*" element={<Navigate to="/Login" />} />

    </Routes>
  );
};

export default AppRoutes;
