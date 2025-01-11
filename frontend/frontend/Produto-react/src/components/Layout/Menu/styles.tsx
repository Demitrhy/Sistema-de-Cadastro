import styled from "styled-components";
import { Layout } from "antd";

const { Content, Sider } = Layout;

export const StyleMenu = styled.div `
    flex: 0 0 200px;
    max-width: 100px;
    min-width: 150px !important;
    width: 100px;
`;


export const ContentRouter = styled(Content)`
    flex: 0 0 200px;
    max-width: 100px;
    min-width: 150px !important;
    width: 100px;
    background-color: red;
`;


export const StyleSider = styled(Sider)`
    height: 100vh;
    overflow: auto;
    left: 0;
    /* background-color: #f4f7fa; */
    background-color: #ffffff;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.2);

`;
