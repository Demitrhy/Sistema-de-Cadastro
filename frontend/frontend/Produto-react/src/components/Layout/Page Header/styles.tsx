import styled from 'styled-components';
import { Layout } from 'antd';
import { Breadcrumb } from 'antd';


const { Header } = Layout;


export const StyleHeader = styled(Header)`
  background: #FFFFFF;
  box-shadow: 0 15px 20px -20px rgba(75,102,171,0.1),0 0 15px rgba(75,102,171,0.06);
  height: 60px;

`;

export const Img = styled.img`
  height: 24px;
  width: 24px;  
  margin-left: 5px;
  align-self: center;
`;


export const StyleBreadcrumb = styled(Breadcrumb)`
    display: flex;
    margin-left: 15px;
    align-items: center;
    height: 42px;
    line-height: 40px;
    font-size: 1.5rem;
    color: #1890ff;
    font-size: 12px;
    
`;