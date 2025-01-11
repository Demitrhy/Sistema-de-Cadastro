import React from "react";
import { DivInfo, ListSubtitle, ListTitle, LinkStyled } from "./styles";
import { Row, Col } from "antd";
import { pascalCase } from "../../utils/PascalCase";

const shapeFourColumnsThreeLines = (item: any) => (
  <DivInfo>
    <Row justify="space-between">
      <Col span={6}>
        <ListTitle><LinkStyled to={item.info1?.link || '#'}>{pascalCase(item.info1?.value)}</LinkStyled></ListTitle>
        <ListSubtitle><LinkStyled to={item.info2?.link || '#'}>{pascalCase(item.info2?.title)} {pascalCase(item.info2?.value)}</LinkStyled></ListSubtitle>
      </Col>
      <Col span={6}>
        <ListSubtitle><LinkStyled to={item.info3?.link || '#'}>{pascalCase(item.info3?.title)} {pascalCase(item.info3?.value)}</LinkStyled></ListSubtitle>
        <ListSubtitle><LinkStyled to={item.info4?.link || '#'}>{pascalCase(item.info4?.title)} {pascalCase(item.info4?.value)}</LinkStyled></ListSubtitle>
      </Col>
      <Col span={6}>
        <ListSubtitle><LinkStyled to={item.info5?.link || '#'}>{pascalCase(item.info5?.title)} {pascalCase(item.info5?.value)}</LinkStyled></ListSubtitle>
        <ListSubtitle><LinkStyled to={item.info6?.link || '#'}>{pascalCase(item.info6?.title)} {pascalCase(item.info6?.value)}</LinkStyled></ListSubtitle>
      </Col>
      <Col span={6}>
        <ListSubtitle><LinkStyled to={item.info7?.link || '#'}>{pascalCase(item.info7?.value)}</LinkStyled></ListSubtitle>
        <ListSubtitle><LinkStyled to={item.info8?.link || '#'}>{pascalCase(item.info8?.title)}</LinkStyled></ListSubtitle>
      </Col>
    </Row>
  </DivInfo>
);

const shapeFourColumnsTwoLines = (item: any) => (
  <DivInfo>
    <Row justify="space-between">
      <Col span={6}>
        <ListTitle><LinkStyled to={item.info1?.link || '#'}>{pascalCase(item.info1?.value)}</LinkStyled></ListTitle>
        <ListSubtitle><LinkStyled to={item.info2?.link || '#'}>{pascalCase(item.info2?.title)} {pascalCase(item.info2?.value)}</LinkStyled></ListSubtitle>
      </Col>
      <Col span={6}>
        <ListSubtitle><LinkStyled to={item.info3?.link || '#'}>{pascalCase(item.info3?.title)} {pascalCase(item.info3?.value)}</LinkStyled></ListSubtitle>
        <ListSubtitle><LinkStyled to={item.info4?.link || '#'}>{pascalCase(item.info4?.title)} {pascalCase(item.info4?.value)}
        </LinkStyled></ListSubtitle>
      </Col>
      <Col span={6}>
        <ListSubtitle><LinkStyled to={item.info5?.link || '#'}>{pascalCase(item.info5?.title)} {pascalCase(item.info5?.value)}</LinkStyled></ListSubtitle>
        <ListSubtitle><LinkStyled to={item.info6?.link || '#'}>{pascalCase(item.info6?.title)} {pascalCase(item.info6?.value)}</LinkStyled></ListSubtitle>
      </Col>
      <Col span={6}>
        <ListSubtitle><LinkStyled to={item.info7?.link || '#'}>{pascalCase(item.info7?.value)}</LinkStyled></ListSubtitle>
        <ListSubtitle><LinkStyled to={item.info8?.link || '#'}>{pascalCase(item.info8?.title)}</LinkStyled></ListSubtitle>
      </Col>
    </Row>
  </DivInfo>
);

const shapeThreeColumnsTwoLines = (item: any) => (
  <DivInfo>
    <Row justify="space-between">
      <Col span={8}>
        <ListTitle><LinkStyled to={item.info1?.link || '#'}>{pascalCase(item.info1?.value)}</LinkStyled></ListTitle>
        <ListSubtitle><LinkStyled to={item.info2?.link || '#'}>{pascalCase(item.info2?.title)} {pascalCase(item.info2?.value)}</LinkStyled></ListSubtitle>
      </Col>
      <Col span={8}>
        <ListSubtitle><LinkStyled to={item.info3?.link || '#'}>{pascalCase(item.info3?.title)} {pascalCase(item.info3?.value)}</LinkStyled></ListSubtitle>
        <ListSubtitle><LinkStyled to={item.info4?.link || '#'}>{pascalCase(item.info4?.title)} {pascalCase(item.info4?.value)}</LinkStyled></ListSubtitle>
      </Col>
      <Col span={8}>
        <ListSubtitle><LinkStyled to={item.info5?.link || '#'}>{pascalCase(item.info5?.title)} {pascalCase(item.info5?.value)}</LinkStyled></ListSubtitle>
        <ListSubtitle><LinkStyled to={item.info6?.link || '#'}>{pascalCase(item.info6?.title)} {pascalCase(item.info6?.value)}</LinkStyled></ListSubtitle>
        <ListSubtitle><LinkStyled to={item.info7?.link || '#'}>{pascalCase(item.info7?.title)} {pascalCase(item.info7?.value)}</LinkStyled></ListSubtitle>
      </Col>
    </Row>
  </DivInfo>
);

const shapeTwoColumnsTwoLines = (item: any) => (
  <DivInfo>
    <Row justify="space-between">
      <Col span={12}>
        <ListTitle><LinkStyled to={item.info1?.link || '#'}>{pascalCase(item.info1?.value)}</LinkStyled></ListTitle>
        <ListSubtitle><LinkStyled to={item.info2?.link || '#'}>{pascalCase(item.info2?.title)} {pascalCase(item.info2?.value)}</LinkStyled></ListSubtitle>
      </Col>
      <Col span={12}>
        <ListSubtitle><LinkStyled to={item.info3?.link || '#'}>{pascalCase(item.info3?.title)} {pascalCase(item.info3?.value)}</LinkStyled></ListSubtitle>
        <ListSubtitle><LinkStyled to={item.info4?.link || '#'}>{pascalCase(item.info4?.title)} {pascalCase(item.info4?.value)}</LinkStyled></ListSubtitle>
      </Col>
    </Row>
  </DivInfo>
);

const shapeOneColumnsFourLines = (item: any) => (
  <DivInfo>
    <Row justify="space-between">
      <Col span={24}>
        <ListTitle><LinkStyled to={item.info1?.link || '#'}>{pascalCase(item.info1.value)}</LinkStyled></ListTitle>
        <ListSubtitle><LinkStyled to={item.info2?.link || '#'}>{pascalCase(item.info2?.title)} {pascalCase(item.info2?.value)}</LinkStyled></ListSubtitle>
        <ListSubtitle><LinkStyled to={item.info3?.link || '#'}>{pascalCase(item.info3?.title)} {pascalCase(item.info3?.value)}</LinkStyled></ListSubtitle>
        <ListSubtitle><LinkStyled to={item.info4?.link || '#'}>{pascalCase(item.info4?.title)} {pascalCase(item.info4?.value)}</LinkStyled></ListSubtitle>
      </Col>
    </Row>
  </DivInfo>
); 

export default function useShapeRow() {
  const selectShape = (item: any, shape: any[]) => {
    return (
      (shape.join() === [4, 3].join() && shapeFourColumnsThreeLines(item)) ||
      (shape.join() === [4, 2].join() && shapeFourColumnsTwoLines(item)) ||
      (shape.join() === [3, 2].join() && shapeThreeColumnsTwoLines(item)) ||
      (shape.join() === [2, 2].join() && shapeTwoColumnsTwoLines(item)) ||
      (shape.join() === [1, 4].join() && shapeOneColumnsFourLines(item))
    );
  };

  return {
    selectShape,
  };
}
