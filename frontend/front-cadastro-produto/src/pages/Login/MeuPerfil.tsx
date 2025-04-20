import { useEffect, useState } from "react";
import { BuscarUsuario } from "../../api/Api";


const MeuPerfil: React.FC = () => {

    const [perfil, setPerfil] = useState({
        id: 0,
        nome: '',
        sobrenome: '',
        telefone: 0,
        email: '',
    });

    useEffect(() => {
        const carregarPerfil = async () => {
            try {
                const data = await BuscarUsuario();
                const usuario = data[0]; 
    
                console.log('Usuário carregado:', usuario);
    
                setPerfil({
                    id: usuario.id,
                    nome: usuario.nome,
                    sobrenome: usuario.sobrenome,
                    telefone: usuario.telefone,
                    email: usuario.email,
                });
                
            } catch (error) {
                console.error('Erro ao buscar perfil:', error);
            }
        };

        carregarPerfil();
    }, []);


    return (

        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '80vh',
                    backgroundColor: '#f0f0f0',
                    flexDirection: 'column',
                    padding: '0rem',
                }}
            >
                <div
                    style={{
                        backgroundColor: 'white',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        border: '2px solid #003366', // borda azul
                        boxShadow: '0 4px 12px rgba(0, 51, 102, 0.2)', // sombra azul
                        width: '100%',
                        maxWidth: '400px',
                        overflow: 'hidden', // impede overflow do header azul
                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#003366',
                            borderTopLeftRadius: '6px',
                            borderTopRightRadius: '6px',
                            textAlign: 'center',
                            padding: '1rem 0',
                            margin: '-1.5rem -1.5rem 1.5rem -1.5rem', // remove padding interno para colar nas bordas
                        }}
                    >
                        <h2
                            style={{
                                color: 'white',
                                margin: 0,
                                fontSize: '1.5rem',
                            }}
                        >
                            User Details
                        </h2>
                    </div>


                    {/* Formulário */}
                    <div style={{ marginBottom: '0.8rem' }}>
                        <label style={{ display: 'flex', justifyContent: 'space-between', color: '#00008B', fontSize: '0.9rem' }}>
                            <span>Id: {perfil.id}</span>
                        </label>
                    </div>
                    <div style={{ height: '1px', backgroundColor: '#ddd', margin: '4px 0' }} />

                    <div style={{ marginBottom: '0.8rem' }}>
                        <label style={{ display: 'flex', justifyContent: 'space-between', color: '#00008B', fontSize: '0.9rem' }}>
                            <span>Nome: {perfil.nome}</span>
                        </label>
                    </div>
                    <div style={{ height: '1px', backgroundColor: '#ddd', margin: '4px 0' }} />

                    <div style={{ marginBottom: '0.8rem' }}>
                        <label style={{ display: 'flex', justifyContent: 'space-between', color: '#00008B', fontSize: '0.9rem' }}>
                            <span>Sobrenome:{perfil.sobrenome} </span>
                        
                        </label>
                    </div>
                    <div style={{ height: '1px', backgroundColor: '#ddd', margin: '4px 0' }} />

                    <div style={{ marginBottom: '0.8rem' }}>
                        <label style={{ display: 'flex', justifyContent: 'space-between', color: '#00008B', fontSize: '0.9rem' }}>
                            <span>Telefone: {perfil.telefone}</span>
                            
                        </label>
                    </div>
                    <div style={{ height: '1px', backgroundColor: '#ddd', margin: '4px 0' }} />

                    <div style={{ marginBottom: '0.8rem' }}>
                        <label style={{ display: 'flex', justifyContent: 'space-between', color: '#00008B', fontSize: '0.9rem' }}>
                            <span>Email: {perfil.email}</span>
                           
                        </label>
                    </div>
                </div>
            </div>
        </>
    );

}

export default MeuPerfil;