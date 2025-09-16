interface EnderecoInput {
    value: string;
    onChange: (value: string) => void;
}

const Endereco: React.FC<EnderecoInput> = ({ value, onChange }) => {
    return (
        <>
            <label style={{ fontWeight: "bold", marginBottom: "6px" }}>Endereço:</label>
            <input
                type="text"
                placeholder="Endereço"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    padding: "5px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    width: "400px",
                }}
            />
        </>
    )
}
export default Endereco;