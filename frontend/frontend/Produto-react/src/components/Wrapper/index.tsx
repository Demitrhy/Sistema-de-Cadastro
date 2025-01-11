import React, { ReactNode } from "react";
import { Col, Row } from "antd";

interface WrapperType {
  children: ReactNode;
  visible?: boolean;
  noMargin?: boolean;
  responsive?: any;
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

const Wrapper: React.FC<WrapperType> = (props) => {
  const [width, setWidth] = React.useState(window.innerWidth);

  const triggerWrapper = width >= 1200;

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <>
      {props.visible === undefined || props.visible === true ? (
        <div>
          <Col push={triggerWrapper && !props.noMargin ? 2 : 0} xs={24} sm={24} md={24} lg={24} xl={20} xxl={20} {...props.responsive}>
            <Row justify="space-between">{props.children}</Row>
          </Col>
        </div>
      ) : (
        <>{props.children}</>
      )}
    </>
  );
};

export default Wrapper;