/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useState, useEffect } from 'react';

// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// React icons
import { BsCheckCircleFill } from "react-icons/bs";

import Table from "examples/Tables/Table";

import holdersTableData from "layouts/dashboard/components/HoldersOverview/data/holdersTableData";

import { useRecoilValue } from 'recoil';
import { symbolAtom } from '_state/appSymbol';


export default function HoldersOverview() {

  const appSymbol = useRecoilValue(symbolAtom);
  
  const { columns, rows } = holdersTableData({appSymbol});
  const ownedByTop = (rows && rows.length !== 0) ? rows.reduce((accumulator, curr) => accumulator + curr.count.props.children, 0) : 0;

  return (
    <Card className="h-100">
      <VuiBox>
        <VuiTypography variant="lg" fontWeight="bold" mb="5px" color="white">
          Top holders
        </VuiTypography>
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
  );
}
