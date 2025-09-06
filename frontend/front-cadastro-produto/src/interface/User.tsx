
export interface Usuario {
    id: number;
    nome: string;
    sobrenome: string;
    telefone:number;
    email:string;
  }
  
  export interface CadastroLogin {
    nome: string;
    sobreNome: string;
    telefone:number;
    email:string;
    confirmarEmail:string;
    senha:string;
  }
