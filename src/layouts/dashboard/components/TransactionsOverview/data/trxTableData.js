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

/* eslint-disable react/prop-types */
// Vision UI Dashboard React components
import React, { useState, useEffect } from 'react';

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiAvatar from "components/VuiAvatar";
import VuiBadge from "components/VuiBadge";


function Collection({ image, name, description }) {
  return (
    <VuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <VuiBox mr={2}>
        <VuiAvatar src={image} alt={name} size="sm" variant="rounded" />
      </VuiBox>
      <VuiBox display="flex" flexDirection="column">
        <VuiTypography variant="button" color="white" fontWeight="medium">
          {name}
        </VuiTypography>
        <VuiTypography variant="caption" color="text">
          {description}
        </VuiTypography>
      </VuiBox>
    </VuiBox>
  );
}

export default function trxTableData({symbol}) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!symbol || symbol === '')
        return;

    fetch(`${process.env.REACT_APP_API_BASE}/collection/${symbol}/toptransactions/10`)
      .then(res => res.json())
      .then(
        (result) => {
          let its = [];
          result.slice(0,8).forEach((it, idx) => {
            its.push( {
              'wallet': (
                <VuiTypography variant="caption" color="white" fontWeight="medium">
                  {it.mintAddress }
                </VuiTypography>
              ),
              'count': (
                <VuiTypography variant="caption" color="lightblue" fontWeight="medium">
                  {it.price.toFixed(2) }
                </VuiTypography>
              ),
            });
          });

          setIsLoaded(true);
          setItems(its);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [symbol]);

  return {
    columns: [
      { name: "wallet", align: "left" },
      { name: "count", align: "center" }
    ],
  
    rows: items,
  }
}
