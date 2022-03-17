
import React from 'react';
import ReactApexChart from "react-apexcharts";

export default function LineChart(props) {
  
  return (
    <ReactApexChart
      options={props.lineChartOptions}
      series={props.lineChartData}
      type="area"
      width="100%"
      height="100%"
    />
  );
}
