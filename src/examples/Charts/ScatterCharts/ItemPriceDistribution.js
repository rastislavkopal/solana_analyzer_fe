import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

import { ItemPriceDistributionOptions } from "layouts/dashboard/data/itemPriceDistributionOptions";

export default function ItemPriceDistribution(props) {

  return (
      <Chart
        options={ItemPriceDistributionOptions}
        series={props.chartData}
        type="scatter"
        width="100%"
        height="100%"
      />
  );
}
