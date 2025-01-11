import React, { useLayoutEffect } from "react";
import { Layout as AntdLayout } from "antd";
import Navbar from "./Navbar";
import MenuSide from "./Menu";
import { StyleContent, StyleLayout } from "./style";
import { isAuthenticated } from "../../utils/AuthService";
import { useHistory } from "react-router";

const Layout: React.FC = (props: any) => {
  const history = useHistory();

  // useLayoutEffect(() => {
  //   !isAuthenticated() && history.push(`${process.env.REACT_APP_PREFIX}/login`);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAuthenticated()]);

  return (
    <>
      {isAuthenticated() ? (
        <AntdLayout style={{ minHeight: "100vh" }}>
          <Navbar />
          <AntdLayout>
            <MenuSide />
            <StyleLayout>
              <StyleContent>{props.children}</StyleContent>
            </StyleLayout>
          </AntdLayout>
        </AntdLayout>
      ) : (
        <>{props.children}</>
      )}
    </>
  );
};

export default Layout;
