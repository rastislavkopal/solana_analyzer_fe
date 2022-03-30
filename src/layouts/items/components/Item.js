import React from 'react'

import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import Grid from "@mui/material/Grid";
import * as GradientProgress from "@delowar/react-circle-progressbar";
import GreenLightning from "assets/images/shapes/green-lightning.svg";
import WhiteLightning from "assets/images/shapes/white-lightning.svg";
import linearGradient from "assets/theme/functions/linearGradient";
import colors from "assets/theme/base/colors";

export default function Item(props) {
    const { gradients, info } = colors;
    const { cardContent } = gradients;

  return (
  <Grid 
    item xs={6}
    md={2} 
    component="a"
    href={`https://magiceden.io/item-details/${props.data.id}`}
    target="_blank"
    rel="noreferrer"
    // background="success"
  >
    <VuiBox
        sx={{
            background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
            minHeight: "110px",
            borderRadius: "20px",
        }}
    >
        <VuiBox pt={2} px={2} >
        <img src={props.data.img} width="auto" height="150" />
        </VuiBox>
        <VuiBox p={2}>
            <VuiBox component="h5" display="flex" flexDirection="column" p={0} m={0} color="primary">
                {props.data.title}
            </VuiBox>
            <VuiTypography variant="h6" fontWeight="medium" textTransform="capitalize" color="text">
                price: {props.data.price.toFixed(2)}
            </VuiTypography>
            {/* <VuiTypography variant="h6" fontWeight="medium" textTransform="capitalize" color="text">
                Rank: {props.data.rarity}
            </VuiTypography> */}
        </VuiBox>
    </VuiBox>
  </Grid>
  )
}
