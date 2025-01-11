import styled from "styled-components";
import { BellOutlined } from "@ant-design/icons";
import { Card } from "antd";

export const IconNotification = styled(BellOutlined)`
    margin-top: 4px;
    font-size: 25px;
    margin-left: 30px;
    color: #FFFFFF;
`;

export const OrderCard = styled(Card)`
    .ant-card-body {
      padding: 0;
      margin: 0;
      cursor: pointer;
    } 
`;


