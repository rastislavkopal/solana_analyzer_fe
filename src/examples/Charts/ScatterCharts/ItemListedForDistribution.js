import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

import { ItemListedForDistributionOptions } from "layouts/dashboard/data/itemListedForDistributionOptions";

export default function ItemPriceDistribution(props) {

  return (
      <Chart
        options={ItemListedForDistributionOptions}
        series={props.chartData}
        type="scatter"
        width="100%"
        height="100%"
      />
  );
}
