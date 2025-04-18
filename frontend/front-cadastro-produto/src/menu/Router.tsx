// Menu.tsx
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import CadastroIndividual from '../pages/CadastroDeProdutos/CadastroIndividual';
import Login from '../pages/Login/Login';
import { PrivateRoute } from '../components/PrivateRoute';
import CadastroNovo from '../pages/Login/CadastroNovo';

const Home: React.FC = () => {
  const [pagina, setPagina] = useState<'individual' | 'fornecedor'>('individual');
  const [menuAberto, setMenuAberto] = useState(false);
  const [submenuProdutoAberto, setSubmenuProdutoAberto] = useState(false);

  const renderConteudo = () => {
    switch (pagina) {
      case 'individual':
        return <CadastroIndividual />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      {/* Menu lateral */}
      <aside
        style={{
          width: menuAberto ? '190px' : '50px',
          backgroundColor: '#f1f1f1',
          padding: '10px',
          borderRight: '1px solid #ccc',
          position: 'relative',
          transition: 'width 0.3s',
        }}
      >
        <button onClick={() => setMenuAberto(!menuAberto)}>
          {menuAberto ? '◀' : '▶'}
        </button>

        {/* Menu Produto */}
        <div
          style={{
            marginTop: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
          onClick={() => {
            if (!menuAberto) {
              setSubmenuProdutoAberto(!submenuProdutoAberto);
            }
          }}
        >
          <span>📦</span>
          {menuAberto && <strong>Produto</strong>}
        </div>

        {/* Submenu */}
        {menuAberto && (
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
            <li
              style={{
                cursor: 'pointer',
                marginBottom: '10px',
                color: pagina === 'individual' ? '#007bff' : '#333',
              }}
              onClick={() => setPagina('individual')}
            >
              Cadastro Individual
            </li>
          </ul>
        )}
      </aside>

      {/* Bloco flutuante do submenu */}
      {!menuAberto && submenuProdutoAberto && (
        <div style={{
          position: 'absolute',
          left: '70px',
          top: '80px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 10,
        }}>
          <div
            onClick={() => {
              setPagina('individual');
              setSubmenuProdutoAberto(false);
            }}
            style={{
              backgroundColor: '#fff',
              padding: '10px 20px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              minWidth: '200px',
              whiteSpace: 'nowrap',
            }}
          >
            Cadastro Individual
          </div>
        </div>
      )}

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
      <Route path="/cadastro" element={<CadastroNovo children={undefined}  />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      {/* Redirecionamento padrão */}
      <Route path="*" element={<Navigate to="/home" />} />

    </Routes>
  );
};

export default AppRoutes;
