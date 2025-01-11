import React, { ReactNode, useState, useEffect } from "react";
import { Bar, defaults } from 'react-chartjs-2';
// import 'chartjs-plugin-datalabels';

interface GraphicBarProps {
  title1?: string;
  title2?: string;
  columns?: Array<string>;
  response?: Array<string>;
  response2?: Array<string>;
}
//defaults.global.tooltips.enabled = false


const GraphicBar: React.FC<GraphicBarProps> = ({
  columns,
  response,
  response2,
  title1,
  title2,
}) => {

  return (
    <>
      <Bar
        data={{
          labels: columns,
          datasets: [
            {
              label: title1,
              backgroundColor: 'rgba(55,158,231, 1)',
              borderColor: 'rgba(55,158,231, 1)',
              borderWidth: 1,
              stack: 1,
              hoverBackgroundColor: 'rgba(55,158,231, 1)',
              hoverBorderColor: 'rgba(55,158,231, 1)',
              data: response
            },
            {
              label: title2,
              backgroundColor: 'rgba(255,204,85,1)',
              borderColor: 'rgba(255,204,85,1)',
              borderWidth: 1,
              stack: 1,
              hoverBackgroundColor: 'rgba(255,204,85,1)',
              hoverBorderColor: 'rgba(255,204,85,1)',
              data: response2//[45, 79, 10, 41, 16, 85, 20]
            }
          ]
          , tooltips: {
            mode: 'point'
          }
        }}
        width={250}
        height={50}
        options={{
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          plugins: {
            datalabels: {
              display: true 
            }
          },
         legend: {
             display: true
         }
        }}
      >
      </Bar>

    </>
  );
};

export default GraphicBar;

