import React, { useState, useEffect } from "react";
import {
  WrapperComponent,
  OrderCard,
  SpanEmpty,
  Content,
  DivFooter,
  CustomCol,
} from "./styles";
import { List as AntdList, Empty } from "antd";
import EmptyImg from "../../assets/empty.svg";   
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import Wrapper from "../Wrapper";
import { useIntl } from "react-intl";
import { getRoles } from "../../utils/AuthService";
import useShapeRow from "./shapeRow";
import useShapeAvatar from "./shapeAvatar";
import useShapeCollapse from "./shapeCollapse";
import useDebounce from "../../hooks/useDebounce";
import { AccordionProps } from "./Accordion";

 
const Accordion: React.FC<AccordionProps> = ({
  data,
  loading,
  pagination,
  emptyDataText,
  footerInfo,
  selected,
  role,
  clear,
  shape,
  wrapper,
  avatar,
  collapse
}) => {

  const intl = useIntl();
  const [items, setItems] = useState<any>([]);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  // const onlyData = [...items, ...data];
  // let setOnlyData = [...new Set(onlyData)]
  const [collapsed, setCollapsed] = useState(0);
  const shapesRow = useShapeRow();
  const shapesAvatar = useShapeAvatar();
  const shapesCollapse = useShapeCollapse();
  const debounceData = useDebounce(data, 500);


  const clearComponent = () => {
    setSelectedItems([]);
    setItems([]);
  };

  // const handleSelectedItems = (index: string) => {
  //   if (selectedItems.filter((i: any) => i.id === index).length === 0) {
  //     let [header] = [...setOnlyData].filter((i: any) => i.id === index );
  //     const item = {id: index, header: header, details: null}
  //     setSelectedItems([item].concat(selectedItems));
  //   } else {
  //     const items = selectedItems.filter((i: any) => i.id !== index);
  //     setSelectedItems(items);
  //   }
  // };

  function fetchMoreListItems() {
    setTimeout(() => {
      setIsFetching(false);
      console.log("loading...", isFetching);
      document.documentElement.offsetHeight +
        document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 600 &&
        !(data.length < 10) &&
        pagination(1);
    }, 10);
  }

  
  useEffect(() => {
    selected(selectedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);
 
  
  useEffect(() => {
    items.length > 0 && clear === true && clearComponent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clear]);
  
  const handleCollapsed = (index: any) => {
    collapsed === 0 ? setCollapsed(index) : setCollapsed(0);
  };

  useEffect(() => {
    data.length >= 1 && setItems(data);
    data.length === 0 && clearComponent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceData]);


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
                  }`}{". - Quantidade: "+items?.length }</DivFooter>
                }
                rowKey="numeroPedido"
                renderItem={(item: any, index) => (
                  <div>
                    <OrderCard
                      hoverable={true}
                      bordered={false}
                      onClick={() => handleCollapsed(data[index].id)}
                    >
                      <AntdList.Item key={item.id}>
                        <AntdList.Item.Meta
                          avatar={avatar ? shapesAvatar.selectShape(item.avatar, avatar) : <></>}
                          title={shapesRow.selectShape(item, shape || [4,2])}
                        />
                      </AntdList.Item>
                    </OrderCard>
                    <Content open={item.id === collapsed ? true : false}>
                      {collapse ? shapesCollapse.selectShape(item.collapsedInfo, collapse) : <></>}
                    </Content>
                  </div>
                )}
              />
            </WrapperComponent>
          </CustomCol>
        </Wrapper>
      ) : null}
    </>
  );
};

export default Accordion;
