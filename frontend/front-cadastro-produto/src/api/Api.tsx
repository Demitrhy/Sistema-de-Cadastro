import { Produto } from "../interface/Produto";

// importar.ts
export async function Importar(produto: Produto[]) {
    const apiUrl = process.env.REACT_APP_API_URL;
  
    const response = await fetch(`${apiUrl}/importar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produto),
    });
  
    const data = await response.json();
    return data;
  }
  