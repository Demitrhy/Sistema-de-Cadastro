import React, { ReactNode, useState } from "react";
import { Pie, defaults } from 'react-chartjs-2';

interface GraphicPieProps {
  columns?: Array<string>;
  response?: Array<string>;
  width?: number;
  height?: number;
}

//defaults.global.tooltips.enabled = false

const GraphicPie: React.FC<GraphicPieProps> = ({
  columns,
  response,
  width,
  height
}) => {

  return (
    <>
      <Pie
        data={{
          labels: columns,
          datasets: [{
            data: response,
            backgroundColor: [
               'rgba(55,158,231, 1)'
              , 'rgba(238,93,123, 1)'
              ,'rgba(255,204,85,1)'
            ],
            borderColor: [
              'rgba(55,158,231, 1)'
              , 'rgba(238,93,123, 1)'
              ,'rgba(255,204,85,1)'
            ],
            borderWidth: 1
          }]
        }}
        width={ width ? width : 250}
        height={ height ? height : 50}
      >
      </Pie>
    </>
  );
};

export default GraphicPie;

