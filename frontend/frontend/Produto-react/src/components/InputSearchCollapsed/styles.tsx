import styled from 'styled-components'
import { Collapse, Switch } from 'antd';

// const { Panel } = Collapse;


export const CustomCollapse = styled(Collapse)`

margin-bottom: -1px;

   .ant-collapse-header {
     font-size: 12px;
      position: relative;
      padding: 6px 16px !important; 
      padding-left: 40px !important; 
      color: rgba(0, 0, 0, 0.85);
      line-height: 22px;
      cursor: pointer;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
    } 

    .ant-collapse-content-box {
      padding: 5px 16px !important; 
      font-size: 12px;
    }
`;



export const CustomSwitch = styled(Switch)`
    margin-top: 2.5px;    
    margin-bottom: 2.5px;
`;

export const Span = styled.span`
  font-size: 12px; 
  color: grey;
`;