import React from "react";
import { DivInfo, ListSubtitle, ListTitle, LinkStyled, Divider } from "./styles";
import { Row, Col, Tag, Collapse } from "antd";
import { pascalCase } from "../../utils/PascalCase";
import { CaretRightOutlined } from "@ant-design/icons";
const { Panel } = Collapse;

const shapeTag = (collapse: any) => (
  <Collapse
    style={{ backgroundColor: "transparent" }}
    bordered={false}
    expandIcon={({ isActive }) => (
      <CaretRightOutlined rotate={isActive ? 90 : 0} />
    )}
    expandIconPosition="right"
    className="site-collapse-custom-collapse"
  >
    {collapse.map((item: any, index: any) => (
      <Panel key={index} header={<ListTitle>{item.title}</ListTitle>}>
        {item.value?.map((value: any, index: any) => ( 
          <>
            {index > 0 ? <Divider /> : <></>}
            {value.info.map((info: any, index: any) => 
            info
              ? (<Tag key={index} color="#108ee9">{`${info.title} ${info.value}`}</Tag>)
              : (<></>)
            
            )}
          </>
        ))}
      </Panel>
    ))}
  </Collapse>
);

const shapeText = (item: any) => (
  <DivInfo>
    <Row justify="space-between">
      <Col span={6}>
        <ListTitle>
          <LinkStyled to={item.info1?.link || "#"}>
            {pascalCase(item.info1?.value)}
          </LinkStyled>
        </ListTitle>
        <ListSubtitle>
          <LinkStyled to={item.info2?.link || "#"}>
            {pascalCase(item.info2?.title)} {pascalCase(item.info2?.value)}
          </LinkStyled>
        </ListSubtitle>
      </Col>
      <Col span={6}>
        <ListSubtitle>
          <LinkStyled to={item.info3?.link || "#"}>
            {pascalCase(item.info3?.title)} {pascalCase(item.info3?.value)}
          </LinkStyled>
        </ListSubtitle>
        <ListSubtitle>
          <LinkStyled to={item.info4?.link || "#"}>
            {pascalCase(item.info4?.title)} {pascalCase(item.info4?.value)}
          </LinkStyled>
        </ListSubtitle>
      </Col>
      <Col span={6}>
        <ListSubtitle>
          <LinkStyled to={item.info5?.link || "#"}>
            {pascalCase(item.info5?.title)} {pascalCase(item.info5?.value)}
          </LinkStyled>
        </ListSubtitle>
        <ListSubtitle>
          <LinkStyled to={item.info6?.link || "#"}>
            {pascalCase(item.info6?.title)} {pascalCase(item.info6?.value)}
          </LinkStyled>
        </ListSubtitle>
      </Col>
      <Col span={6}>
        <ListSubtitle>
          <LinkStyled to={item.info7?.link || "#"}>
            {pascalCase(item.info7?.value)}
          </LinkStyled>
        </ListSubtitle>
        <ListSubtitle>
          <LinkStyled to={item.info8?.link || "#"}>
            {pascalCase(item.info8?.title)}
          </LinkStyled>
        </ListSubtitle>
      </Col>
    </Row>
  </DivInfo>
);

const shapeComponent = (item: any) => (
  <DivInfo>
    <Row justify="space-between">
      <Col span={8}>
        <ListTitle>
          <LinkStyled to={item.info1?.link || "#"}>
            {pascalCase(item.info1?.value)}
          </LinkStyled>
        </ListTitle>
        <ListSubtitle>
          <LinkStyled to={item.info2?.link || "#"}>
            {pascalCase(item.info2?.title)} {pascalCase(item.info2?.value)}
          </LinkStyled>
        </ListSubtitle>
      </Col>
      <Col span={8}>
        <ListSubtitle>
          <LinkStyled to={item.info3?.link || "#"}>
            {pascalCase(item.info3?.title)} {pascalCase(item.info3?.value)}
          </LinkStyled>
        </ListSubtitle>
        <ListSubtitle>
          <LinkStyled to={item.info4?.link || "#"}>
            {pascalCase(item.info4?.title)} {pascalCase(item.info4?.value)}
          </LinkStyled>
        </ListSubtitle>
      </Col>
      <Col span={8}>
        <ListSubtitle>
          <LinkStyled to={item.info5?.link || "#"}>
            {pascalCase(item.info5?.title)} {pascalCase(item.info5?.value)}
          </LinkStyled>
        </ListSubtitle>
        <ListSubtitle>
          <LinkStyled to={item.info6?.link || "#"}>
            {pascalCase(item.info6?.title)} {pascalCase(item.info6?.value)}
          </LinkStyled>
        </ListSubtitle>
      </Col>
    </Row>
  </DivInfo>
);

export default function useShapeCollapse() {
  const selectShape = (collapse: any, shape: string | undefined) => {
    return (
      (shape === "tag" && shapeTag(collapse)) ||
      (shape === "text" && shapeText(collapse)) ||
      (shape === "component" && shapeComponent(collapse))
    );
  };

  return {
    selectShape,
  };
}
