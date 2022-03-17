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
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Dashboard layout components
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";

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
import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
// import historyFloorPriceData from "layouts/dashboard/data/historyFloorPriceData";
import { historyFloorPriceOptionsDashboard } from "layouts/dashboard/data/historyFloorPriceOptions";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";


function getChangeForAttr(data, attr){
  const a = data[data.length - 1].metadata[attr];
  const b = data[0].metadata[attr];

  const diff = 100 * Math.abs( ( a - b ) / ( (a+b)/2 ) )
  return  diff.toFixed(2);
}

export default function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;
  
  const [symbol, setSymbol] = useState('infinity_serpents');
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

  // get collection basic data info
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE}/collection/${symbol}`)
      .then(res => res.json())
      .then(result => {
        setCollectionData(result);
      });

    // get timeseries data
    fetch(`${process.env.REACT_APP_API_BASE}/collection/${symbol}/history/complete`)
      .then(res => res.json())
      .then(data => {
        console.log(data) // TODO remove;
        const floorHistoryArr = [];
        const historyListingsArr = [];

        setCollectionHistoryData(data);
        setIsCollectionReady(true);

        setChange24HourPrice(getChangeForAttr(data,'avgPrice24hr'));
        setChange24HourVolume(getChangeForAttr(data, 'volume24hr'));
        setChangeListedCount(getChangeForAttr(data, 'listedCount'));
        setChangeFloorPrice(getChangeForAttr(data, 'floorPrice'));
        
        const recentData = data[0].metadata;
        setAvgPrice24hr((recentData.avgPrice24hr / 1e9).toFixed(2));
        setFloorPrice((recentData.floorPrice / 1e9).toFixed(2));
        setListedCount(Math.round(recentData.listedCount));
        setListedTotalValue((recentData.listedTotalValue / 1e9).toFixed(2));  
        setVolume24hr((recentData.volume24hr / 1e9).toFixed(2)); 
        setVolumeAll((recentData.volumeAll / 1e9).toFixed(2));

        data.slice().reverse()
          .forEach((it, idx) => {

            floorHistoryArr.push({
              x: it.timestamp, 
              y: it.metadata.floorPrice / 1e9,
            });

            historyListingsArr.push({
              x: it.timestamp, 
              y: it.metadata.listedCount,
            });
          }); 

        setHistoryFloorData([{data: floorHistoryArr}]);
        setHistoryListingsData([{data: historyListingsArr}]);
      }); 
  }, [symbol]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "24h Avg Price", fontWeight: "regular" }}
                count={`${avgPrice24hr}`}
                percentage={{ color: (change24HourPrice < 0) ?  "error" : "success", text: `${change24HourPrice}%` }}
                icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "24h Avg volume" }}
                count={`${volume24hr}`}
                percentage={{ color: (change24HourVolume < 0) ?  "error" : "success", text: `${change24HourVolume}%` }}
                icon={{ color: "info", component: <IoGlobe size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Listed NFTs" }}
                count={`${listedCount}`}
                percentage={{ color: (changeListedCount < 0) ?  "error" : "success", text: `${changeListedCount}%` }} 
                icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Floor price" }}
                count={ `${floorPrice}` } 
                percentage={{ color: (change24HourVolume < 0) ?  "error" : "success", text: `${changeFloorPrice}%` }}
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
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      +5% more{" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        in 2021
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
              <Card>
                <VuiBox>
                  <VuiBox
                    mb="24px"
                    height="220px"
                    sx={{
                      background: linearGradient(
                        cardContent.main,
                        cardContent.state,
                        cardContent.deg
                      ),
                      borderRadius: "20px",
                    }}
                  >
                    <BarChart
                      barChartData={barChartDataDashboard}
                      barChartOptions={barChartOptionsDashboard}
                    />
                  </VuiBox>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Active Users
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      (+23){" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        than last week
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <Grid container spacing="50px">
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <IoWallet color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Users
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        32,984
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <IoIosRocket color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Clicks
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        2,42M
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <FaShoppingCart color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Sales
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        2,400$
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <IoBuild color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Items
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        320
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                  </Grid>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}
