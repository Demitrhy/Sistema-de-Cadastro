import styled from 'styled-components'
import { Card } from 'antd';


export const StatisticCard = styled(Card)`

    text-align: left;
    background-color: #FFFFFF;
    .ant-card-body {
      padding: 15px 2px 15px 10px;
      margin: 0;
      @media (max-width : 768px) {
        line-height: 10px;
        padding: 0;
      } 
    }
`;

export const WrapperStatisticCard = styled.div`
    padding: 0;
    background-color: #ffffff;
    margin: 5px 0px 5px 0px;
    box-shadow: 0 3.2px 7.2px 0 var(--callout-shadow-color,rgba(0, 0, 0, .132)),0 .6px 1.8px 0 var(--callout-shadow-secondary-color,rgba(0, 0, 0, .108));
`;