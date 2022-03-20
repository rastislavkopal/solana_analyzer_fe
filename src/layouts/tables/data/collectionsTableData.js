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

function Function({ job, org }) {
  return (
    <VuiBox display="flex" flexDirection="column">
      <VuiTypography variant="caption" fontWeight="medium" color="white">
        {job}
      </VuiTypography>
      <VuiTypography variant="caption" color="text">
        {org}
      </VuiTypography>
    </VuiBox>
  );
}

export default function authorsTableData() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE}/collection/mainPage`)
      .then(res => res.json())
      .then(
        (result) => {
          let its = [];
          result.forEach((it, idx) => {
            its.push( {
              collection: <Collection image={it.metadata.image} 
                name={ it.metadata.symbol.replaceAll('_', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()) } 
                email={ it.metadata.symbol } />,
              // function: <Function job="Manager" org="Organization" />,
              'floor price': (
                <VuiTypography variant="caption" color="white" fontWeight="medium">
                  {it.metadata.floorPrice / 1e9 }
                </VuiTypography>
              ),
              'floor price change': (
                <VuiTypography variant="caption" color={(it.metadata.floorPriceChange.charAt(0) === '-' ) ? "error" : "success" } fontWeight="medium">
                  {it.metadata.floorPriceChange }
                </VuiTypography>
              ),
              'volume 24h': (
                <VuiTypography variant="caption" color="white" fontWeight="medium">
                  { (it.metadata.volume24hr  / 1e9).toFixed(2) }
                </VuiTypography>
              ),
              // status: (
              //   <VuiBadge
              //     variant="standard"
              //     badgeContent="Online"
              //     color="success"
              //     size="xs"
              //     container
              //     sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
              //       background: success.main,
              //       border: `${borderWidth[1]} solid ${success.main}`,
              //       borderRadius: borderRadius.md,
              //       color: white.main,
              //     })}
              //   />
              // ),
              'Listed count': (
                <VuiTypography variant="caption" color="white" fontWeight="medium">
                  {it.metadata.listedCount}
                </VuiTypography>
              ),
              'items Count Change': (
                <VuiTypography variant="caption" color={(it.metadata.listedCountChange.charAt(0) === '-' ) ? "error" : "success" } fontWeight="medium">
                  {it.metadata.listedCountChange }
                </VuiTypography>
              ),
              action: (
                <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                  Stats
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
  }, []);

  return {
    columns: [
      { name: "collection", align: "left" },
      { name: "floor price", align: "center" }, 
      { name: "floor price change", align: "center" }, 
      { name: "volume 24h", align: "center" }, 
      // { name: "status", align: "center" }, 
      { name: "Listed count", align: "center" },
      { name: "items Count Change", align: "center" },
      { name: "action", align: "center" },
    ],
  
    rows: items,
  }
}
