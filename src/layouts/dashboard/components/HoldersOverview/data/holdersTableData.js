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

export default function collectionsTableData({symbol}) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!symbol || symbol === '')
        return;

    fetch(`${process.env.REACT_APP_API_BASE}/collection/${symbol}/holders`)
      .then(res => res.json())
      .then(
        (result) => {
          let its = [];
          result.sort((a,b)=>{
            return b.itemsCount - a.itemsCount;
          }).slice(0,10).forEach((it, idx) => {
            its.push( {
            //   collection: <Collection image={it.metadata.image} 
            //     name={ it.metadata.symbol.replaceAll('_', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()) } 
            //     email={ it.metadata.symbol } />,
              // function: <Function job="Manager" org="Organization" />,
              'wallet': (
                <VuiTypography variant="caption" color="white" fontWeight="medium">
                  {it.walletId }
                </VuiTypography>
              ),
              'count': (
                <VuiTypography variant="caption" color="lightblue" fontWeight="medium">
                  {it.itemsCount }
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
