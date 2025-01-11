import styled from 'styled-components';
import { Layout } from 'antd';
import { Breadcrumb } from 'antd';


const { Header } = Layout;


export const StyleHeader = styled(Header)`
  background: #0054A5;
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.2);

`;

export const Img = styled.img`
  height: 24px;
  width: 24px;  
  margin-left: 5px;
  align-self: center;
`;


export const ListTitle = styled.h1` 
    color: rgba(255, 255, 255, 255); 
    max-width: 40ch;
    overflow: hidden;
    margin-bottom: 0.186875rem;
    margin-top: 1rem;
    text-overflow: ellipsis; 
    white-space: nowrap;
    font-size: 25px;
    margin-right: 39em;
    line-height: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
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