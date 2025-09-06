import { useEffect, useState } from "react";
import { BuscarUsuario, EditarUsuario } from "../../api/Api";
import { toast } from "react-toastify";
import { Usuario } from "../../interface/User";


const EditarMeuPerfil: React.FC = () => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [telefone, setTelefone] = useState(0);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [editar, setEditar] = useState<Usuario | null>(null);
 
    useEffect(() => {
        if (editar) {
            setNome(editar.nome ?? "");
            setSobrenome(editar.sobrenome ?? "");
            setTelefone(editar.telefone ?? 0);
            setEmail(editar.email ?? "")

        }
    }, [editar]);


    const carregarProdutos = async () => {
        setLoading(true);
        try {
            const data = await BuscarUsuario();
            const usuario = data[0];

            setEditar({
                id: usuario.id,
                nome: usuario.nome,
                sobrenome: usuario.sobrenome,
                telefone: usuario.telefone,
                email: usuario.email,
            });
        } catch (erro) {
            toast.error('Falha na busca o usuario.');
          
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarProdutos();
    }, []);

    const Editar = async () => {
        const dadosAtualizados = {
            id: editar?.id,
            nome,
            sobrenome,
            telefone,
            email,
            senha: ""
        };

        try {

            await EditarUsuario(dadosAtualizados);
            toast.success('Usuario salvo com sucesso!');
            carregarProdutos();
        } catch (error) {
            toast.error('Erro ao salvar o Usuario');
           
        }
    }

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
                            User Edit
                        </h2>
                    </div>


                    {/* Formulário */}
                    <div style={{ marginBottom: '0.8rem' }}>
                        <label
                            style={{ display: 'block', marginBottom: '0.3rem', color: '#00008B', fontSize: '0.9rem' }}
                            htmlFor="nome"
                        >
                            Nome
                        </label>
                        <input
                            style={{
                                width: '100%', /* O input ocupa a largura total do card */
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                            }}
                            id="nome"
                            type="nome"
                            placeholder="Digite seu nome"
                            value={editar?.nome}
                            onChange={(e) => setNome(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div style={{ marginBottom: '0.8rem' }}>
                        <label
                            style={{ display: 'block', marginBottom: '0.3rem', color: '#00008B', fontSize: '0.9rem' }}
                            htmlFor="sobrenome"
                        >
                            Sobrenome
                        </label>
                        <input
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                            }}
                            id="sobrenome"
                            type="sobrenome"
                            placeholder="Digite seu sobrenome"
                            value={sobrenome}
                            onChange={(e) => setSobrenome(e.target.value)}
                        />
                    </div>
                    <div style={{ marginBottom: '0.8rem' }}>
                        <label
                            style={{ display: 'block', marginBottom: '0.3rem', color: '#00008B', fontSize: '0.9rem' }}
                            htmlFor="telefone"
                        >
                            Telefone
                        </label>
                        <input
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                appearance: 'textfield'

                            }}
                            id="telefone"
                            type="number"
                            placeholder="Digite seu telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(parseInt(e.target.value))}
                        />
                    </div>
                    <div style={{ marginBottom: '0.8rem' }}>
                        <label
                            style={{ display: 'block', marginBottom: '0.3rem', color: '#00008B', fontSize: '0.9rem' }}
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                            }}
                            id="email"
                            type="email"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    <button
                        style={{
                            width: '150px', // ou 'auto' se quiser que o botão se ajuste ao conteúdo
                            padding: '0.4rem 0.8rem', // altura e largura
                            backgroundColor: 'green',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '0.85rem', // menor que 1rem
                            opacity: loading ? 0.6 : 1,
                            marginLeft:"200px"                        }}
                        onClick={Editar}
                        disabled={loading}
                    >
                        {loading ? 'Carregando...' : 'Salvar'}
                    </button>
                </div>
            </div>
        </>
    );

}

export default EditarMeuPerfil;