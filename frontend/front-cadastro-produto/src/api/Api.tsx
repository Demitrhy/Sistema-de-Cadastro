
import { CadastroLogin } from '../interface/User';
import {  Produto } from '../interface/Produto';
import { Fornecedores } from '../interface/Fornecedor';
import { toast } from 'react-toastify';
import { Deposito } from '../interface/Deposito';
import  api  from '../components/Axios';  


export async function login(email: string, senha: string): Promise<string> {
  try {
    const response = await api.post('/Auth/login', {
      email,
      senha,
    });

    const token = response.data?.token;

    if (token) {
      localStorage.setItem('token', token);
      return token;
    } else {
      throw new Error('Token não encontrado na resposta');
    }
  } catch (error) {
    toast.error('Erro ao fazer login:');
    throw error;
  }
}
export async function CadastroLoginNovo(cadastro: CadastroLogin): Promise<void> {
  try {
    await api.post('/Auth/register', cadastro);
  } catch (error) {
    toast.error('Erro ao fazer register:');
    throw error;
  }
}

export async function Importar(produtos: Produto[]): Promise<void> {
  try {
    await api.post('/Produto/Importar', produtos);
  } catch (error) {
    throw error;
  }
}

export async function EditarProduto
  (
    dados: {
      produto: number | undefined;
      digito: number | undefined;
      liquido: number;
      comissao: number;
      precoVenda: number;
      percLucro: number;
      custo: number;
    }): Promise<void> {
  try {
    await api.put('/Produto/Editar', dados
    );
  } catch (error) {
    throw error;
  }
}

export async function ExcluirProduto
  (
    dados: {
      produto: number | undefined;
      digito: number | undefined;
    }): Promise<void> {
  try {
    console.log("passei por aqui",dados)
    await api.delete('/Produto/Excluir',  {
      data: dados
    });
  } catch (error) {
    throw error;
  }
}

export async function EditarUsuario(
  dadosAtualizados: {
    id: number | undefined;
    nome: string;
    sobrenome: string;
    telefone: number;
    email: string;
    senha: string;
  }): Promise<void> {
  try {
    console.log(dadosAtualizados)
    await api.put('/Auth/EditarUsuario', dadosAtualizados
    );
  } catch (error) {
    throw error;
  }
}

export async function BuscarProdutos(): Promise<Produto[]> {
  try {
    const response = await api.get<Produto[]>('/Produto/BuscarProdutosExistente');
    return response.data;
  } catch (error) {
    toast.error("Erro ao buscar produtos:");
    throw error;
  }
}


export async function enviarCodigoAPI(email: string | null, codigo: string): Promise<void> {
  try {
    await api.post('/Codigo/enviarCodigo', {
      email,
      codigo: "0"
    });
  } catch (error) {
    toast.error("Erro ao enviar código:");
    throw error;
  }
}

export async function validarCodigoAPI(email: string | null, codigo: string | null): Promise<void> {
  try {

    await api.post('/Codigo/validarCodigo', {
      email,
      codigo
    });
  } catch (error) {
    toast.error("Erro ao validar código:");
    throw error;
  }
}

export async function redefimirSenha(email: string | null, senha: string): Promise<void> {
  try {

    await api.post('/Codigo/redefimirSenha', {
      email,
      senha
    });
  } catch (error) {
    toast.error("Erro ao validar código:");
    throw error;
  }
}

type Usuario = {
  id: number;
  nome: string;
  sobrenome: string;
  telefone: number;
  email: string;

};

export async function BuscarUsuario(): Promise<Usuario[]> {
  try {
    const response = await api.get<Usuario[]>('/Auth/BuscarUsuario');
    return response.data;
  } catch (error) {
    toast.error("Erro ao buscar produtos:");
    throw error;
  }
}


// Fornecedor
export async function ImportarFornecedor(forn: Fornecedores[]): Promise<void> {
  try {
    await api.post('/Fornecedor/InserirNovoFornecedor', forn);
  } catch (error) {
    throw error;
  }
}

// Deposito
export async function ImportaNovoDeposito(deposito: Deposito[]): Promise<void> {
  try {
    await api.post('/Deposito/InserirNovoDeposito', deposito);
  } catch (error) {
    throw error;
  }
}

// Produto Deposito
export async function ImportaNovoProdutoDeposito(planilha:any): Promise<void> {
  try {
    await api.post('/ProdutoDeposito/InserirNovoProdutoDeposito', planilha);
  } catch (error) {
    throw error;
  }
}