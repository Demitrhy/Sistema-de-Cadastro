export interface Produto {
    produto: number;
    situacao: string;
    digito:number;
    custo: number;
    nome: string;
    marca:string;
    tipo: string;
    unidadeMedida:string;
    grupo:string;
    percLucro:number;
    precoVenda:number;
    comissao:number;
    liquido:number;
    codigoBloqueado?: boolean;
   
  }

  export interface CadastroLogin {
    nome: string;
    sobreNome: string;
    telefone:number;
    email:string;
    confirmarEmail:string;
    senha:string;
  }