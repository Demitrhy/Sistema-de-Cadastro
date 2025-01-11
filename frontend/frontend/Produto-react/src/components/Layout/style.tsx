import styled from 'styled-components';
import { Layout } from 'antd'


const { Header, Content } = Layout;


export const StyleContent = styled(Content)`
    margin: 5px 5px 5px 0;
    /* background-color: #f4f7fa; */
    /* background-color: transparent; */
    box-shadow: 2px 2px 2px 2 rgba(0,0,2,.05);
`;

export const StyleLayout = styled(Layout)`
    margin-left: 10px; 
    margin-top: 0;
`;

export const HeaderFixed = styled(Header)`
.header {
  padding: 0;
  box-shadow: 2;
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 72px;
  z-index: 9;
  align-items: center;
  background-color: #fff;

  &.fixed {
    position: fixed;
    top: 0;
    right: 0;
    width: calc(100% - 256px);
    z-index: 29;
    transition: width 0.2s;

    &.collapsed {
      width: calc(100% - 80px);
    }
  }

`;