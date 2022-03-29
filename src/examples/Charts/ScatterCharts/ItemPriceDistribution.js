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

import React, { Component } from "react";
import Chart from "react-apexcharts";

import { ItemPriceDistributionOptions } from "layouts/dashboard/data/itemPriceDistributionOptions";

class ItemPriceDistribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
      selectedSymbol: {},
    };
  }

  componentDidMount() {
    
    const { symbol } = this.props;

    this.setState({
      // chartData: ScatterChartData,
      chartOptions: ItemPriceDistributionOptions,
      selectedSymbol: symbol,
    });

    fetch(`${process.env.REACT_APP_API_BASE}/collection/${symbol}/item/all`)
    .then(res => res.json())
    .then(
      (result) => {
        
        let its = [];
        result.forEach((it, idx) => {
          its.push({
            y: it.price, 
            x: it.rank,
            name: it.name,
            mintAddress: it.mintAddress,
          })
        })

        this.setState({
          // isLoaded: true,
          chartData:[{
            name: "Items - price distribution",
            data: its
          }]
        });
      },
      (error) => {
        console.error(error);
      }
    )
  }

  render() {
    return (
      <Chart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="scatter"
        width="100%"
        height="100%"
      />
    );
  }
}

export default ItemPriceDistribution;
