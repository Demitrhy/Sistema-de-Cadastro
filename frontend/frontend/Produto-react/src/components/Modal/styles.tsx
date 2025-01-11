import styled from 'styled-components'
import { Modal } from 'antd';


export const AntdModal = styled(Modal)`
  min-width: 800px !important;

	.ant-modal-body {
    padding: 0px 24px 0px 24px;
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

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: calc(-2px - 2vmin);
`;

export const Info = styled.div`
  font-size: 1.25rem; 
  color: #0054A5;

`;

export const Title = styled.h3`
  display: block;
  float: left;
  margin-bottom: 0;
  padding-right: 12px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 2rem;

`;