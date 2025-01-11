import styled from 'styled-components'
import { Col, Card, Avatar } from 'antd';

export const CustomCol = styled(Col)`
    margin-bottom: 9px;
    color: #ced4da; 
    text-align: left;
    line-height: 7vh;

    @media (max-width : 768px) {
      font-size: 30.5vw;
      color: #ced4da;  
      text-align: center;
      line-height: 7vh;
    } 
`;


export const DivContent = styled.div`
    margin-top: 0.3125rem; 
    line-height: 0.125rem;

`;

export const WrapperComponent = styled.div`
    padding: 0.125rem 0.3125rem 0.125rem 0.3125rem;
    background-color: #ffffff;
    margin: 0.3125rem 0rem 0.625rem 0rem;
    box-shadow: 0 3.2px 7.2px 0 var(--callout-shadow-color,rgba(0, 0, 0, .132)),0 .6px 1.8px 0 var(--callout-shadow-secondary-color,rgba(0, 0, 0, .108));
`;

export const OrderCard = styled(Card)`
    .ant-card-body {
      padding: 0rem 0.3125rem 0rem 0.3125rem;
      margin: 0.3125rem 0rem 0.3125rem 0rem;
      cursor: pointer;
    }
`;

export const ListTitle = styled.h1`
    color: rgba(0, 0, 0, 0.85); 
    max-width: 40ch;
    overflow: hidden;
    margin-bottom: 0.186875rem;
    text-overflow: ellipsis; 
    white-space: nowrap;
    font-size: 14px;
    line-height: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
`;

export const ListSubtitle = styled.h3`

    max-width: 40ch; 
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.65);
    font-size: 0.875rem;
    line-height: 1rem;
    font-weight: 400;
    margin-bottom: 0.186875rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    font-variant: tabular-nums;
`;

export const ListOrdertitle = styled.h3`
    max-width: 20ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 700;  
    font-size: 22px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'; 
`;

export const AvatarInfo = styled(Avatar)`
    width: 3.1rem;
    height: 3.1rem;
    font-size: 1.6rem;
    font-weight: 650;
    padding: 0.4rem;
    background-color: #ff9090; 
`;

export const DivInfo = styled.div`
    marginBottom: -1.25rem; 
`;

export const ListOrderSubtitle = styled.h3`
    max-width: 40ch; 
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.65);
    font-size: 0.875rem;
    line-height: 1rem;
    font-weight: 400;
    margin-bottom: 0.186875rem;
    margin-top: -0.625rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'; 
`; 


export const SpanEmpty = styled.span`
    font-weight: 650
    color: rgba(0, 0, 0, 0.65);
    font-size: 0.875rem;
`; 


export const DivFooter = styled.h3`
    font-weight: 650
    color: rgba(0, 0, 0, 0.65);
    font-size: 0.875rem;
    margin-left: 0.625rem;
`; 





