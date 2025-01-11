import React, { ReactNode, useState } from "react";
import { AntdModal } from "./styles";
import useShapeAlert from "./shapeAlert";

interface AlertProps {
  show: boolean;
  icon?: ReactNode;
  title: string;
  subTitle?: any;
  shape:
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
    | "smyleSuccess"
    | "smyleError"
    | "icon"
    | undefined;
  confirm?: any;
}

const Alert: React.FC<AlertProps> = ({
  show,
  shape,
  title,
  subTitle,
  icon,
  confirm,
}) => {
  const shapeAlert = useShapeAlert();
  const params = [shape, confirm, title, subTitle, icon];

  return (
    <>
      <AntdModal
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        maskClosable={false}
        destroyOnClose={true}
        visible={show}
      >
        {shapeAlert.selectShape(params)}
      </AntdModal>
    </>
  );
};

export default Alert;

