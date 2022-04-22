/* eslint-disable react/prop-types */
// Vision UI Dashboard React components
import React, { useState, useEffect } from 'react';

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiAvatar from "components/VuiAvatar";
import VuiBadge from "components/VuiBadge";

import { useFetchWrapper } from "_helpers/fetch_wrapper";

import { useHistory, Link } from "react-router-dom";

function goToDashboard(symbol) {
  history.push("/home");
}

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

export default function collectionsTableData() {
  
  const fetchWrapper = useFetchWrapper();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/collection/mainPage`)
      .then((result) => {
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
              'floor price change (%)': (
                <VuiTypography variant="caption" color={(it.metadata.floorPriceChange.charAt(0) === '-' ) ? "error" : "success" } fontWeight="medium">
                  { `${it.metadata.floorPriceChange} %` }
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
              'Listed count change (%)': (
                <VuiTypography variant="caption" color={(it.metadata.listedCountChange.charAt(0) === '-' ) ? "success" : "error" } fontWeight="medium">
                  { `${it.metadata.listedCountChange} %` }
                </VuiTypography>
              ),
              action: (
                <VuiBox display={{ xs: "none", lg: "inline-block" }}>
                  <VuiButton
                    component={Link}
                    to={'dashboard'}
                    variant="gradient"
                    color={"info"}
                    size="small"
                  >
                    Analysis
                  </VuiButton>
              </VuiBox>
                // <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                //   Stats
                // </VuiTypography>
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
      { name: "collection", align: "left", numeric: false },
      { name: "floor price", align: "center", numeric: true }, 
      { name: "floor price change (%)", align: "center", numeric: true }, 
      { name: "volume 24h", align: "center", numeric: true }, 
      // { name: "status", align: "center" }, 
      { name: "Listed count", align: "center", numeric: true },
      { name: "Listed count change (%)", align: "center", numeric: true },
      // { name: "action", align: "center" },
    ],
  
    rows: items,
  }
}
