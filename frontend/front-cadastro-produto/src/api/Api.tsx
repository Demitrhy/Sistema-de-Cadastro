import { Produto } from "../interface/Produto";

// importar.ts 
export async function Importar(produto: Produto[]) {
  const apiUrl = process.env.REACT_APP_API_URL;

  console.log("passei por aqui", produto)

  await fetch(`${apiUrl}/Produto/Importar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(produto),
  });
  
  // Não precisa de return se não espera resposta
}

  