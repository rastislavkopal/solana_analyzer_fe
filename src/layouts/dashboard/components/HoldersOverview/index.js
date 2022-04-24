import React, { useState, useEffect } from 'react';

// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { FaQuestionCircle } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";

import Table from "examples/Tables/Table";

import holdersTableData from "layouts/dashboard/components/HoldersOverview/data/holdersTableData";

export default function HoldersOverview({symbol, isRank}) {
  const { columns, rows } = holdersTableData({symbol});
  const ownedByTop = (rows && rows.length !== 0) ? rows.reduce((accumulator, curr) => accumulator + curr.count.props.children, 0) : 0;

  return (isRank) ? (
    <Card className="h-100">
      <VuiBox>
        <VuiTypography variant="lg" fontWeight="bold" mb="5px" color="white">
          Top holders
        </VuiTypography>
        <Tooltip placement="top" title="Top holders of collection.">
          <IconButton>
            <FaQuestionCircle size="20px" color="white" /> 
          </IconButton>
        </Tooltip>
        <VuiBox mb={2}>
          <VuiBox display="flex" alignItems="center">
            <BsCheckCircleFill color="green" size="15px" mr="5px" />
            <VuiTypography  variant="button" color="lightblue" fontWeight="medium" ml="5px" mr="2px">
              {ownedByTop + " " }
            </VuiTypography>{" "}
            <VuiTypography variant="button" color="text" fontWeight="regular">
              {" "}
              NFTs owned by 10 wallets
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
      <VuiBox>
        <Table columns={columns} rows={rows.slice(0,6)} />
      </VuiBox>
    </Card>
  ) : (
    <Card className="h-100">
      <VuiBox>
        <VuiTypography variant="lg" mb="5px" color="warning">
          This collection does not have rarity.
        </VuiTypography>
      </VuiBox>
    </Card>
  );
}
