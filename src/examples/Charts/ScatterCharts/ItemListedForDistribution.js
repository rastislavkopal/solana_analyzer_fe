import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import { ItemListedForDistributionOptions } from "layouts/dashboard/data/itemListedForDistributionOptions";

export default function ItemPriceDistribution({symbol, chartData, isRank}) {

  return (isRank) ? (
      <Chart
        options={ItemListedForDistributionOptions}
        series={chartData}
        type="scatter"
        width="100%"
        height="100%"
      />
  ) : (
    <VuiBox>
      <VuiTypography variant="lg" mb="5px" color="warning">
        This collection does not have rarity.
      </VuiTypography>
    </VuiBox>
  );
}
