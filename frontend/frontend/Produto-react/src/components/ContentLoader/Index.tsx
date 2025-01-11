import React from "react"
import { Spin } from "antd";
import { ContentLoading } from './styles'

const Loader: React.FC = () => (
  <>
    <ContentLoading>
      <Spin size="large" tip="Carregando..." />
    </ContentLoading>
  </>
  );

export default Loader;