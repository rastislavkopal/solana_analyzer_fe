import React, { useState, useEffect } from 'react';

import Card from "@mui/material/Card";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { FaQuestionCircle } from "react-icons/fa";

import Table from "examples/Tables/Table";

import trxTableData from "layouts/dashboard/components/TransactionsOverview/data/trxTableData";

export default function TransactionsOverview({symbol}) {
  const { columns, rows } = trxTableData({symbol});

  // const [areTransactionsReady, setAreTransactionsReady] = useState(false);

  return (
    <Card className="h-100">
      <VuiBox>
        <VuiTypography variant="lg" fontWeight="bold" mb="5px" color="white">
          Last transactions
        </VuiTypography>
        <Tooltip placement="top" title="History of the latest buy transactions.">
          <IconButton>
            <FaQuestionCircle size="20px" color="white" /> 
          </IconButton>
        </Tooltip>
      </VuiBox>
      <VuiBox>
      { rows.length === 0 && 
        <Box sx={{ display: 'flex', width: "100%" }}>
          <CircularProgress sx={{ margin: 'auto', mt: '110px' }} />
        </Box>
      }
      { rows.length !== 0 &&
        <Table columns={columns} rows={rows} />
      }
      </VuiBox>
    </Card>
  );
}
