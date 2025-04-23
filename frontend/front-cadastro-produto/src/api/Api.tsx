
import axios from 'axios';
import { CadastroLogin, Produto } from '../interface/Produto';


const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


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
    console.error('Erro ao fazer login:', error);
    throw error;
  }
}
export async function CadastroLoginNovo(cadastro: CadastroLogin): Promise<void> {
  try {
    await api.post('/Auth/register', cadastro);
  } catch (error) {
    console.error('Erro ao fazer register:', error);
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
    console.error("Erro ao buscar produtos:", error);
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
    console.error("Erro ao enviar código:", error);
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
    console.error("Erro ao validar código:", error);
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
    console.error("Erro ao validar código:", error);
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
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
}

