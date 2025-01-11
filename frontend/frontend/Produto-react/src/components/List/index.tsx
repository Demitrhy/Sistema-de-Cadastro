import React, { useState, useEffect, ReactNode } from "react";
import {
  DivInfo,
  AvatarInfo,
  WrapperComponent,
  OrderCard,
  ListSubtitle,
  ListTitle,
  SpanEmpty,
} from "./styles";
import {
  DivFooter,
  ListOrderSubtitle,
  ListOrdertitle,
  CustomCol,
} from "./styles";
import { List as AntdList, Row, Col, Empty } from "antd";
import { Link } from "react-router-dom";
import EmptyImg from "../../assets/empty.svg";
import { pascalCase } from "../../utils/PascalCase";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import Wrapper from "../Wrapper";
import { useIntl } from "react-intl";
import { getRoles } from "../../utils/AuthService";

interface ItemInfo {
  title: string | number;
  value: string | number;
  link: string;
}

interface PaginationType {
  page: number | undefined;
  setPage: (numberPage: number) => void;
} 

export interface ListType {
  id: number;
  popover1?: ReactNode | string;
  popover2?: ReactNode | string;
  popover3?: ReactNode | string;
  firstLetterAvatar?: ReactNode;
  info1?: ItemInfo;
  info2?: ItemInfo;
  info3?: ItemInfo;
  info4?: ItemInfo;
  info5?: ItemInfo;
  info6?: ItemInfo;
  info7?: ItemInfo;
  info8?: ItemInfo;
}

interface ListProps {
  data: ListType[];
  loading: boolean;
  // pagination: (numberPage: number) => void;
  pagination: PaginationType;
  selected: (orderItems: string[]) => void;
  emptyDataText?: string;
  footerInfo?: string;
  role: string;
  clear: boolean;
  clearSelectedOrders: boolean;
  wrapper?: boolean;
}

const List: React.FC<ListProps> = ({
  data,
  loading,
  pagination,
  emptyDataText,
  footerInfo,
  selected,
  role,
  clear,
  clearSelectedOrders,
  wrapper
}) => {
  const intl = useIntl();
  const [items, setItems] = useState<any>([]);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  // const onlyData = [...items, ...data];
  const onlyData = (pagination.page || 1) > 1 ? [...items, ...data] :  [...data];
  let setOnlyData = new Set(onlyData); 

  const distinctItems = () => {
  
    let _orderItems: any[] = onlyData.map((items: any) => items);

    let _orderItemsDistinct: any[] = onlyData.map((items: any) => 
    Object.entries(items).toString())
     
    _orderItemsDistinct = [...new Set([..._orderItemsDistinct])];

    _orderItemsDistinct = _orderItemsDistinct.map((i: any) => {
      let [distinct] = _orderItems.filter(
        (j: any) => i === Object.entries(j).toString() && j
      );
      return distinct;
    });
    return _orderItemsDistinct;
  }

  const clearComponent = () => {
    setSelectedItems([]);
    setItems([]);
  };

  const handleSelectedItems = (index: string) => {
    if (selectedItems.filter((i: any) => i.id === index).length === 0) {
      let [header] = [...setOnlyData].filter((i: any) => i.id === index );
      const item = {id: index, header: header, details: null}
      setSelectedItems([item].concat(selectedItems));
    } else {
      const items = selectedItems.filter((i: any) => i.id !== index);
      setSelectedItems(items);
    }
  };

  function fetchMoreListItems() {
    setTimeout(() => {
      setIsFetching(false);
      console.log("loading...", isFetching);
      document.documentElement.offsetHeight +
        document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 600 &&
        !(data.length < 10) &&
        // pagination(1);
        pagination.setPage(1);
    }, 10);
  }

  useEffect(() => {
    selected(selectedItems);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);
  
  useEffect(() => {
    data.length === 1 && loading === false && setItems([...data]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);  

  useEffect(() => {
    data.length > 1 && loading === false && setItems(distinctItems());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    items.length > 0 && clear === true && clearComponent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clear]);

  useEffect(() => {
    if(clearSelectedOrders){
      setSelectedItems([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearSelectedOrders]);

  useEffect(() => {
    data.length === 0 && clearComponent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <>
      {getRoles(`${role}`) ? (
        <Wrapper visible={wrapper}>
          <CustomCol span={24}>
            <WrapperComponent>
              <AntdList
                bordered={false}
                loading={loading}
                itemLayout="vertical"
                size="small"
                locale={{
                  emptyText: (
                    <Empty
                      image={`${EmptyImg}`}
                      description={
                        <SpanEmpty>{`${
                          emptyDataText ||
                          intl.formatMessage({ id: "list.emptyData" })
                        }`}</SpanEmpty>
                      }
                    ></Empty>
                  ),
                }}
                dataSource={items}
                footer={
                  <DivFooter>{`${
                    footerInfo || intl.formatMessage({ id: "list.footerInfo" })
                  }`}</DivFooter>
                }
                rowKey="id"
                renderItem={(item: any, index) => (
                  <OrderCard
                    hoverable={true}
                    bordered={false}
                    onClick={() => handleSelectedItems(items[index].id)}
                    style={{
                      backgroundColor:
                        selectedItems.filter((i: any) => i.id === items[index].id)
                          .length !== 0
                          ? "#b7e6fa"
                          : "#FEFEFE",
                    }}
                  >
                    <AntdList.Item key={index}>
                      <AntdList.Item.Meta
                        avatar={
                          <AvatarInfo size="large" shape="square">
                            {item.firstLetterAvatar}
                          </AvatarInfo>
                        }
                        title={
                          <DivInfo>
                            <Row>
                              <Col span={10}>
                                <ListTitle>
                                  {pascalCase(item.info1.value)}
                                </ListTitle>
                                <ListSubtitle>
                                  {item.info2.title} {item.info2.value}
                                </ListSubtitle>
                                <ListSubtitle>
                                  {item.info3.title}{" "}
                                  {pascalCase(item.info3.value)}
                                </ListSubtitle>
                              </Col>
                              <Col span={10}>
                                <ListSubtitle>
                                  {item.info4.title} {item.info4.value}
                                </ListSubtitle>
                                <ListSubtitle>
                                  {item.info5.title} {item.info5.value}
                                </ListSubtitle>
                                <ListSubtitle>
                                  {item.info6.title}{" "}
                                  {pascalCase(item.info6.value)}
                                </ListSubtitle>
                              </Col>
                              <Col span={4}>
                              <ListOrderSubtitle>
                                  {item.info7.title}
                                </ListOrderSubtitle>
                                <ListOrdertitle>
                                  <Link to={item.info7.link}>
                                    {item.info7.value}
                                  </Link>
                                </ListOrdertitle>
                                <ListSubtitle>
                                  {pascalCase(item.info8.value)}
                                </ListSubtitle>
                              </Col>
                            </Row>
                          </DivInfo>
                        }
                      />
                    </AntdList.Item>
                  </OrderCard>
                )}
              />
            </WrapperComponent>
          </CustomCol>
        </Wrapper>
      ) : null}
    </>
  );
};

export default List;
