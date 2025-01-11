import React from 'react';
import { Tag } from 'antd';
import CountUp from 'react-countup';
import { Descriptions } from './styles';
import Wrapper from '../Wrapper';
import useColumnsByWidth from '../../hooks/useColumnsByWidth';
import { getRoles } from '../../utils/AuthService';
import { ToCurrency } from "../../utils/ToCurrency";

export interface tagStatisticType {
  title: string;
  value: number;
}

interface StatisticProps {
  data: tagStatisticType[];
  loading?: boolean;
  role: string;
}

const TagStatistic: React.FC<StatisticProps> = ({data, loading, role}) => {

  const columns =  useColumnsByWidth();

  return (
    <>
    {getRoles(`${role}`) ?
      <Wrapper>
        <Descriptions size="small" column={columns}>
          {data.map((i: tagStatisticType, index) => (
            <Descriptions.Item key={index} label={i.title}>
            {i.title =='Valor Pedidos' || i.title == 'Valor Pedidos Sugestão' ?
            <Tag color="green">
              {ToCurrency(i.value)}
              {/* {i.value} */}
            </Tag>
            :
            <Tag color="green">
              {i.value}
            </Tag>}
            </Descriptions.Item>
          ))} 
        </Descriptions>
      </Wrapper> : null }
    </>
  );
}

export default TagStatistic;