import React from "react";
import { Result as ResultAntd, Button } from "antd";

export default function useResult() {
    const Result = (tipo: string, refresh: (tipo?: string) => void, title?: string, icon?: React.ReactNode) => (

        <ResultAntd
          icon={icon}
          title={title}
          extra={<Button type="primary" onClick={() => refresh(tipo)}>Ok</Button>}
        />
      )

      return {
        Result
      };
    }