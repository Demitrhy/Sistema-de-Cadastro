import { IMaskInput } from "react-imask";

interface CnpjInput {
    value: string;
    onChange: (value: string) => void;
}

const Cnpj: React.FC<CnpjInput> = ({ value, onChange }) => {
    return (
        <>
            <label style={{ fontWeight: "bold", marginBottom: "6px" }}>CNPJ:</label>
            <IMaskInput
                mask="00.000.000/0000-00"
                value={value}
                onAccept={(val) => onChange(val as string)}
                placeholder="00.000.000/0000-00"
                style={{
                    padding: "5px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    width: "200px",
                }}
            />
        </>
    );
}

export default Cnpj;