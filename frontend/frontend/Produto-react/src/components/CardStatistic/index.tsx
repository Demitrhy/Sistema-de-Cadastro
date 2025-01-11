import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Statistic as AntdStatistic, Col, Row } from "antd";
import { StatisticCard, WrapperStatisticCard } from "./styles";
import Wrapper from "../Wrapper";
import { getRoles } from "../../utils/AuthService";
import { ToCurrency } from "../../utils/ToCurrency";

export interface cardStatisticType {
  title: string;
  value: number;
  precision: number;
  prefix: any;
  suffix: string;
  space: number;
}

export interface gridType {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

interface StatisticProps {
  data: cardStatisticType[];
  loading?: boolean;
  role: string;
  wrapper?: boolean;
}

/**
 * xs	screen < 576px
 * sm	screen ≥ 576px
 * md	screen ≥ 768px
 * lg	screen ≥ 992px
 * xl	screen ≥ 1200px
 * xxl screen ≥ 1600px
 *
 */

const CardStatistic: React.FC<StatisticProps> = ({data, loading, role, wrapper,}) => {
  const [grid, setGrid] = useState<gridType>({xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0});

  const justifyGrid = (data: cardStatisticType[], setGrid: Dispatch<SetStateAction<gridType>>) => {
    switch (true) {
      case data.length === 1:
        setGrid({ ...grid, xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 });
        break;
      case data.length === 2:
        setGrid({ ...grid, xs: 24, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 });
        break;
      case data.length === 3:
        setGrid({ ...grid, xs: 24, sm: 12, md: 12, lg: 8, xl: 8, xxl: 8 });
        break;
      case data.length >= 4:
        setGrid({ ...grid, xs: 24, sm: 12, md: 12, lg: 6, xl: 6, xxl: 6 });
        break;
      default:
        setGrid({ ...grid, xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 });
        break;
    }
  };

  useEffect(() => {
    justifyGrid(data, setGrid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      {getRoles(`${role}`) ? (
        <Wrapper visible={wrapper}>
          <Col span={24}>
            <Row gutter={[8, 8]} justify="space-between">
              {data.map(
                (i: cardStatisticType, index: string | number | undefined) => (
                  <Col
                    key={index}
                    xs={grid.xs}
                    sm={grid.sm}
                    md={grid.md}
                    lg={grid.lg}
                    xl={grid.xl}
                    xxl={grid.xxl}
                  >
                    <WrapperStatisticCard key={index}>
                      <StatisticCard
                        loading={loading || false}
                        hoverable
                        bordered={false}
                      >
                        {i.suffix == 'R$' ? 
                        <AntdStatistic
                          style={{ margin: 2 }}
                          title={`${i.title} (${i.suffix})`}
                          value={ToCurrency(i.value)}
                          precision={i.precision}
                          prefix={i.prefix}
                        />:
                        <AntdStatistic
                          style={{ margin: 2 }}
                          title={`${i.title} (${i.suffix})`}
                          value={i.value}
                          precision={i.precision}
                          prefix={i.prefix}
                        />}
                      </StatisticCard>
                    </WrapperStatisticCard>
                  </Col>
                )
              )}
            </Row>
          </Col>
        </Wrapper>
      ) : null}
    </>
  );
};

export default CardStatistic;
