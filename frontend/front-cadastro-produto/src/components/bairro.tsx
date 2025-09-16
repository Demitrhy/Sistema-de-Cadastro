interface BairroInput {
    value: string;
    onChange: (value: string) => void;
}

const Bairro: React.FC<BairroInput> = ({ value, onChange }) => {
    return (
        <>
            <label style={{ fontWeight: "bold", marginBottom: "6px" }}>Bairro:</label>
            <input
                type="text"
                placeholder="Bairro"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    padding: "5px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    width: "300px",
                }}
            />
        </>
    )
}
export default Bairro;