import React, { useState } from "react";
import { Result, Button, Typography, Modal } from "antd";
import { CloseCircleOutlined, SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { AntdModal } from "./styles";
const { Paragraph, Text } = Typography;

export default function useShapeAvatar() {
  // const [visible, setVisible] = useState(false);

  const divFeedback = () => (
    <div className="desc">
      <Paragraph>
        <Text strong style={{ fontSize: 16 }}>
          {`The content you submitted has the following error:`}
        </Text>
      </Paragraph>
      <Paragraph>
        <CloseCircleOutlined style={{ color: "red" }} /> 
        implementar feedback de retorno de erros.
      </Paragraph>
      <Paragraph>
        <CloseCircleOutlined style={{ color: "red" }} /> 
        implementar feedback retorno de erros
      </Paragraph>
    </div>
  );
  
  
  const shapeStatus = (
    confirm: any,
    title: string, 
    subTitle: string,
    status:
        | 403
        | 404
        | 500
        | "403"
        | "404"
        | "500"
        | "success"
        | "error"
        | "info"
        | "warning"
        | undefined
  ) => (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      extra={[
        <Button type="primary" onClick={() => confirm(true)}>
          Ok
        </Button>,
      ]} />
    // >{divFeedback}</Result>
  );
  
  const shapeIcon = (
    confirm: any,
    title: string,
    subTitle: string,
    status: React.ReactNode | string
  ) => {
    const smyleSuccess = <SmileOutlined style={{ color: '#0054A5' }}/> 
    const smyleError = <FrownOutlined style={{ color: '#0054A5' }}/>
    const icon = status === "smyleSuccess" && smyleSuccess || 
                 status === "smyleError" && smyleError ||
                 status !== ("smyleSuccess" && "smyleSuccess") && status 
                 
    return (
      <Result
        icon={icon}
        title={title}
        subTitle={subTitle}
        extra={[
          <Button type="primary" onClick={() => confirm(true)}>
            Ok
          </Button>,
        ]} />
      // >
      //   {divFeedback}
      // </Result>
    );
  };

  const ImplementarMelhoria = (
    confirm: any,
    title: string,
    subTitle: string,
    status: React.ReactNode | string
  ) => {
    const smyleSuccess = <SmileOutlined style={{ color: '#0054A5' }}/> 
    const smyleError = <FrownOutlined style={{ color: '#0054A5' }}/>
    const icon = status === "smyleSuccess" && smyleSuccess || 
                 status === "smyleError" && smyleError ||
                 status !== ("smyleSuccess" && "smyleSuccess") && status 
    return (
      <Result
        icon={icon}
        title={title}
        subTitle={subTitle}
        extra={[
          <Button type="primary" onClick={() => confirm(true)}>
            Ok
          </Button>,
        ]}
      >
        {divFeedback}
      </Result>
    );
  };

  const selectShape = (params: any) => {
    const [shape, confirm, title, subTitle, icon] = params;
    return (
      (shape  === "smyleSuccess" && shapeIcon(confirm, title, subTitle, shape)) ||
      (shape  === "smyleError" && shapeIcon(confirm, title, subTitle, shape)) ||
      (shape  === "success" && shapeStatus(confirm, title, subTitle, shape)) ||
      (shape  === "erro" && shapeStatus(confirm, title, subTitle, shape)) ||
      (shape  === "info" && shapeStatus(confirm, title, subTitle, shape)) ||
      (shape  === "warning" && shapeStatus(confirm, title, subTitle, shape)) ||
      (shape  === 403 && shapeStatus(confirm, title, subTitle, shape)) ||
      (shape  === 404 && shapeStatus(confirm, title, subTitle, shape)) ||
      (shape  === 500 && shapeStatus(confirm, title, subTitle, shape)) ||
      (shape  === "403" && shapeStatus(confirm, title, subTitle, shape)) ||
      (shape  === "404" && shapeStatus(confirm, title, subTitle, shape)) ||
      (shape  === "500" && shapeStatus(confirm, title, subTitle, shape)) ||
      (shape  === "icon" && shapeIcon(confirm, title, subTitle, icon))
    );
  };

  return {
    selectShape,
  };
}
