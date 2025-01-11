import { Button, Input, Space } from "antd";
import styled from "styled-components";
import { Col, Card, Avatar } from "antd";

export const Container = styled.div`
  margin-left: 80px;
  margin-right: 80px;
`;

export const DivFixed = styled.div`
  .example::-webkit-scrollbar {
    display: none;
  }
  
`;

export const ButtonPrimary = styled.div`
  .ant-btn-primary {
    background-color: #22AF31;
    border-color: #22AF31;
    color: white;
  }

  button:disabled,
  button[disabled]{
  color: rgba(0, 0, 0, 0.25);
  background-color: #f5f5f5;
  border-color: #d9d9d9;
  text-shadow: none;
  box-shadow: none;
}`;

