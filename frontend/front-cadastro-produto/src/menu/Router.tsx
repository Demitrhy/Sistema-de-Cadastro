import React, { ElementType, useState } from 'react';
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  Divider,
  Icon,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaBoxes, FaTruck, FaWarehouse, FaChartBar, FaClipboardList } from 'react-icons/fa';
import CadastroIndividual from '../pages/CadastroDeProdutos/CadastroIndividual';
import MeuPerfil from '../pages/Login/MeuPerfil';
import EditarMeuPerfil from '../pages/Login/EditarMeuPerfil';
import CadastroDeFornecedor from '../pages/Fornecedor/CadastroDeFornecedor';
import Relatorio from '../pages/Relatórios/relatorio';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import CadastroDeposito from '../pages/Deposito/CadastroDeposito';
import Login from '../pages/Login/Login';
import EsqueciSenha from '../pages/Login/EsqueciSenha';
import VerificarCodigo from '../pages/Login/VerificarCodigo';
import RedefinirSenha from '../pages/Login/RedefinirSenha';
import CadastroNovo from '../pages/Login/CadastroNovo';
import { PrivateRoute } from '../components/PrivateRoute';
import ProdutoDeposito from '../pages/ControleDeProduto/ProdutoDeposito';

const Router: React.FC = () => {
  const [pagina, setPagina] = useState<'home' | 'individual' | 'produtoDeposito' | 'perfil' | 'edit' | 'fornecedor' | 'deposito' | 'relatorio'>('home');
  const navigate = useNavigate();

  const renderConteudo = () => {
    switch (pagina) {
      case 'individual': return <CadastroIndividual />;
      case 'fornecedor': return <CadastroDeFornecedor />;
      case 'deposito': return <CadastroDeposito />;
      case 'produtoDeposito': return <ProdutoDeposito />;
      case 'perfil': return <MeuPerfil />;
      case 'relatorio': return <Relatorio />;
      case 'edit': return <EditarMeuPerfil />;
      default: return null;
    }
  };
  

  const Sair = () => navigate('/login');

  return (
    <Flex direction="column" height="100vh" fontFamily="sans-serif">
      {/* TopBar */}
      <Flex
        as="header"
        align="center"
        bg="blue.50"
        px={6}
        py={3}
        borderBottom="2px solid"
        borderColor="gray.200"
        boxShadow="sm"
        zIndex={100}
      >
        {/* Logo */}
     
        <Box
          fontWeight="bold"
          fontSize="xl"
          color="blue.800"
          mr={8}
          cursor="pointer"
          onClick={() => setPagina('home')}
        >
          {"<Gustavo/>"}
        </Box>

        {/* Menus */}
        <Flex gap={6}>
          <Menu>
            <MenuButton
              as={Button}
              leftIcon={<Icon as={FaBoxes as ElementType} />} 
              variant="ghost"
              fontWeight="bold"
              color="blue.800"
              rightIcon={<ChevronDownIcon />}
            >
              Produto
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setPagina('individual')}>Cadastro Produto</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
               leftIcon={<Icon as={FaTruck as ElementType} />}
              fontWeight="bold"
              color="blue.800"
              rightIcon={<ChevronDownIcon />}
            >
              Fornecedor
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setPagina('fornecedor')}>Cadastro Fornecedor</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              fontWeight="bold"
                leftIcon={<Icon as={FaWarehouse as ElementType} />}
              color="blue.800"
              rightIcon={<ChevronDownIcon />}
            >
              Depósito
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setPagina('deposito')}>Cadastro Depósito</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              fontWeight="bold"
                leftIcon={<Icon as={FaClipboardList  as ElementType} />}
              color="blue.800"
              rightIcon={<ChevronDownIcon />}
            >
              Controle de Produtos
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setPagina('produtoDeposito')}>Cadastro Produto Depósito</MenuItem>
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              fontWeight="bold"
                leftIcon={<Icon as={FaChartBar as ElementType} />}
              color="blue.800"
              rightIcon={<ChevronDownIcon />}
            >
              Relatórios
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setPagina('relatorio')}>Relatórios</MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        {/* Espaço flexível entre menus e avatar */}
        <Box flex="1" />

        {/* Menu do usuário */}
        <Menu>
          <MenuButton
            as={Button}
            rounded="full"
            variant="ghost"
            cursor="pointer"
            minW={0}
            aria-label="Usuário"
          >
            <Avatar size="sm" name="Gustavo" bg="blue.800" />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setPagina('perfil')}>Meu perfil</MenuItem>
            <MenuItem onClick={() => setPagina('edit')}>Editar Perfil</MenuItem>
            <Divider />
            <MenuItem onClick={Sair}>Sair</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      {/* Conteúdo */}
      <Box flex="1" p={6} overflowY="auto" position="relative" zIndex={1}>
        {renderConteudo()}
      </Box>
    </Flex>
  );
};

export default Router;

// const AppRoutes: React.FC = () => {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/esqueciSenha" element={<EsqueciSenha onSuccess={function (contato: string): void { throw new Error('Function not implemented.'); }} />} />
//       <Route path="/verificarCodigo" element={<VerificarCodigo />} />
//       <Route path="/redefinirSenha" element={<RedefinirSenha />} />
//       <Route path="/deposito" element={<CadastroDeposito />} />
//       <Route path="/produtoDeposito" element={<ProdutoDeposito />} />
//       <Route path="/fornecedor" element={<CadastroDeFornecedor />} />
//       <Route path="/cadastro" element={<CadastroNovo children={undefined} />} />
//       <Route path="/editarMeuPerfil" element={<EditarMeuPerfil />} />
//       <Route
//         path="/CadastroProduto"
//         element={
//           <PrivateRoute>
//             <Router />
//           </PrivateRoute>
//         }
//       />
//       {/* Redirecionamento padrão */}
//       <Route path="*" element={<Navigate to="/Login" />} />

//     </Routes>
//   );
// };
// export default AppRoutes;
