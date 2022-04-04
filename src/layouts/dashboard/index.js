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
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

import HoldersOverview from "layouts/dashboard/components/HoldersOverview";
import TransactionsOverview from "layouts/dashboard/components/TransactionsOverview";

// React icons
import { IoIosRocket } from "react-icons/io";
import { IoConstructOutline, IoGlobe } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { VscRocket } from "react-icons/vsc"
import { IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

// Data
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
import ItemPriceDistribution from "examples/Charts/ScatterCharts/ItemPriceDistribution";
import ItemListedForDistribution from "examples/Charts/ScatterCharts/ItemListedForDistribution";
import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
// import historyFloorPriceData from "layouts/dashboard/data/historyFloorPriceData";
import { historyFloorPriceOptionsDashboard } from "layouts/dashboard/data/historyFloorPriceOptions";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";

import { useFetchWrapper } from "_helpers/fetch_wrapper";

import { useRecoilState } from 'recoil';
import { symbolAtom } from '_state/appSymbol';


export default function Dashboard() {

  const [appSymbol, setAppSymbol] = useRecoilState(symbolAtom);
  const fetchWrapper = useFetchWrapper();

  const { gradients } = colors;
  const { cardContent } = gradients;
  
  const [symbol, setSymbol] = useState('stoned_ape_crew');

  const [collections, setCollections] = useState([]);
  const [collectionData, setCollectionData] = useState({});
  const [collectionHistoryData, setCollectionHistoryData] = useState([]);
  const [historyFloorData, setHistoryFloorData] = useState([]);
  const [historyListingsData, setHistoryListingsData] = useState([]);

  const [isCollectionReady, setIsCollectionReady] = useState(false);
  const [change24HourPrice, setChange24HourPrice] = useState(0);
  const [change24HourVolume, setChange24HourVolume] = useState(0); 
  const [changeListedCount, setChangeListedCount] = useState(0);
  const [changeFloorPrice, setChangeFloorPrice] = useState(0);

  const [avgPrice24hr, setAvgPrice24hr] = useState(0);
  const [floorPrice, setFloorPrice] = useState(0);
  const [listedCount, setListedCount] = useState(0);
  const [listedTotalValue, setListedTotalValue] = useState(0);  
  const [volume24hr, setVolume24hr] = useState(0); 
  const [volumeAll, setVolumeAll] = useState(0); 
  const [floorPriceChange, setFloorPriceChange] = useState(' ');
  const [listedCountChange, setListedCountChange] = useState(' ');

  const [historyInterval, setHistoryInterval] = useState(3);

  const [priceRankData, setPriceRankData] = useState([]);
  const [priceListedForData, setPriceListedForData] = useState([]);


  const [collectionProcessedData, setCollectionProcessedData]= useState([]);

  function fetchAllData() {
    fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/collection/${appSymbol}`)
      .then(result => { setCollectionData(result) });

    fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/collection`)
      .then(result => { setCollections(result); });

    fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/collection/mainPage`)
      .then(result => {
        result.forEach((el, idx) => {
          if (el.metadata.symbol === appSymbol) {
            setCollectionProcessedData(el);
            setFloorPrice((el.metadata.floorPrice / 1e9).toFixed(2));
            setListedCount(el.metadata.listedCount);
            setListedTotalValue((el.metadata.listedTotalValue / 1e9).toFixed(2));
            setAvgPrice24hr((el.metadata.avgPrice24hr / 1e9).toFixed(2));
            setVolume24hr((el.metadata.volume24hr / 1e9).toFixed(2));
            setVolumeAll((el.metadata.volumeAll / 1e9).toFixed(2));
            setFloorPriceChange(el.metadata.floorPriceChange);
            setListedCountChange(el.metadata.listedCountChange);
            return;
          }
        });
      });

      fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/collection/${appSymbol}/item/all`)
      .then(
        (result) => {
          let rankIts = [];
          let listedForIts = [];

          result.forEach((it, idx) => {
            if ("rank" in it) {
              rankIts.push({
                y: it.price, 
                x: it.rank,
                name: it.name,
                mintAddress: it.mintAddress,
                image: collectionData.image,
              });
            }

            if ("listedFor" in it) {
              listedForIts.push({
                y: it.listedFor, 
                x: it.rank,
                name: it.name,
                mintAddress: it.mintAddress,
                image: collectionData.image,
              });
            }
          });

          setPriceRankData([{
            name: "Items - rank distribution",
            data: rankIts,
          }]);
          setPriceListedForData([{
            name: "Items - listed for distribution",
            data: listedForIts,
          }]);
        },
        (error) => console.error(error)
      )
    
      fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/collection/${appSymbol}/history/complete?limit=100&dense=${historyInterval}`)
        .then(data => {
          const floorHistoryArr = [];
          const historyListingsArr = [];

          setCollectionHistoryData(data);
          setIsCollectionReady(true);

          data.slice().reverse()
            .forEach((it, idx) => {

              floorHistoryArr.push({
                x: it.timestamp, 
                y: (it.metadata.floorPrice / 1e9).toFixed(2),
              });

              historyListingsArr.push({
                x: it.timestamp, 
                y: it.metadata.listedCount,
              });
            }); 

          setHistoryFloorData([{data: floorHistoryArr}]);
          setHistoryListingsData([{data: historyListingsArr}]);
        }); 
  } 

  // get collection basic data info
  useEffect(() => {
    try {
      fetchAllData();
    } catch(e) {
      console.error(e);
    } 
  }, [appSymbol, historyInterval, collectionData]);

  return (
    <DashboardLayout>
      <DashboardNavbar collections={collections} historyInterval={historyInterval} setHistoryInterval={setHistoryInterval}  />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "24h Avg Price", fontWeight: "regular" }}
                count={`${avgPrice24hr}`}
                percentage={{ color: (change24HourPrice < 0) ?  "error" : "success", text: `` }}
                icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "24h Avg volume" }}
                count={`${volume24hr}`}
                percentage={{ color: (change24HourVolume < 0) ?  "error" : "success", text: `` }}
                icon={{ color: "info", component: <IoGlobe size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Listed NFTs" }}
                count={`${listedCount}`}
                percentage={{ color: (listedCountChange.charAt(0) === '-') ?  "error" : "success", text: `${listedCountChange}` }} 
                icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Floor price" }}
                count={ `${floorPrice}` } 
                percentage={{ color: (floorPriceChange.charAt(0) === '-') ?  "error" : "success", text: `${floorPriceChange}` }}
                icon={{ color: "info", component: <FaShoppingCart size="20px" color="white" /> }}
              />
            </Grid>
          </Grid>
        </VuiBox>
        {/* <VuiBox mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={12} xl={5}>
              <WelcomeMark />
            </Grid>
            <Grid item xs={12} lg={6} xl={3}>
              <SatisfactionRate />
            </Grid>
            <Grid item xs={12} lg={6} xl={4}>
              <ReferralTracking />
            </Grid>
          </Grid>
        </VuiBox> */}
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={7}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Floor price history
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color={ (floorPriceChange.charAt(0) === '-') ?  "error" : "success"} fontWeight="bold">
                      {`${floorPriceChange} `}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        in last 24 hours
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox sx={{ height: "310px" }}>
                    <LineChart
                      lineChartData={historyFloorData}
                      lineChartOptions={historyFloorPriceOptionsDashboard}
                    />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6} xl={5}>
              <HoldersOverview/>
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={7}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Listed history
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                  <VuiTypography variant="button" color={ (listedCountChange.charAt(0) === '-') ?  "error" : "success"} fontWeight="bold">
                      {`${listedCountChange} `}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        in last 24 hours
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox sx={{ height: "310px" }}>
                    <LineChart
                      lineChartData={historyListingsData}
                      lineChartOptions={historyFloorPriceOptionsDashboard}
                    />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6} xl={5}>
            <TransactionsOverview/>
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12} xl={12}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Items price distribution
                  </VuiTypography>
                  <VuiBox sx={{ height: "400px" }}>
                  <ItemPriceDistribution
                      chartData={priceRankData}
                    />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12} xl={12}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Items - Listed for distribution
                  </VuiTypography>
                  <VuiBox sx={{ height: "400px" }}>
                  <ItemListedForDistribution
                      chartData={priceListedForData}
                    />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}
