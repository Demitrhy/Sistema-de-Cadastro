import React, { useState, useEffect } from 'react';
import { Col, Input} from 'antd';
import { StyleCol, StyleInputGroup } from './styles';
import useDebounce from '../../hooks/useDebounce';

interface InputType {
  label: string;
  preffix: string;
  onChange: any;
  clear: boolean; 
}

const InputRangeNumber: React.FC<InputType> = (props) => {
  
  const [input, setInput] = useState({ minimo: "", maximo: "" }) 

  const handleInputChange = (e: { currentTarget: { name: any; value: any; }; }) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value
  })


  const debouncedInputRangeNumber = useDebounce(input, 500);


  useEffect(
    () => {
      let inputRange = input.minimo.toString().concat(",", input.maximo.toString()) 

      if (
        inputRange !== "0,0" && 
        inputRange !== "0," && 
        inputRange !== ",0" && 
        inputRange !== "," &&
        inputRange !== "" 
        ) {
	inputRange = props.label.concat(": ", inputRange)
        props.onChange(inputRange);
        
      } else {

        props.onChange("");
      }
      
    },
    [debouncedInputRangeNumber, input.maximo, input.minimo, props]
  );


  useEffect(
    () => {
      if (props.clear) {
        setInput({ minimo: "", maximo: "" })
      } 
    },
    [props.clear]
  );

  


  return (
    <>
      <StyleCol span={24} >{props.label}</StyleCol>
        <Col  span={24}>
          <StyleInputGroup compact >
            <Input 
            maxLength={20}
            name="minimo" 
            size="small" 
            type="number"
            value={input.minimo}
            onChange={handleInputChange}  
            addonBefore={props.preffix} 
            style={{ width: '48%', textAlign: 'center' }} 
            placeholder="minimo"  
            min="0"
            />
            <Input 
            size="small" 
            style={{ width: '10%', borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff', }} 
            placeholder="~" disabled 
            />
            <Input 
            maxLength={20}
            name="maximo" 
            size="small"  
            type="number"
            value={input.maximo}
            onChange={handleInputChange}
            style={{ width: '42%', textAlign: 'center', borderLeft: 0 }} 
            placeholder="maximo"
            min={input.minimo} 
            />
          </StyleInputGroup>
        </Col>
    </>
  );
}

export default InputRangeNumber;





