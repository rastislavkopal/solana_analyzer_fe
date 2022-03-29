import React, { useState, useEffect } from 'react';

import Card from "@mui/material/Card";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";


import Table from "examples/Tables/Table";

import trxTableData from "layouts/dashboard/components/TransactionsOverview/data/trxTableData";

export default function TransactionsOverview({symbol}) {
  const { columns, rows } = trxTableData({symbol});

  return (
    <Card className="h-100">
      <VuiBox>
        <VuiTypography variant="lg" fontWeight="bold" mb="5px" color="white">
          Last transactions
        </VuiTypography>
      </VuiBox>
      <VuiBox>
        <Table columns={columns} rows={rows} />
      </VuiBox>
    </Card>
  );
}
