interface CidadeInput {
    value: string;
    onChange: (value: string) => void;
}

const Cidade: React.FC<CidadeInput> = ({ value, onChange }) => {
    return (
        <>
            <label style={{ fontWeight: "bold", marginBottom: "6px" }}>Cidade:</label>
            <input
                type="text"
                placeholder="Cidade"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    padding: "5px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    width: "200px",
                }}
            />
        </>
    )
}
export default Cidade;