import { IMaskInput } from "react-imask";

interface CepInput {
    value: string;
    onChange: (value: string) => void;
}

const Cep: React.FC<CepInput> = ({ value, onChange }) => {
    return (
        <>
            <label style={{ fontWeight: 'bold', marginBottom: '6px' }}>CEP:</label>
            <IMaskInput
                mask="00000-000"
                value={value}
                onAccept={(val) => onChange(val as string)}
                placeholder="00000-000"
                style={{
                    padding: "5px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    width: "200px",
                }} />
        </>
    );
}
export default Cep;