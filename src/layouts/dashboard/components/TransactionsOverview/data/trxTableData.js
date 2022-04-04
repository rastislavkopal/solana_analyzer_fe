import React, { useState, useEffect } from 'react';

import VuiTypography from "components/VuiTypography";

import { useFetchWrapper } from "_helpers/fetch_wrapper";

export default function trxTableData({appSymbol}) {

  const fetchWrapper = useFetchWrapper();


  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  function fetchData() {
    if (!appSymbol || appSymbol === '')
        return;

    fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/collection/${appSymbol}/buytransactions/10`)
      .then(
        (result) => {
          let its = [];
          result.slice(0,8).forEach((it, idx) => {
            its.push( {
              'buyer': (
                <VuiTypography variant="caption" color="white" fontWeight="medium">
                  {it.mintAddress }
                </VuiTypography>
              ),
              'price': (
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
  }
  useEffect(() => {
    try {
      fetchData();
      const renderInterval = setInterval(fetchData, 5000);
      return () => clearInterval(renderInterval);
    } catch(e) {
      console.error(e);
    } 
  }, [appSymbol]);

  return {
    columns: [
      { name: "buyer", align: "left" },
      { name: "price", align: "center" }
    ],
  
    rows: items,
  }
}
