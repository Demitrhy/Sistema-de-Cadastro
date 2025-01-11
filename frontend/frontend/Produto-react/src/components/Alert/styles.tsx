import styled from 'styled-components'
import { Modal } from 'antd';


export const AntdModal = styled(Modal)`
  min-width: 300px !important;

	.ant-modal-body {
    padding: 0;
    margin: 0;
    min-height: 300px !important;
    font-size: 14px;
    line-height: 1.5715;
    word-wrap: break-word;
}

.ant-modal-close-x {
    display: none;
    width: 56px;
    height: 56px;
    font-size: 16px;
    font-style: normal;
    line-height: 56px;
    text-align: center;
    text-transform: none;
    text-rendering: auto;
}
`;
