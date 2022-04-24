import React, { useState, useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ItemsNavbar from "examples/Navbars/ItemsNavbar";

import { useFetchWrapper } from "_helpers/fetch_wrapper";

import Item from "layouts/items/components/Item"
import InfiniteScroll from 'react-infinite-scroll-component';

import { useRecoilState } from 'recoil';
import { symbolAtom } from '_state/appSymbol';

export default function Items() {

  const fetchWrapper = useFetchWrapper();

  const [appSymbol, setAppSymbol] = useRecoilState(symbolAtom);
  // const [symbol, setSymbol] = useState('stoned_ape_crew');
  const [collections, setCollections] = useState([]);
  const [collectionData, setCollectionData] = useState({});

  const [items, setItems] = useState([]);
  const [dbItems, setDbItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isRank, setIsRank] = useState(false);
  const [rankLimit, setRankLimit] = useState(1000);

  const fetchMoreData = () => {
    console.log(items);
    if (items.length >= 500) {
        setHasMore( false );
        return;
    }
   fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/collection/me/forward?q={"$match":{"collectionSymbol":"${appSymbol}"},"$sort":{"takerAmount":1},"$skip":${items.length},"$limit":20,"status":[]}`)
    .then(result => {
      setItems(items.concat(result.results)); 
    });

  };


  useEffect(() => {
    try {
    setItems([]);
    fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/collection/me/forward?q={"$match":{"collectionSymbol":"${appSymbol}"},"$sort":{"takerAmount":1},"$skip":0,"$limit":20,"status":[]}`)
    .then(result => {
      setItems(result.results);
      
      if ("rarity" in result.results[0]) {
        setIsRank("howrare" in result.results[0].rarity);
      }
    });

    fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/collection/${appSymbol}`)
        .then(result => {
          setCollectionData(result);
        });
    
    fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/collection`)
        .then(result => {
          setCollections(result);
        });
    fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/collection/${appSymbol}/item/all`)
        .then(result => {
          setDbItems(result);
        });
    } catch(e) {
      console.error(e);
    } 
    
  }, [appSymbol]);


return (
<DashboardLayout>
    <ItemsNavbar collections={collections} isRank={isRank} rankLimit={rankLimit} setRankLimit={setRankLimit}/>
    { items.length === 0 && 
      <Box sx={{ display: 'flex', width: "100%", mt: "10px" }}>
        <CircularProgress sx={{ margin: 'auto' }} />
      </Box>
    }
    {/* <VuiBox py={3} display="flex" mb="14px" justifyContent="space-between" alignItems="center" > */}
        <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h5>Loading...</h5>}
        endMessage={
            <p style={{ textAlign: "center" }}>
            <b>End reached</b>
            </p>
        }
        >
        <Grid container spacing={2} justifyContent="center">
            {items.map((it, idx) => (
                <Item data={it} rankLimit={rankLimit} isRank={isRank}/>
            ))}
        </Grid>
      </InfiniteScroll>
</DashboardLayout>
  );
}
