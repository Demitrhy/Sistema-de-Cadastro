import styled from 'styled-components';
import { Input, Col } from 'antd';


const InputGroup = Input.Group;


export const InputMinimo = styled(Input)`
    width: 48%; 
    text-align: center;
`;

export const InputRange = styled(Input)`
    width: 10%;
    border-left: 0;
    pointer-events: none;  
    background-color: #fff;
`;

export const InputMaximo = styled(Input)`
    width: 42%; 
    text-align: center; 
    border-left: 0;
    
`;

export const StyleInputGroup = styled(InputGroup)`
    margin-bottom: 5px;
`;

export const StyleCol = styled(Col)`
    text-align: left; 
    margin-bottom: 2px;
`;


