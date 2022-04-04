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
import moment from 'moment'

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card, LinearProgress, Stack } from "@mui/material";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ItemsNavbar from "examples/Navbars/ItemsNavbar";
import Footer from "examples/Footer";

// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

import { useFetchWrapper } from "_helpers/fetch_wrapper";

import Item from "layouts/items/components/Item"
import InfiniteScroll from 'react-infinite-scroll-component';

import { useRecoilState } from 'recoil';
import { symbolAtom } from '_state/appSymbol';

export default function Items() {

  const [appSymbol, setAppSymbol] = useRecoilState(symbolAtom);
  const fetchWrapper = useFetchWrapper();
  
  const [symbol, setSymbol] = useState('stoned_ape_crew');
  const [collections, setCollections] = useState([]);
  const [collectionData, setCollectionData] = useState({});

  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (items.length >= 500) {
        setHasMore( false );
        return;
    }
    fetch(`https://api-mainnet.magiceden.io/rpc/getListedNFTsByQuery?q={"$match":{"collectionSymbol":"${appSymbol}"},"$sort":{"takerAmount":1},"$skip":${items.length},"$limit":20,"status":[]}`)
    .then((res) => res.json())
    .then((result) => {
        setItems(items.concat(result.results));  
    })
  };


  useEffect(() => {
    try {
    setItems([]);
    fetch(`https://api-mainnet.magiceden.io/rpc/getListedNFTsByQuery?q={"$match":{"collectionSymbol":"${appSymbol}"},"$sort":{"takerAmount":1},"$skip":${items.length},"$limit":20,"status":[]}`)
        .then((res) => res.json())
        .then((result) => setItems(result.results))

    fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/collection/${appSymbol}`)
        .then(result => {
          setCollectionData(result);
        });
    
    fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/collection`)
        .then(result => {
          setCollections(result);
        });
    } catch(e) {
      console.error(e);
    } 
    
  }, [appSymbol]);


return (
<DashboardLayout>
    <ItemsNavbar collections={collections} />
    
    {/* <VuiBox py={3} display="flex" mb="14px" justifyContent="space-between" alignItems="center" > */}
        <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
            <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
            </p>
        }
        >
        <Grid container spacing={2} justifyContent="center">
            {items.map((it, idx) => (
                <Item data={it}/>
            ))}
        </Grid>
      </InfiniteScroll>
</DashboardLayout>
  );
}
