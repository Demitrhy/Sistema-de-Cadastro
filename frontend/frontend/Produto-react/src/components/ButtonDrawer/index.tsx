import React, { ReactNode, useEffect, useState, Dispatch } from 'react';
import { Tooltip } from 'antd';
import { FloatButton, Li, Ul, FloatButtonOption, BadgeFloatButton, AnimationIcon } from './styles'
import { getRoles } from '../../utils/AuthService';
import { ClearOutlined } from "@ant-design/icons"; 

export interface buttonDrawerType {
  tooltip: string;
  icon: ReactNode;
  role: string;
  shape: (show: boolean, setShow: Dispatch<any>) => ReactNode;
}

interface buttonDrawerProps {
  data: buttonDrawerType[];
  visible: boolean;
  role: string;
  badge?: number;
}

const ButtonDrawer: React.FC<buttonDrawerProps> = ({ data, visible, role, badge }) => {
  const [index, setIndex] = useState<any>(0);
  const [show, setShow] = useState<any>(false);

  const handleShape = async (index: any, show: boolean) => {
    await setIndex(index);
    await setShow(show);
  }

  // const handleClearOrdersSelected = async () => {
  //   handle.listSelectedItems
  // }

  useEffect(() => { (!show) && setShow(false) }, [show])

  return (
    <>
      {(visible && getRoles(`${role}`)) ?
        <>
          <BadgeFloatButton count={badge}>
            <FloatButton type="primary">
              <AnimationIcon />
              <Ul>
                <Li>
              <Tooltip placement="left" title={"Limpar Pedidos Selecionados"}>
                  <FloatButtonOption type="primary" >
                    <ClearOutlined />
                  </FloatButtonOption>
                </Tooltip>
                </Li>
                {data.map((i: buttonDrawerType, index: any) => (
                  <Li key={index}>
                    <Tooltip placement="left" title={i.tooltip}>
                      <FloatButtonOption accessControl={!getRoles(`${i.role}`)} type="primary" onClick={() => handleShape(index, true)}>
                        {i.icon}
                      </FloatButtonOption>
                    </Tooltip>
                  </Li>
                ))}
              </Ul>
            </FloatButton>
          </BadgeFloatButton>
          <div>{data[index].shape(show, setShow)}</div>
        </> : null}
    </>
  );
}

export default ButtonDrawer;

