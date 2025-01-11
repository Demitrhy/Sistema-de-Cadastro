import React, { ReactNode, useState, useEffect } from "react";
import { Bar, defaults } from 'react-chartjs-2';
import ApexCharts from 'apexcharts'
import Chart from "react-apexcharts";
// import 'chartjs-plugin-datalabels';

interface GraphicBarProps {
  title1?: string;
  title2?: string;
  columns?: Array<string>;
  response?: Array<string>;
  response2?: Array<string>;
}
//defaults.global.tooltips.enabled = false


const GraphicBarApex: React.FC<GraphicBarProps> = ({
  columns,
  response,
  response2,
  title1,
  title2,
}) => {

  const dadosGrafico = {
          
    series: 
    [
      {
      name: title1,
      data: response
    },
    {
      name: title2,
      data: response2
    }
  ],
  }

  return (
    <>
     <Chart options={{
      chart: {
        type: 'bar',
        height: 350,
        stacked: true
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 3,
          dataLabels: {
            position: 'bottom'
          },
        },
      },
      dataLabels: {
        style: {
          fontSize: '11px',
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: columns,
      },
      legend: {
        position: 'bottom',
        offsetY: 0
      }
    }} series={dadosGrafico.series} type="bar" height={350} />
    </>
  );
};

export default GraphicBarApex;

