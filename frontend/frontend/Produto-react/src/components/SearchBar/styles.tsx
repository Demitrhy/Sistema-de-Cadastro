import styled from 'styled-components'
import { Input, Badge, Select } from 'antd';

export const SelectSearchBar = styled(Select)`
.ant-select-single
  {
    margin-left: 8px !important;
    font-size: 22px;
    color: black;
    text-align: center;
    z-index: 1; 
  }

  .ant-select-single-suffix  {
    margin-right: -8px;
    color: #f4f4f5;
  }

  .ant-select-single-prefix  {
    margin-left: -8px;
    color: #f4f4f5;
  }

`

export const InputSearchBar = styled(Input)`
  height: 50px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 2px;  
  box-shadow: 0 3.2px 7.2px 0 var(--callout-shadow-color,rgba(0, 0, 0, .132)),0 .6px 1.8px 0 var(--callout-shadow-secondary-color,rgba(0, 0, 0, .108));
  
  
  .ant-input {
    margin-left: 8px !important;
    font-size: 22px;
    color: black;
    text-align: center;
    z-index: 1;
  }

  .ant-input-suffix  {
    margin-right: -8px;
    color: #f4f4f5;
  }

  .ant-input-prefix  {
    margin-left: -8px;
    color: #f4f4f5;
  }

  .ant-btn-default {
    color: #b7b7b7;
    background-color: #f6f6f6;
    border-color: #f0f0f0;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
    -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}
`;

export const BadgeSelectedFilter = styled(Badge)`
 z-index: 2;
`;